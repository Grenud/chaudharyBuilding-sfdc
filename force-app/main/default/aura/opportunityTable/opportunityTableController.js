({
    
    doInit : function(component, event, helper){
        
        helper.helperDoInIt(component, event)
        },
    
    newOpp : function(component, event, helper){
        
        
        var accountId = component.get("v.recordId");   
        var action = component.get("c.insertOppMethod");
        
        action.setParams({
            recordId:accountId,
            
        });
        
        action.setCallback(this, function(response){
            
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS"){
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Success',
                    message: 'Related Opportunity Record has been Created with Id : '+response.getReturnValue(),
                    type: 'success',
                    mode: 'sticky'
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
        helper.helperDoInIt(component, event)
    }
})