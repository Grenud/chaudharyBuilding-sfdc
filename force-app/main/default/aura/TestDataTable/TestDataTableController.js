({
	init : function(component, event, helper) {
		component.set('v.columns', [
            {label: 'Opportunity name', fieldName: 'opportunityName', type: 'text', initialWidth: 150},
            {label: 'Account name', fieldName: 'accountName', type: 'text',initialWidth: 150},
            {label: 'Close date', fieldName: 'closeDate', type: 'date',initialWidth: 150},
            {label: 'Confidence', fieldName: 'confidence', type: 'percentage',initialWidth: 150},
            {label: 'Amount', fieldName: 'amount', type: 'currency',initialWidth: 150},
            {label: 'Contact Email', fieldName: 'contact', type: 'email',initialWidth: 150},
            {label: 'Contact Phone', fieldName: 'phone', type: 'phone',initialWidth: 150},
            {label: 'Website', fieldName: 'website', type: 'url',initialWidth: 150},
            {label: 'Address', fieldName: 'address', type: 'location',initialWidth: 150}
        ]);

	}
})