trigger contactName on Contact (before insert,before update) {
    
    set<string> contactId= new set<string>();
    if(trigger.isbefore && trigger.isinsert){
     for(Contact con : trigger.new){
        contactId.add(con.LastName);
         system.debug(con.LastName);
    }   
    }
    if(trigger.isbefore && trigger.isUpdate){
      for(Contact oldcon : trigger.old){
       contactId.add(oldcon.LastName); 
    }  
    }
    
   List<contact> contactlist = [select id, name,LastName from contact where LastName in:contactId];
    
    for(contact con1 :contactlist){
        
        for(contact con2:trigger.new){
            if(con1.LastName ==  con2.LastName){
                con2.addError('name exists');
            }
        }
         for(contact con3:trigger.old){
            if(con1.LastName ==  con3.LastName){
                con3.addError('name exists');
            }
        }
    
    }
 /*   set<String> contactName = new set<String>();
    for(contact contact : trigger.new){
        contactName.add(contact.lastName);
    }
    
    list<contact> myContact = [Select lastName from contact where lastName In: contactName];
    
    for(contact contacts : trigger.new){
        for(contact cons : myContact){
            if(contacts.lastName == cons.lastName){
                contacts.addError('name exists');
            }
        }
    }*/
    
    
    
}