import { Component, CrossBuild, ReceivedInteraction } from "crossbuild"
import { ApplicationCommandOptionType } from "discord.js"
import { prisma } from ".."

export default class Cmd extends Component {
	constructor(client: CrossBuild) {
		super("flag", "command", client, {
			description: "Manage flagged answers",
			serverOnly: true,
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "type",
					description: "The type of command",
					required: true,
					choices: [
						{
							name: "add",
							value: "add",
						},
						{
							name: "remove",
							value: "remove",
						},
					],
				},
				{
					type: ApplicationCommandOptionType.String,
					name: "item",
					description: "The Unbelievaboat item to manage (use the item ID)",
					required: true,
				},
				{
					type: ApplicationCommandOptionType.String,
					name: "flag",
					description: "The flag to add",
				},
			]
		})
	}

	override async run(interaction: ReceivedInteraction) {
		if (!interaction.server) return interaction.reply("No server provided")
		const options = interaction.options
		if (!options) return interaction.reply("No options provided")
		const type = options["type"]
		if (!type) return interaction.reply("No type provided")
		const channel = options["channel"]
		if (!channel) return interaction.reply("No channel provided")

		const answer = options["answer"]
		if (!answer) return interaction.reply("No answer provided")

		if (type === "add") {
			const data = await prisma.flag.create({
				data: {
					channelId: channel,
					answer: answer,
				}
			})
			return interaction.reply(`Flag added: ${data.id} (${data.channelId}) => ${data.answer}`)
		} else if (type === "remove") {
			const res = await prisma.flag.deleteMany({
				where: {
					channelId: channel,
					answer: answer,
				}
			})
			return interaction.reply(`Removed ${res.count} flags`)
		}
	}
}
