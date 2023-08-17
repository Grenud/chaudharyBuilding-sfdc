({
    addAccountRecord: function(component, event, helper) {
        //get the account List from component  
        var CustomerDetailList = component.get("v.CustomerDetailList");
        //Add New Account Record
        CustomerDetailList.push({
            'sobjectType': 'Customer_Item__c',
            'Product_iteam__c': '',
            'Product_Price__c': '',
            'Product_Quantity__c': '',
            'Total_Price__c': ''
            
        });
        component.set("v.CustomerDetailList", CustomerDetailList);
    },
    
    CreateRecordCustomerDetails: function(component, event, helper) {
        var Customer = component.get("v.CustomerName");
        var Phone = component.get("v.Phone");
        var Address = component.get("v.Address");
        var Datetime = component.get("v.Datetime");
        var Email = component.get("v.Email");
        var Signature = component.get("v.Signature");
        var TotalBill = component.get("v.GrandTotalPrice");
        // method name i.e. CreateChargeRecordFetch should be same as defined in apex class
        var action = component.get("c.CreateCustomerDetail");
        action.setParams({
            Name : Customer, 
            PhoneNo : Phone,
            Address : Address,
            Date1 : Datetime,
            Email : Email,
            TotalBill : TotalBill,
            Signature : Signature
        }); 
        action.setCallback(this, function(response){
            var responseValue = response.getReturnValue();
            var state = response.getState();
            if (state === "SUCCESS"){
                //If customer details successfully inserted then add items
                component.set('v.customerId', response.getReturnValue());
                var action = component.get("c.customerItemRecords");
                action.setParams({
                    'itemList' : component.get("v.CustomerDetailList"),
                    'customerId' : component.get("v.customerId")
                }); 
                action.setCallback(this, function(response){
                    var responseValue = response.getReturnValue();
                    var state = response.getState();
                    if (state === "SUCCESS"){
                        // Toast messages to display after geeting record.
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": "Success!",
                            "message": "Customer Details Record Created Successfully.",
                            type: 'success',
                        });
                        toastEvent.fire();
                        component.set("v.CustomerName",'');
                        component.set("v.Phone",'');
                        component.set("v.Address",'');
                        component.set("v.Datetime",'');
                        component.set("v.Email",'');
                        component.set("v.GrandTotalPrice",'');
                        component.set("v.spinner", false);
                        location.reload(true);
                    }
                });
                $A.enqueueAction(action);
                // Toast messages to display after geeting record.
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "Scan Point completed successfully.",
                    type: 'success',
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
    
    GetBillRecords: function(component,event,helper){
        var action = component.get("c.GetCustomerRecordCount");
        action.setParams({
        billrecords : component.get("v.billrecords")
        });
        action.setCallback(this, function(response){
                               var state = response.getState();
          //  alert('response.getReturnValue()'+response.getReturnValue());
                               if(state === "SUCCESS"){
                               component.set("v.billrecords", response.getReturnValue());
                               }
                           });
        $A.enqueueAction(action);
    },
    
    
    print: function(component, event, helper)
    {
        $A.util.addClass(component.find("Print"), "slds-hidden");
        $A.util.removeClass(component.find("Print"), "slds-hidden");
        $A.util.removeClass(component.find("AddProduct"), "slds-hidden");
        $A.util.removeClass(component.find("removeRow"), "slds-hidden");
        window.print();
        component.set("v.buttonHide",true);
        component.set("v.buttonHideTotal",false);
        component.set("v.buttonHideprint",false);
    },
    
    CreateCustomerItemRecords: function(component, event, helper, productItem )
    {
        var Customer = component.get("v.CustomerName");
        var productItem = component.get("v.Product_iteam__c");
        alert('productItem===>'+productItem);
        var CustomerName = component.get("v.CustomerName");
        alert('CustomerName===>'+CustomerName);
        var Itemprice = component.get("v.Product_Price__c");
        alert('ItemPrices==>'+Itemprice);
        var Quantities = component.get("v.Product_Quantity__c"); 
        // method name i.e. CreateItemRecordFetch should be same as defined in apex class
        var action = component.get("c.CustomerItemRecords");
        action.setParams({
            'itemList' : component.get("v.CustomerDetailList"),
            'customerId' : component.get("v.customerId"),
            Customername : CustomerName 
        }); 
         alert('Customername2===>'+Customername);
        action.setCallback(this, function(response){
           // alert('abvcgcf222222');
            var responseValue = response.getReturnValue();
          //  alert('acfrd');
            var state = response.getState();
            alert(state);
            if (state === "SUCCESS"){
                // Toast messages to display after geeting record.
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "Customer Item Records Created successfully.",
                    type: 'success',
                });
                toastEvent.fire();
            }
        });
         $A.enqueueAction(action);
    }
    
    
})