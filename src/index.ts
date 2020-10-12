import { Client, Message, ChannelLogsQueryOptions } from 'discord.js'
import { default as config } from './config.json'
import * as fs from 'fs'

const client = new Client()

client.once('ready', async () => {
	console.info(`Logged in as ${client.user?.tag}!`)
	const channelRef = await client.channels.fetch('689243098488111383')
	const channel = await channelRef.fetch()
	channel
})

client.on('message', async (message: Message) => {
	if (message.content === '!goomba') {
		let lastMessageId: string | undefined = undefined
		let done = false
		while (!done) {
			let options: ChannelLogsQueryOptions = { limit: 100 }
			if (lastMessageId) {
				options.before = lastMessageId
			}
			const messages = await message.channel.messages.fetch(options)
			const length = messages.size
			if (length < 100) done = true
			lastMessageId = messages.last()?.id
			const messagesToString = messages.map((m) => m.toString()).join('\n')

			fs.writeFileSync('messages.txt', messagesToString, {
				flag: 'a',
				encoding: 'utf8',
			})
		}
	}
	if (message.content === 'ping') {
		message.reply('pong')
	}
})

client.login(config.token)
