public class TestDataTablecontroller {
   @AuraEnabled
    public static list<Customer_Detail__c> fetchVehicleRecords() {
         List < Customer_Detail__c > lstOfVIN = [select id, Name,Mobile_No__c,Customer_Name__c from Customer_Detail__c];
         return lstOfVIN;
    }
}