const _ = require('lodash');
const azure = require('azure');

const asbMessageGenerator = require('./asbMessageGenerator');

const serviceBusService = azure.createServiceBusService();

const processTable = function(table, mapping){
    _.map(table.records, row => {
        const accountMsg = asbMessageGenerator.createMessage(row, mapping, "UPDATE");
        serviceBusService.sendTopicMessage('salesforce-erik-events', accountMsg, function(error) {
            if (error) {
                console.log(error);
            }
        });  
    });
};

exports.processTable = processTable;