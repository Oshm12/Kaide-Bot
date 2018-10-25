const commands = [
    '!poll - Allows you to create basic polls',
    '!help - This help menu',
    '!version - Show bot version',
]

const help = msg => {
    msg.author.send(
        `
        **Commands**\n\n${commands.join('\n')}
        `
    )
    
    msg.reply(`check your DMs`)
}

module.exports = help