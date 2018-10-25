require('dotenv').config()
const Discord = require("discord.js")
const package = require("./package.json")
const mongoose = require("mongoose")
const config = package.config

const help = require('./src/commands/help')
const poll = require('./src/commands/poll')
const notify = require('./src/commands/notify')

mongoose.connect(process.env.DATABASE_URL, { dbName: 'test', useNewUrlParser: true })

const bot = new Discord.Client()

bot.on('ready', () => {
	console.log(`${bot.user.username} v${package.version} is ready!`)
})

bot.on('message', msg => {
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
})

bot.on('error', err => {
	console.log('Error', err)
})

// Invite link
// https://discordapp.com/oauth2/authorize?client_id=501866111017680911&scope=bot
bot.login(process.env.DISCORD_ACCESS_TOKEN);
