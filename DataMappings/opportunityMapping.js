//Map message bus destination field = field that comes from salesforce
const mapping = {
    mappingName : "Opportunity",
    fields : {
        opportunityid: "dynamics",
        id: "OpportunityId",
        accountidname: "Account.DynamicsField",
        accountid: "AccountId",
        name: "Name",
        ryan_clientprincipalidname: "mvp_Client_Principal__c",
        ryan_marketingprofessionalidname: "mvp_Primary_Marketing_Professional__c",
        ryan_engagementprincipalidname: "mvp_Engagement_Principal__c",
        ryan_engagementmanageridname: "mvp_Engagement_Manager__c",
        ryan_marketingprofessional2idname: "mvp_Marketing_Professional_2__c",
        ryan_marketingprofessional3idname: "mvp_Marketing_Professional_3__c",
        ryan_marketingprofessional4idname: "mvp_Marketing_Professional_4__c",
        ryan_marketingprofessional5idname: "mvp_Marketing_Professional_5__c",
        em1empuserid: null,
        em2empuserid: null,
        em3empuserid: null,
        em4empuserid: null,
        em5empuserid: null,
        salesstagecode: "mvp_Process_Code__c",
        salesstage: null,
        closeprobability: "Probability",
        createdon: "CreatedDate",
        estimatedclosedate: "ClosedDate",
        ryan_ryanlegalentityidname: "mvp_Ryan_Legal_Entity__c",
        ryan_parentpracticeareaidname: "mvp_Parent_Practice_Area__c",
        ryan_practiceareaidname: "mvp_Practice_Area__c",
        ryan_jurisdictionidname: "mvp_Local_Jurisdiction__c",
        pricelevelidname: null,
        owneridname: "Owner.RCNumber",
        modifiedby: "LastModifiedBy.RCNumber",
        modifiedon: "LastModifiedDate",
        ryan_salesstagelastmodified: "mvp_Stage_Last_Modified__c",
        estimatedvalue: "Amount",
        closeyear: null,
        closemonth: null,
        servicetype: "mvp_Service_Type__c",
        geographicregion: "mvp_Geographic_Region__c",
        localjurisdiction: "mvp_Local_Jurisdiction__c",
        optionalidentifier: "mvp_Optional_Identifier__c",
        agreementexecutiondate: null,
        agreementissuedate: "mvp_Engagement_Letter_Date",
        statecode: "mvp_State_Code",
        statuscode: "mvp_Status_Reason__c",
        statusreason: "mvp_Status_Reason__c",
        potentialrevenue: null,
        accountguid: "AccountId",
        ryan_pursuitcategory: null,
        engagementguid: "mvp_Engagement__c",
        taxissuegroup: "mvp_Tax_Issue_Group_Name__c",
        taxissuestatus: null,
        plantorfacility: "mvp_Plant_Facility__c",
        intercompanyaccountnumber: null,
        intercompanyengagementid: null,
        acquisitionsource: "ERP_System__c",
        opportunityorigin: "mvp_Opportunity_Origin__c",
        opportunitytype: "Type",
        sourcesponsoredevent: "Campaign.Name"
    }
}

module.exports = {
    mapping
};

/* Sample Payload From Salesforce as of 2020-04-18
*/