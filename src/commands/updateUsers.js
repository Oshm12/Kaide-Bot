const addUser = require('./addUser')
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('../../client_secret.json');

const updateUsers = async (bot, args, msg) => {

    var discordMembers = args.guild.members;
    let membersArray = [];
    let nicknamesArray = [];
    const myMembers = discordMembers.map(member => {
        //'501116539702083584'
        if (member._roles.includes('501116539702083584') || member._roles.includes('501116705246806049') || member._roles.includes('501116197094293504')) {
            membersArray.push(member.id);
            nicknamesArray.push(member.displayName.replace(/[\\<>@#&!]/g, ""));
            //return member.username;
            return member.id;
        }
    });

    
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREAD_SHEET_KEY);
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];

    const rows = await promisify(sheet.getRows)({

    });
   
    //checking discord members list vs sheet list (IDs)
    
    for (var n in membersArray) {

        let newUser = true;

        for (var y in rows) {

            if (newUser == true) {

                if (membersArray[n] == rows[y].id) {
                    
                    newUser = false;
                    
                }
            }
        }

        //add new user
        if (newUser) {
            console.log(newUser);
            console.log("Previous unknown user");

            const newUserProfile = {
                ID: membersArray[n],
                Username: nicknamesArray[n],
                merits: 0
            }
            await promisify(sheet.addRow)(newUserProfile);
            args.channel.send(`Successfully added user: <@${membersArray[n]}>.`); 
        }

    }

    //console.log(membersArray);
    //console.log(nicknamesArray);
    console.log("Cav, line and rifles total: " + membersArray.length);
    args.channel.send(`Read in.`);

}
 
module.exports = updateUsers;