trigger createContactRecord on Account (before update, after update) {
  // set<id> accSet = new set<id>();
  
    for(account ac : trigger.new){
        system.debug(trigger.oldMap.get(ac.Id).Name);
        if(trigger.oldMap.get(ac.Id).Name == ac.Name){
            ac.addError('please provide new Name');
        }
        
    }
    
    
}