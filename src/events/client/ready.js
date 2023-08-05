const { ActivityType } = require('discord.js')
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} est connecté`)

        const activities = [
            'ce develope',
            'ce detend',
            'Youtube',
            'apprend a codé'
        ]

        setInterval(() => {
            const status = activities[Math.floor(Math.random() * activities.length)]
            client.user.setPresence({ activities: [{ name: `${status}`, type: ActivityType.Competing }], status: 'dnd' })
        }, 5000)
    }
}