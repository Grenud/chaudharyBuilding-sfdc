@isTest
public class opportunityDataControllerTestClass {
    
    @isTest
    public static void dataTableTestMethod(){
        
        account acc = new account();
        acc.Name = 'Test opp';
        insert acc ;
        
        test.startTest() ;
        opportunityControllerData.getOpportunities(acc.Id);
        opportunityControllerData.insertOppMethod(acc.Id);
        test.stopTest();
    }

}