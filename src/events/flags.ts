import { client, prisma } from ".."

client.discordClient?.on("messageCreate", async (message) => {
	const content = message.content.toLowerCase()
	const data = await prisma.flag.findFirst({
		where: {
			answer: content,
			channelId: message.channel.id,
		},
	})
	if (!data) return

	const logs = await message.guild?.channels.fetch("1135453872257781810")
	if (!logs || !logs.isTextBased()) return

	await message.delete().catch(() => {})

	logs.send(
		`<a:siren:1135454441852633219> **Anticheat Triggered**\n  - User: <@${message.author.id}> (${message.author.id})\n  - Channel: <#${message.channel.id}>\n  - Flag: \`${content}\``
	)
})
