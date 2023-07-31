import { client, prisma } from ".."

client.discordClient?.on("messageCreate", async (message) => {
	const content = message.content.toLowerCase()
	const data = await prisma.answer.findFirst({
		where: {
			answer: content,
			channelId: message.channel.id,
		},
	})
	if (!data) return

	await message.delete()

	if (data.coinsToAdd) {
		// add coins
	}
	if (data.roleToAdd) {
		message.member?.roles.add(data.roleToAdd)
	}
	if (data.roleToRemove) {
		message.member?.roles.remove(data.roleToRemove)
	}
	if (data.dmToSend) {
		message.author.send(data.dmToSend)
	}
})
