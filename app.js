const _ = require('lodash');

const salesforce = require('./SalesforceManager');
const asbController = require('./AsbController');
const dataMappings = require('./DataMappings');

(async () => {
    const itemList = [{
        salesforceTable: "User",
        mapping: dataMappings.user.mapping,
        processSalesforce: true,
        processAzure: false
    }, {
        salesforceTable: "Account",
        mapping: dataMappings.account.mapping,
        processSalesforce: true,
        processAzure: true
    }, {
        salesforceTable: "Contact",
        mapping: dataMappings.contact.mapping,
        processSalesforce: true,
        processAzure: true
    }, {
        salesforceTable: "Opportunity",
        mapping: dataMappings.opportunity.mapping,
        processSalesforce: true,
        processAzure: false
    }, {
        salesforceTable: "Product2",
        mapping: dataMappings.product.mapping,
        processSalesforce: true,
        processAzure: false
    }];
    
    let tableNames = await salesforce.getCustomTableList();
    for(const tableName of tableNames){
        console.log($`Found custom table named: ${tableName}`);
    }
    return ;

    let tables = [];
    for (const item of itemList) {
        console.log(`Processing ${item.salesforceTable}`);

        let table = null;
        if (item.processSalesforce) {
            table = await salesforce.getTable(item.salesforceTable);
            tables.push(table);

            if (item.processAzure) {
                await asbController.asbTableProcessor.processTable(table, item.mapping);    
            }
        }
    }

    console.log(`${tables.length} tables processed`);    
})();
