({
    
    doinit: function(component, event, helper) {
          component.set('v.spinner',true);
        window.setTimeout(
            $A.getCallback(function() {
                  helper.GetBillRecords(component, event, helper);
                component.set("v.spinner", false);
            }), 50
        );
    },
    
  	 addRow: function(component, event, helper) {
        component.set('v.spinner',true);
        component.set("v.hideitemrow",true);
        window.setTimeout(
            $A.getCallback(function() {
                helper.addAccountRecord(component, event, helper);
                component.set("v.spinner", false);
            }), 50
        );
    },
    
    multiplicationAction : function(component, event, helper) {
        var lst  = component.get("v.CustomerDetailList");
        for(var i=0; i < lst.length; i++) {
            lst[i].Total_Price__c = lst[i].Product_Price__c * lst[i].Product_Quantity__c;
        }
        component.set("v.CustomerDetailList" , lst);  
        //  alert(JSON.stringify(component.get("v.CustomerDetailList")));
    },
    
    GrandTotalPriceMethod : function(component, event, helper) {
        //component.set('v.spinner');
        var lst  = component.get("v.CustomerDetailList");
        var grandTotal = 0;
        for(var i=0; i < lst.length; i++) {
            grandTotal +=  lst[i].Total_Price__c;
        }
        component.set("v.GrandTotalPrice" , grandTotal);
        component.set("v.buttonHide",true);
    },
    
    removeRow: function(component, event, helper) {
        // alert('removeRow');
        //Get the account list
        var CustomerDetailList = component.get("v.CustomerDetailList");
        //Get the target object
        var selectedItem = event.currentTarget;
        //Get the selected item index
        var index = selectedItem.dataset.record;
        CustomerDetailList.splice(index, 1);
        component.set("v.CustomerDetailList", CustomerDetailList);
    },
    
    Print: function(component, event, helper, productItem) {
     // alert('productItem===>'+productItem);
        //alert('check');
       	//alert(JSON.stringify(component.get("v.CustomerDetailList")));
        //alert('after');
            component.set('v.spinner',true);
        component.set("v.buttonHide",false);
        window.setTimeout(
            $A.getCallback(function() {
                helper.CreateRecordCustomerDetails(component, event, helper);
               // helper.CreateCustomerItemRecords(component, event, helper);
                helper.print(component, event, helper);
                component.set("v.spinner", false);
            }), 3000
        );
     },
})