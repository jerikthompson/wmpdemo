const _ = require('lodash');
const azure = require('azure');

const asbMessageGenerator = require('./asbMessageGenerator');

const serviceBusService = azure.createServiceBusService();

const sleep = (secs) => {
    return new Promise(resolve => setTimeout(resolve, 1000 * secs));
}

const processTable = async (table, mapping) => {
    console.log(`sending ${table.records.length} messages`);

    for (const row of table.records) {
        const accountMsg = asbMessageGenerator.createMessage(row, mapping, "UPDATE");

        await sleep(.01);//this prevents ASB from throttling

        serviceBusService.sendTopicMessage('salesforce-erik-events', accountMsg, (error) => {
            if (error) {
                console.log(error);
            }
        });  
    }
};

exports.processTable = processTable;