require('dotenv').config();
const fs = require('fs');
const jsforce = require('jsforce');

const conn = new jsforce.Connection({ loginUrl: process.env.LOGIN_URL });

async function getTable(sobjectName) {
    console.log(`logging in ${process.env.LOGIN_URL} ${process.env.SFUSERNAME}...`);
    await conn.login(process.env.SFUSERNAME, `${process.env.SFPASSWORD}${process.env.SFSECURITY_TOKEN}`);

    console.log(`getting ${sobjectName} info...`)
    const describeInfo = await conn.sobject(sobjectName).describe();
    fs.writeFileSync(`./ExportedFiles/${sobjectName}-describe.json`, JSON.stringify(describeInfo, null, 2));
    
    const fieldNames = describeInfo.fields.map(f => f.name).reduce((agg, fieldName, index) => {
        return index > 0 ? `${agg},${fieldName}` : fieldName;
    }, '');

    const soql = `select ${fieldNames} from ${sobjectName}`;
    
    console.log(`querying ${sobjectName} information...`);
    const records = await conn.query(soql);

    console.log(`writing ${sobjectName} data...`);
    fs.writeFileSync(`./ExportedFiles/${sobjectName}-data.json`, JSON.stringify(records, null, 2));

    console.log(`Download of ${sobjectName} Complete`)
    return records;
};

module.exports = {
    getTable
}