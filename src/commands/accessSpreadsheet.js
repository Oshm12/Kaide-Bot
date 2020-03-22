const addUser = require('./addUser')
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('../../client_secret.json');
var membersAttended = []; 


const attendance = async (bot, args, msg) => {

    var discordMembers = args.guild.members

    //find those in channel
    const channelId = "501377189703450624";

    const myChan = bot.channels.find(chan => chan.id === channelId);
    const myMembers = Array.from(myChan.members.keys());
    
    console.log(myMembers);

    membersAttended = myMembers;
    //membersAttended.push(myMembers);
    
    updateAttendance(bot, args, msg);

}


const updateAttendance = async (bot, args, msg) => {

    

    //if (membersAttended) {

        console.log("Updating attendance.");
        //update google page with membersAtteneded
        const doc = new GoogleSpreadsheet('1334oQdRkEjDzWZdmHiypkfgErpJAZw4FRHU33v8Ygm4');
        await promisify(doc.useServiceAccountAuth)(creds);
        const info = await promisify(doc.getInfo)();
        const sheet = info.worksheets[1];

        const rows = await promisify(sheet.getRows)({


        });

        console.log("Rows: ");
        console.log(rows);
        
        
    console.log("FOR LOOPS COMPLETED");
   // }
}

module.exports = attendance;
