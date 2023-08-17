public class CustomerBillingClass {
    @AuraEnabled
    public static void SaveCustomerDetail(List<Customer_Detail__c> CustomerList){
        Insert CustomerList;
    }
    
    @AuraEnabled
    public static Id CreateCustomerDetail(string Name , string PhoneNo, string Address, datetime Date1, String Email, string Signature, Decimal TotalBill){
        List<Customer_Detail__c> CustomerDetailList=[Select id, name  from Customer_Detail__c where name =:Name];
        //  system.debug('VehicalRecList'+VehicalRecList.size());
        ID VehExistingId = null;
        Customer_Detail__c VehicalCustomerDetailRec = new Customer_Detail__c();
        if(CustomerDetailList.size()==0){
            VehicalCustomerDetailRec.Customer_Name__c = Name;
            VehicalCustomerDetailRec.Mobile_No__c = PhoneNo;
            VehicalCustomerDetailRec.Date_Time__c = Date1;
            VehicalCustomerDetailRec.Address__c = Address;
            VehicalCustomerDetailRec.Email__c = Email;
            VehicalCustomerDetailRec.Total_Bill_Amount__c = TotalBill;
            VehicalCustomerDetailRec.Signature__c = Signature;
            insert VehicalCustomerDetailRec;
        }
        else{
            VehExistingId = CustomerDetailList[0].Id;
        }
        // system.debug('Yard'+Yard);
        // system.debug('Scan'+Scan);
        // system.debug('VIN'+VIN);
         return VehicalCustomerDetailRec.Id;
    }
    
    /*
     * Method Name - GetCustomerRecordCount
     * Description - Create this method for Count the number of records in customer bill records.
     * Author - Lokendra Chauhan
     * Date - 30-March-2022
     * */
    @AuraEnabled
    public static Integer GetCustomerRecordCount(Integer billrecords){
        billrecords = [Select COUNT() From Customer_Detail__c];
        //System.debug(billrecords);
        return billrecords+1;
    }
    
    /*
     * Method Name - CustomerItemRecords
     * Description - Create this method for store the items record information in customer item records.
     * Author - Lokendra Chauhan
     * Date - 31-March-2022
     * */
   @AuraEnabled
    public static void CustomerItemRecords(String customerId, string Customername, string name, string item, Integer price, integer quantity, integer totalprice, integer grandtotalprice){
      system.debug('CustomerName====>'+CustomerName);
        List<Customer_Detail__c> CustomerDetailList=[Select id, name  from Customer_Detail__c where id =:Name];
        System.debug('CustomerDetailList'+CustomerDetailList);
        List<Customer_Item__c> CustomerItemsList=[Select id, name  from Customer_Item__c where id =:CustomerDetailList[0].id];
      
        List<Customer_Item__c> CustomerItemList = New List<Customer_Item__c>();
        for(Customer_Detail__c Customerdetails : CustomerDetailList){
            for(Integer i = 0; i < CustomerItemsList.size(); i++){
                Customer_Item__c itemRecords= new Customer_Item__c();
             itemRecords.Customer_Details__c = CustomerItemsList[i].Id;
            itemRecords.Customer_Name__c = CustomerName;
            itemRecords.Product_iteam__c = item;
            itemRecords.Product_Quantity__c = quantity;
            itemRecords.Product_Price__c = price;
            itemRecords.Total_Price__c = totalprice;
            CustomerItemList.add(itemRecords);   
            }
        }
        insert CustomerItemList;
        system.debug('CustomerItemList==>'+CustomerItemList);
}
    
 /*  @AuraEnabled
    public static void customerItemRecords( List< Customer_Item__c > itemList, String customerId, string Customername, string item, Integer price, integer quantity, integer totalprice, integer grandtotalprice) {
        for( Customer_Item__c item : itemList) {
            item.Customer_Details__c = customerId;
            item.Customer_Name__c = CustomerName;
            item.Product_iteam__c = item;
            item.Product_Quantity__c = quantity;
            item.Product_Price__c = price;
            item.Total_Price__c = totalprice;
        }
        if(itemList.size() > 0) {
            insert itemList;
}
    }*/
    }