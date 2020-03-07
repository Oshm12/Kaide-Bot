const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('../../client_secret.json');

const userMeritCount = async (bot, username, meritsValue) => {

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREAD_SHEET_KEY);
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];

    const id = meritsValue[0].replace(/[\\<>@#&!]/g, "");

    const rows = await promisify(sheet.getRows)({
        query: `id = ${id}`
    });

    if (rows.length == 0) {
        username.channel.send(`User is not added to database, please request an admin to add user.`);
    }

    else {

        rows.forEach(row => {
            let meritsToOutput = 0;
            meritsToOutput = row.merits;
            console.log(row.merits);
            username.channel.send(`User ${meritsValue[0]} has ${meritsToOutput} merits.`);
        })

    }
};

module.exports = userMeritCount;