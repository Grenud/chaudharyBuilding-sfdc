 import { LightningElement, track } from 'lwc';
 // import generateInvoiceApex from '@salesforce/apex/BillingController.generateInvoice';

 export default class BillingProcessLWC extends LightningElement {


    @track customerName = '';
    @track amount = 0;

    handleCustomerNameChange(event) {
        this.customerName = event.target.value;
    }

    handleAmountChange(event) {
        this.amount = event.target.value;
    }

// //     generateInvoice() {
// //         // Call the Apex method to generate the invoice
// //         generateInvoiceApex({ customerName: this.customerName, amount: this.amount })
// //             .then(result => {
// //                 // Handle success, e.g., show a success message
// //                 this.showToast('Success', 'Invoice generated successfully', 'success');
// //             })
// //             .catch(error => {
// //                 // Handle error, e.g., show an error message
// //                 this.showToast('Error', 'An error occurred while generating the invoice', 'error');
// //             });
// //     }

// //     showToast(title, message, variant) {
// //         const event = new ShowToastEvent({
// //             title: title,
// //             message: message,
// //             variant: variant,
// //         });
// //         this.dispatchEvent(event);
// //     }
  }
