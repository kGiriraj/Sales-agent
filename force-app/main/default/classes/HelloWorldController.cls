public with sharing class HelloWorldController {
    
    @AuraEnabled(cacheable=true)
    public static String getHelloMessage() {
        return 'Hello World from Salesforce!';
    }
    
    @AuraEnabled(cacheable=true)
    public static String getCustomMessage(String name) {
        if (String.isBlank(name)) {
            return 'Hello World!';
        }
        return 'Hello ' + name + '!';
    }
}