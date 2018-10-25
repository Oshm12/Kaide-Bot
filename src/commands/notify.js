const notify = (bot, msg, args) => {

    const parentRoles = {
        "501854598336872458": ['501853147371929602']
    }

    console.log('args', args)
    const notification = args[0]
    const notifyRoles = args[1]

    console.log(notification, notifyRoles)

    msg.react('🎩')
    const roles = msg.member.roles.map(role => {
        return {
            'id': role.id,
            'name': role.name
        }
    })
    //msg.channel.send(JSON.stringify(roles))
    myRole = msg.member.roles.find(role => role.id === '501853147371929602')
    msg.channel.send(`<@&501853147371929602> ${myRole} test`)
    //console.log('test', msg)
    if(roles.find(role => parentRoles[role.id])) {
        msg.channel.send({
            embed: {
                author: {
                    name: 'Announcement'
                },
                color: 3447003,
                fields: [
                    {
                        name: 'Yay',
                        value: `${myRole}`
                    }
                ],
                timestamp: new Date()
            }
        })
    }
}

module.exports = notify