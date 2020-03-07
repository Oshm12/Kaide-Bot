const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('../../client_secret.json');

const addUser = async (bot, username, meritsValue) => {

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREAD_SHEET_KEY);
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];

  
    const id = meritsValue[0].replace(/[\\<>@#&!]/g, "");
    
    const rows = await promisify(sheet.getRows)({
        query: `id = ${id}`
    });

    if (rows.length == 0) {

        const newUser = {
            ID: id,
            Username: "Placeholder",
            merits: 0
        }
        await promisify(sheet.addRow)(newUser);
        console.log("Debug 1");
        username.channel.send(`Successfully added user: ${meritsValue[0]}.`);
    }

    else {
        username.channel.send(`User: ${meritsValue[0]}, is already included.`);
        console.log("Debug 2");
    }
}

module.exports = addUser;