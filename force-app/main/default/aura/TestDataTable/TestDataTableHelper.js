({
    SearchHelper: function(component, event, helper) {
        var action = component.get("c.fetchVehicleRecords");
        component.set('v.spinner',true);
        window.setTimeout(
            $A.getCallback(function() {
                action.setParams({
                    'searchKeyWord': component.get("v.searchKeyword")
                });
                action.setCallback(this, function(response) {
                    //  alert('response'+response)
                    // hide spinner when response coming from server 
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var storeResponse = response.getReturnValue();
                        // if storeResponse size is 0 ,display no record found message on screen.
                        if (storeResponse.length == 0) {
                            component.set("v.Message", true);
                        } else {
                            component.set("v.Message", false);
                        }
                      
                        component.set("v.searchResult", storeResponse); 
                        //alert("searchResult"+searchResult.Size())
                        
                    }else if (state === "INCOMPLETE") {
                        component.set('v.isOpen',true);
                        component.set('v.LightningDataTable',false);
                    }else if (state === "ERROR") {
                        component.set('v.isOpen',true);
                        component.set('v.LightningDataTable',false);
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                var toastEvent = $A.get("e.force:showToast");
                                toastEvent.setParams({
                                    "title": "Error!",
                                    "message": "VIN code Not Found.",
                                    type: 'error'
                                });
                                toastEvent.fire();
                                component.set('v.searchKeyword','');
                            }
                        } else {
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "title": "Error!",
                                "message": "VIN code Not Found.",
                                type: 'error'
                            });
                            toastEvent.fire();
                        }
                    }
                });
                $A.enqueueAction(action);
                component.set('v.spinner',false);
              
            }), 5000
        );
    },
	
})