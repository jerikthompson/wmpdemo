const _ = require('lodash');

const salesforce = require('./SalesforceManager');
const asbController = require('./AsbController');
const dataMappings = require('./DataMappings');

(async () =>{
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
    
    let tables = [];
    for (const item of itemList) {
        if (!item.processSalesforce) return;
        const table = await salesforce.getTable(item.salesforceTable);
        tables.push(table);

        if (!item.processAzure) return;
        await asbController.asbTableProcessor.processTable(table, item.mapping);    
    }

    console.log(`${tables.length} tables processed`);    
})();
