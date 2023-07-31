import { Component, CrossBuild, ReceivedInteraction } from "crossbuild"
import { ApplicationCommandOptionType } from "discord.js"
import { prisma, unb } from ".."

export default class Cmd extends Component {
	constructor(client: CrossBuild) {
		super("hint", "command", client, {
			description: "Manage hints",
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
					name: "hint",
					description: "The hint to add",
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
		const item = options["item"]
		if (!item) return interaction.reply("No item provided")

		if (type === "add") {
			const hint = options["hint"]
			if (!hint) return interaction.reply("No hint provided")
			const itemData = await unb.getItem(interaction.server.id, item)
			if (!itemData) return interaction.reply("Invalid item ID")
			await prisma.hint.create({
				data: {
					itemId: item,
					hint,
				}
			})
			return interaction.reply(`Hint added: ${itemData.name} (${item}) => ${hint}`)
		} else if (type === "remove") {
			const res = await prisma.hint.deleteMany({
				where: {
					itemId: item,
				}
			})
			return interaction.reply(`Removed ${res.count} hints`)
		}
	}
}
