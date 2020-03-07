const commands = [
    '!poll - Allows you to create basic polls',
    '!help - This help menu',
    '!version - Show bot version',
    '!add @user *meritValue* - Allows admins to add merits to a user',
    '!new @user - Allows admins to add a new user to the merit list',
    '!update - Updates users to databse, those in either of the 3 companies'
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