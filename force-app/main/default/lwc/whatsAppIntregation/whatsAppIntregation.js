import { LightningElement, api } from 'lwc';
import sendMyMessage from '@salesforce/apex/WhatsAppIntregationController.sendMessage';
export default class WhatsAppIntregation extends LightningElement {

    @api recordId;

    myTitle = "This is a whatsapp Intregation Component";

    connectedCallback() {
       //  window.alert("this is asgard");
    }


    onSendMessage(){

        sendMyMessage({ contactId : this.recordId})
        .then( result =>{
            window.alert("message sent succesfully to"+result);
        })
        .catch( error =>{
            window.alert("Message failed"+error);
        })
    }

}