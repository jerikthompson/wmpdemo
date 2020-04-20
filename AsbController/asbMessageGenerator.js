const _ = require('lodash');

const createMessage = function(data, mapping, createOrUpdate){
  let bodyValues = [];
  _.forOwn(mapping.fields, function(value, propertyName) { 
    if (value) {
      bodyValues.push({"OldValue":null,"CurrentValue": data[`${value}`],"AttributeName":propertyName});
    }
  });
  return {
    body: JSON.stringify({
        "$type": "Ryan.Bus.Salesforce.Bridge.Models.SalesforceEventEnvelope, Ryan.Bus.Salesforce.Bridge",
        "Channel": "/event/Event_Bus__e",
        "Data": {
          "$type": "CometD.NetCore.Salesforce.Messaging.MessageData`1[[Ryan.Bus.Salesforce.Bridge.Models.SalesforceMessagePayload, Ryan.Bus.Salesforce.Bridge]], CometD.NetCore.Salesforce",
          "Schema": "BULK_LOAD_MAPPING",
          "Payload": {
            "$type": "Ryan.Bus.Salesforce.Bridge.Models.SalesforceMessagePayload, Ryan.Bus.Salesforce.Bridge",
            "Action__c": null,
            "Body__c": JSON.stringify({"Values":bodyValues,"EntityID":data.Id,"Entity":mapping.mappingName,"Action":createOrUpdate}),
            "Entity__c": null,
            "Record_Id__c": null,
            "Values__c": null,
            "CreatedDate": new Date().toISOString(),
            "CreatedById": "0054F000002hSz7QAE"
          },
          "Event": {
            "$type": "CometD.NetCore.Salesforce.Messaging.MessageEvent, CometD.NetCore.Salesforce",
            "ReplayId": -99
          }
        }
    })
  }
}

exports.createMessage = createMessage;
