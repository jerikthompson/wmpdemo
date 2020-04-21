const _ = require('lodash');
const azure = require('azure');

const asbMessageGenerator = require('./asbMessageGenerator');

const serviceBusService = azure.createServiceBusService();

const processTable = (table, mapping) => {
    console.log(`sending ${table.records.length} messages`);
    _.map(table.records, row => {
        const accountMsg = asbMessageGenerator.createMessage(row, mapping, "UPDATE");
        serviceBusService.sendTopicMessage('salesforce-erik-events', accountMsg, (error) => {
            if (error) {
                console.log(error);
            }
        });  
    });
};

exports.processTable = processTable;