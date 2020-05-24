const schedule = [
    'Monday - 2eHuss Linebattle 7PM UK time.',
    'Thursday - 102nd Trench Battle 7PM UK time.',
    'Friday - Native fun event 8PM UK time.'
]

const weeklySchedule = msg => {
    msg.author.send(
        `
        **Event Schedule**\n\n${schedule.join('\n')}
        `
    )

    msg.reply(`check your DMs`)
}

module.exports = weeklySchedule
