const addUser = require('./addUser')
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('../../client_secret.json');
var membersAttended = [];


const updateAttendance = async (bot, args, msg) => {

    const doc = new GoogleSpreadsheet('1334oQdRkEjDzWZdmHiypkfgErpJAZw4FRHU33v8Ygm4');
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[1];


    await promisify(sheet.addRow)(newEventAttendance);

    console.log("NEW EVENT ATTENDANCE: ")
    console.log(Object.keys(newEventAttendance));

    console.log("FOR LOOPS COMPLETED");
   // }
}

module.exports = updateAttendance;
