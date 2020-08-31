require('dotenv').config()
const Discord = require("discord.js")
const package = require("./package.json")
const mongoose = require("mongoose")
const config = package.config
const schedule = require('node-schedule');

//Test
const censor_list = require('./censor_list.json');

const help = require('./src/commands/help')
const poll = require('./src/commands/poll')
const notify = require('./src/commands/notify')
const accessSpreadsheet = require('./src/commands/accessSpreadsheet')
const addUser = require('./src/commands/addUser')
const updateUsers = require('./src/commands/updateUsers')
const userMeritCount = require('./src/commands/userMeritCount')
const addNewEvent = require('./src/commands/newEvent')
const attendance = require('./src/commands/attendance')
const weeklySchedule = require('./src/commands/weeklySchedule')

const devChannelID = "693888511010406421";

mongoose.connect(process.env.DATABASE_URL, { dbName: 'test', useNewUrlParser: true })

const bot = new Discord.Client()

bot.on('ready', () => {
    console.log(`${bot.user.username} v${package.version} is ready!`)
    console.log("Date is here: " + Date.now());

   // console.log("Time is here: " + getTime());

    /*
    var j = schedule.scheduleJob('1 * * * * *', function () {
        const channel = bot.channels.find('name', "dev-wookie");
        //channel.send(message)
        console.log('The answer to life, the universe, and everything!');
        channel.send("Special Scheduled Messaged Test");
    }); */
})


bot.on('message', msg => {
    //
    let censor_msg = msg.content;
    censor_msg = censor_msg.toLowerCase();

    for(var h in censor_list.words){
        if (censor_msg.includes(censor_list.words[h])) {

            if(!msg.author.bot){
                let user = msg.member;
                const channelId = devChannelID;
                const myChan = bot.channels.find(chan => chan.id === channelId);

                if(user.kickable){
                    user.kick("You've been warned")
                    msg.delete();

                    //posts in dev channel with who was banned and the offending message
                    myChan.send("User kicked for use of proscribed word: " + user + "\nMessage was: " + msg.content);

                    console.log("Test word kicked: " + msg.content);
                }

                else{
                    myChan.send("User not kicked due to perms/error " + user + "\nMessage was: " + msg.content);
                    console.log("Test word kicked: " + msg.content);
                }
            }
        }
    }

    if (msg.content ===  '129315536734650368'){

        //msg.delete();
      //  msg.channel.send("I study media");
        //msg.react('514274069294612482');
    }



	if (msg.author.bot) return
	if (!msg.content.startsWith(config.prefix)) return

	let command = msg.content.split(" ")[0]
	command = command.slice(config.prefix.length)
	command = command.toLowerCase()

	let args = msg.content.split(" ").slice(1)

    //admin check
    if(msg.member.roles.find(role => role.name === 'ADMINISTRATOR') || msg.member.roles.find(role => role.name === 'ROOT')) {

        const authorAdmin = true;

    }

    else authorAdmin = false;

    if (command === 'version' || command === 'v') {
        msg.channel.send(`Version: ${package.version}`)
    }


    else if (command === 'help' || command === 'h') {
        help(msg)
    }

    else if (command === 'poll') {
        poll(bot, msg, args)
    }

    else if (command === 'notify') {
        notify(bot, msg, args)
    }

    else if (command === 'update') {
        if(authorAdmin){
            console.log("Command update read in. List update");
            updateUsers(bot, msg, args)
        }

    }

    else if (command === 'add') {
        if(authorAdmin){
            accessSpreadsheet(bot, msg, args)
            console.log("Command add read in.");
        }
    }

    else if (command === 'new') {
        if(authorAdmin){
            addUser(bot, msg, args);
            console.log("Command newUser read in.");
        }

        else{
            msg.channel.send("Only admins can use that role.");
        }
    }

    else if (command === 'merits' ) {
        userMeritCount(bot, msg, args);
        console.log("Command merits/userMeritCount read in.");

    }

    else if (command === 'event') {
        if(authorAdmin){
            addNewEvent(bot, msg, args);
            console.log("Command event (addNewEvent) read in.");
        }
        else{
            msg.channel.send("Only admins can use that role.");
        }
    }

    else if (command === 'attend' || command === 'attendance') {
        if(authorAdmin){
            attendance(bot, msg, args);
            console.log("Command event (attendance) read in.");
        }
        else{
            msg.channel.send("Only admins can use that role.");
        }

    }

    else if (command === 'schedule') {
        weeklySchedule(msg);
        console.log("Command event (schedule) read in.");
    }


})

bot.on('error', err => {
	console.log('Error', err)
})

// Invite link
// https://discordapp.com/oauth2/authorize?client_id=501866111017680911&scope=bot
bot.login(process.env.DISCORD_ACCESS_TOKEN);
