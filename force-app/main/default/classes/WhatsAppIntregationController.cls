public class WhatsAppIntregationController {

    
    @auraEnabled
    public static Boolean sendMessage( String contactId){
        
        Contact contactDetail = [Select id, Phone From Contact Where id =: contactId];
        
        string whatsappNumber ='91' +contactDetail.Phone;
        
        system.debug('whatsappNumber'+whatsappNumber);
        
        Http http = New Http();
        
        HttpRequest request = new HttpRequest();
        
        request.setEndpoint('https://graph.facebook.com/v13.0/106810185498002/messages');
        request.setHeader('Content-Type', 'application/json');
        request.setMethod('POST');
        
        String Body = '{ "messaging_product": "whatsapp", "to": "917217814944", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }';
      //  { \"messaging_product\": \"whatsapp\", \"to\": \"'+whatsappNumber +'", \"type\": \"template\", \"template\": { \"name\": \"hello_world\", \"language\": { \"code\": \"en_US\" } } }
        request.setBody(Body);
        
        String Token = 'EABK1mU3EkgABABmoZBZAQHhDag9HrKRxFsMjwICW9BdD1iZCDAlgPiD4auXjk3CkgVBGnw8cBIlYrQwxTb4qZCZAIxwqh2ZAVJoZBAxUZAqM4z2dQazeAdVARxakhukQv2d0YjIhy2Jh3IG67xYOY9ZAn8WSkF7ttkwZBl3RwLZASjyhpMVZCahkZCtiPIoqSvGQrbPt1GkqKu0eVsgE6bD4Hhngj';
        
        request.setHeader('Authorization','Bearer'+Token);
        
        HttpResponse response = Http.send(request);
        
        system.debug('response--->'+response.getBody());
        system.debug('response--->'+response.getStatusCode());
        
        if(response.getStatusCode() == 200){
            return true;
        }
        return false;
            
    } 

}