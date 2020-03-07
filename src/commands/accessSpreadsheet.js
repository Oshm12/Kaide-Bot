const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('../../client_secret.json');

const accessSpreadsheet = async (bot, username, meritsValue) => {

    //console.log(meritsValue)

    const doc = new GoogleSpreadsheet('1334oQdRkEjDzWZdmHiypkfgErpJAZw4FRHU33v8Ygm4');
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];

    for (var t = 0; t < meritsValue.length; t++) {

        if (meritsValue[t] == '') {
            meritsValue.splice(t, 1);
            t--;
        }

    }

    const id = meritsValue[0].replace(/[\\<>@#&!]/g, "");

    const rows = await promisify(sheet.getRows)({
        query: `id = ${id}`
    });

    console.log(meritsValue);


    let valueToAdd = meritsValue[1];

    if (isNaN(valueToAdd)) {
        return;
        valueToAdd = 0;
        username.channel.send(`Can't add, NaN.`);
    }
    console.log(meritsValue);
    console.log(typeof valueToAdd);
    console.log("valueToAdd: " + valueToAdd);

    /*if (typeof meritsValue[1] == '') {
        console.log("true");
        valueToAdd = meritsValue[2];
        console.log("debug 1");
    }*/
    
    console.log(valueToAdd);

    //if (valueToAdd >= 0 || valueToAdd <= 0) {
        valueToAdd = +valueToAdd;
    console.log(typeof valueToAdd);
    console.log(valueToAdd);
    //}

    if (typeof valueToAdd != "number") {
        username.channel.send(`Invalid, you can only add integers, try again.`);
        return;
    }

    rows.forEach(row => {
        row.merits = +row.merits + valueToAdd;
        row.save()
        username.channel.send(`Successfully added ${valueToAdd} merits to ${meritsValue[0]}.`)

    })

    if (rows.length === 0) {
        username.channel.send(`User does not exist, check spelling or add new user.`);
    }

}

module.exports = accessSpreadsheet