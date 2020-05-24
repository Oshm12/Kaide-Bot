require('dotenv').config()
const Discord = require("discord.js")
const package = require("./package.json")
const mongoose = require("mongoose")
const config = package.config
const schedule = require('node-schedule');

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
    let censor = msg.content;
    censor = censor.toLowerCase();

    if (censor.includes("nigger") || censor.includes("nigga")) {

        let user = msg.member;
        user.kick("You've been warned");
        msg.delete();

        const channelId = "501377189703450624";

        const myChan = bot.channels.find(chan => chan.id === channelId);

        myChan.send("User kicked for n word ussage: " + user + "\nMessage was: " + msg.content);

        console.log("Test word kicked: " + msg.content);

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

    else if (command === 'update' && true /* admin */) {
        console.log("Command update read in. List update");
        updateUsers(bot, msg, args)

    }

    else if (command === 'add' && true /* admin */) {
        accessSpreadsheet(bot, msg, args)
        console.log("Command add read in.");
        //console.log(msg);
    }

    else if (command === 'new' && true /* admin */) {
        addUser(bot, msg, args);
        console.log("Command newUser read in.");

    }

    else if (command === 'merits' ) {
        userMeritCount(bot, msg, args);
        console.log("Command merits/userMeritCount read in.");

    }

    else if (command === 'event') {
        addNewEvent(bot, msg, args);
        console.log("Command event (addNewEvent) read in.");

    }

    else if (command === 'attend' || command === 'attendance') {
        attendance(bot, msg, args);
        console.log("Command event (attendance) read in.");

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
