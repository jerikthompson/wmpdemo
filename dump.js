require('dotenv').config();
const fs = require('fs');
const jsforce = require('jsforce');
const conn = new jsforce.Connection({ loginUrl: process.env.LOGIN_URL });

const sobjectName = 'Account';

(async function() {
    console.log('logging in...');
    await conn.login(process.env.USERNAME, `${process.env.PASSWORD}${process.env.SECURITY_TOKEN}`);

    console.log(`getting ${sobjectName} info...`)
    const describeInfo = await conn.sobject(sobjectName).describe();
    fs.writeFileSync(`./${sobjectName}-describe.json`, JSON.stringify(describeInfo, null, 2));
    
    const fieldNames = describeInfo.fields.map(f => f.name).reduce((agg, fieldName, index) => {
        return index > 0 ? `${agg},${fieldName}` : fieldName;
    }, '');

    const soql = `select ${fieldNames} from ${sobjectName}`;
    
    console.log(`querying ${sobjectName} information...`);
    const records = await conn.query(soql);

    console.log(`writing ${sobjectName} data...`);
    fs.writeFileSync(`./${sobjectName}-data.json`, JSON.stringify(records, null, 2));

    console.log('done.');
})();


