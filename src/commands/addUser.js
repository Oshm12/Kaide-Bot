const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./client_secret.json');

async function accessSpreadsheet(name, meritsValue) {

    const doc = new GoogleSpreadsheet('1334oQdRkEjDzWZdmHiypkfgErpJAZw4FRHU33v8Ygm4');
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];

    
    const rows = await promisify(sheet.getRows)({
        query: `username = ${name}`
    });

    if (rows.length == 0) {

        const newUser = {
            username: name
        }
        await promisify(sheet.addRow)(newUser);
    }
}

accessSpreadsheet('decoy', 10);
