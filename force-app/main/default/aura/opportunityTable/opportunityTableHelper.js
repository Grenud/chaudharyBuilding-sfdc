({
    helperDoInIt : function(component, event) {
        
        var pageSize = component.get("v.pageSize");
        var accountId = component.get("v.recordId");
        var action = component.get("c.getOpportunities");
        action.setParams({
            recordId:accountId,
        });
        
        action.setCallback(this, function(response){
            
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS"){
                component.set('v.opportunityList', response.getReturnValue());
            }
            if(response.getReturnValue().length == 0){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Success',
                    message: 'No opportunity record for this Account. Create one with New Button',
                    duration:' 5000',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();                               }
        });
        $A.enqueueAction(action);
    }
})