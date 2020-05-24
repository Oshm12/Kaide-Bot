const commands = [
    '!poll - Allows you to create basic polls',
    '!help - This help menu',
    '!version - Show bot version',
    '!add @user *meritValue* - Allows admins to add merits to a user',
    '!new @user - Allows admins to add a new user to the merit list',
    '!merits - Allows anyone to check the merits of a user',
    '!attend - Admins: Updates attendance manual, try not to use',
    '!update - Admins: Updates users to databse, those in LIX',
    '!event - Admins: Creates a new event for the bots to create annoucements and record attendance for. Follow the steps.'
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
