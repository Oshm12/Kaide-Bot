const addUser = require('./addUser')
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('../../client_secret.json');
var membersAttended = [];

var newEventAttendance = {

    Date: 1
}

const attendance = async (bot, args, msg) => {

    var discordMembers = args.guild.members

    //find those in channel
    const channelId = "693862501137252403";

    const myChan = bot.channels.find(chan => chan.id === channelId);
    const myMembers = Array.from(myChan.members.keys());



    membersAttended = myMembers;
    //membersAttended.push(myMembers);


    //if (membersAttended) {

    console.log("Updating attendance.");
    //update google page with membersAtteneded
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREAD_SHEET_KEY);
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[1];

    const rows = await promisify(sheet.getRows)({


    });

    console.log("Rows: ");
    console.log(rows[0]["a613753494557687822a"]);


    var n = Date(Date.now());
    var a = n.toString();

    newEventAttendance.Date = a;



    for (var t in membersAttended) {

        membersAttended[t] = "a" + membersAttended[t] + "a";
        console.log("Members: " + membersAttended[t]);
        newEventAttendance[membersAttended[t]] = 1;

    }

    totalAtt = Object.keys(newEventAttendance).length;

    newEventAttendance.total = totalAtt - 1;


}

module.exports = attendance;
