const salesforce = require('./SalesforceManager');
const asbController = require('./AsbController');
const dataMappings = require('./DataMappings');

(async function(){
    const itemList = [{
        salesforceTable: "Account",
        mapping: dataMappings.account.mapping,
        processSalesforce: true,
        processAzure: true
    },{
        salesforceTable: "Contact",
        mapping: dataMappings.contact.mapping,
        processSalesforce: true,
        processAzure: true
    },{
        salesforceTable: "Opportunity",
        mapping: dataMappings.account.mapping,
        processSalesforce: true,
        processAzure: true
    },{
        salesforceTable: "Product2",
        mapping: dataMappings.account.mapping,
        processSalesforce: true,
        processAzure: true
    }];
    
    await Promise.all(itemList.map(function(item){
        if (!item.processSalesforce) return;
        const table = await salesforce.getTable(item.salesforceTable);

        if (!item.processAzure) return;
        asbController.asbTableProcessor.processTable(table, item.mapping);    
    }));

    console.log('exiting');    
})();
