require('dotenv').config();
const fs = require('fs');
const jsforce = require('jsforce');

const conn = new jsforce.Connection({ loginUrl: process.env.LOGIN_URL });

const sleep = (secs) => {
    return new Promise(resolve => setTimeout(resolve, 1000 * secs));
}

const getTable = async (sobjectName) => {
    console.log(`logging in ${process.env.LOGIN_URL} ${process.env.SFUSERNAME}...`);
    await conn.login(process.env.SFUSERNAME, `${process.env.SFPASSWORD}${process.env.SFSECURITY_TOKEN}`);

    console.log(`getting ${sobjectName} info...`)
    const describeInfo = await conn.sobject(sobjectName).describe();
    fs.writeFileSync(`./ExportedFiles/${sobjectName}-describe.json`, JSON.stringify(describeInfo, null, 2));
    
    const fieldNames = describeInfo.fields.map(f => f.name).reduce((agg, fieldName, index) => {
        return index > 0 ? `${agg},${fieldName}` : fieldName;
    }, '');

    const soql = `select ${fieldNames} from ${sobjectName} order by Id`;
    
    console.log(`querying ${sobjectName} information...`);
    let result = await conn.query(soql);
    
    const records = [];
    records.push(...result.records);

    while (result.records && result.records.length) {
        console.log(`acquired ${records.length} records, querying for more ${sobjectName} records...`);
        result = await conn.query(`select ${fieldNames} from ${sobjectName} where Id > '${records[records.length - 1].Id}' order by Id`);

        records.push(...result.records);
    }

    const finalResults = {
        "totalSize": records.length,
        "done": true,
        "records": records
    };

    console.log(`writing ${sobjectName} data...`);
    fs.writeFileSync(`./ExportedFiles/${sobjectName}-data.json`, JSON.stringify(finalResults, null, 2));
    
    console.log(`Download of ${sobjectName} Complete`)
    return finalResults;
};

const getTableBatch = async (sobjectName) => {
    console.log(`logging in ${process.env.LOGIN_URL} ${process.env.SFUSERNAME}...`);
    await conn.login(process.env.SFUSERNAME, `${process.env.SFPASSWORD}${process.env.SFSECURITY_TOKEN}`);

    console.log(`getting ${sobjectName} info...`)
    const describeInfo = await conn.sobject(sobjectName).describe();
    fs.writeFileSync(`./ExportedFiles/${sobjectName}-describe.json`, JSON.stringify(describeInfo, null, 2));
    
    const fieldNames = describeInfo.fields.map(f => f.name).reduce((agg, fieldName, index) => {
        return index > 0 ? `${agg},${fieldName}` : fieldName;
    }, '');

    const soql = `select ${fieldNames} from ${sobjectName}`;
    const records = [];
    
    let stopTime = new Date(3030, 1, 1);
    console.log(`querying ${sobjectName} information...`);
    const query = await conn.bulk.query(soql)
        .on('record', record => {
            console.log(`record found, ${records.length + 1} found`)
            //console.log(record);
            records.push(record);
            stopTime = new Date().getTime() + (1000 * 15);
        })
        .on('error', err => {
            console.log(err);
            stopTime = new Date();
        });
    
    const finalResults = {
        "totalSize": records.length,
        "done": true,
        "records": records
    };

    while(new Date() < stopTime){
        console.log('sleeping');
        await sleep(3);
    }

    console.log(`writing ${sobjectName} data...`);
    fs.writeFileSync(`./ExportedFiles/${sobjectName}-data.json`, JSON.stringify(finalResults, null, 2));
    
    console.log(`Download of ${records.length} records for ${sobjectName} Complete`)
    return finalResults;
};

const getCustomTableList = async() => {
    console.log(`logging in ${process.env.LOGIN_URL} ${process.env.SFUSERNAME}...`);
    await conn.login(process.env.SFUSERNAME, `${process.env.SFPASSWORD}${process.env.SFSECURITY_TOKEN}`);

    let tableNames = [];

    var types = [{type: 'CustomObject', folder: null}];
    conn.metadata.list(types, '47.0', (err, metadata) => {
        if (err) { return console.error(" err ", err); }

        metadata.sort((a, b) => (a.fullName > b.fullName) ? 1 : -1);

        // Populate dropdown with list of objects
        metadata.forEach(obj => {
            tableNames.push(obj.fullName);
        });
    });
    return tableNames;
};

module.exports = {
    getTable,
    getCustomTableList
}
