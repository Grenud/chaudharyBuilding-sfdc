public class opportunityControllerData {
    
    @AuraEnabled
    public static List<Opportunity> getOpportunities(string recordId){
        system.debug('recordId-----'+recordId);
         list<opportunity> oppList = [SELECT Id, Name,StageName,CloseDate FROM Opportunity Where AccountId =: recordId];
        return oppList;
    }
    @AuraEnabled
    public static id insertOppMethod(String recordId) {
        system.debug('recordId is ------>'+recordId);
        list<opportunity> oppListToInsert = new list<opportunity>();
        
        opportunity opportunities = new opportunity();
        opportunities.AccountId = recordId ;
        opportunities.Name = 'New Opp' ;
        opportunities.CloseDate = system.today() ;
        opportunities.StageName = 'Prospecting' ;
        
        oppListToInsert.add(opportunities);
        
        if(!oppListToInsert.isEmpty()){
            insert oppListToInsert ;
        }
        system.debug('opportunities.Id--->'+opportunities.Id);
        return opportunities.Id ;
    }
}