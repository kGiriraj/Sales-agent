import { LightningElement, wire } from 'lwc';
import getHelloMessage from '@salesforce/apex/HelloWorldController.getHelloMessage';
import getCustomMessage from '@salesforce/apex/HelloWorldController.getCustomMessage';

export default class HelloWorld extends LightningElement {
    greeting = '';
    nameInput = '';
    customMessage = 'Enter your name to see a personalized greeting!';

    // Wire the Apex method to get the hello message
    @wire(getHelloMessage)
    wiredGreeting({ error, data }) {
        if (data) {
            this.greeting = data;
        } else if (error) {
            this.greeting = 'Error loading greeting';
            console.error('Error:', error);
        }
    }

    // Handle name input change
    handleNameChange(event) {
        this.nameInput = event.target.value;
        
        // Call Apex method to get custom message
        if (this.nameInput) {
            getCustomMessage({ name: this.nameInput })
                .then(result => {
                    this.customMessage = result;
                })
                .catch(error => {
                    this.customMessage = 'Error loading custom message';
                    console.error('Error:', error);
                });
        } else {
            this.customMessage = 'Enter your name to see a personalized greeting!';
        }
    }
}