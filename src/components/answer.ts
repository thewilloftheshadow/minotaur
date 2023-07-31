import { Component, CrossBuild, ReceivedInteraction } from "crossbuild"
import { ApplicationCommandOptionType } from "discord.js"
import { prisma } from ".."
//- /answer add <answer> <channel> [role_to_add] [role_to_remove] [dm_to_send] [coins_to_add]

export default class Cmd extends Component {
	constructor(client: CrossBuild) {
		super("answer", "command", client, {
			description: "Ping!",
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
					name: "answer",
					description: "The answer to add",
					required: true,
				},
				{
					type: ApplicationCommandOptionType.Channel,
					name: "channel",
					description: "The channel to add the answer to",
					required: true,
				},
				{
					type: ApplicationCommandOptionType.Role,
					name: "role_to_add",
					description: "The role to add",
				},
				{
					type: ApplicationCommandOptionType.Role,
					name: "role_to_remove",
					description: "The role to remove",
				},
				{
					type: ApplicationCommandOptionType.String,
					name: "dm_to_send",
					description: "The dm to send",
				},
				{
					type: ApplicationCommandOptionType.Integer,
					name: "coins_to_add",
					description: "The coins to add",
				},
			],
		})
	}

	override async run(interaction: ReceivedInteraction) {
		if (!interaction.options) return
		switch (interaction.options["type"]) {
			case "add":
				const data = await prisma.answer.create({
					data: {
						answer: interaction.options["answer"],
						channelId: interaction.options["channel"],
						roleToAdd: interaction.options["role_to_add"],
						roleToRemove: interaction.options["role_to_remove"],
						dmToSend: interaction.options["dm_to_send"],
						coinsToAdd: interaction.options["coins_to_add"],
					},
				})
				return interaction.reply(`Added with id ${data.id}`)
			case "remove":
				const answer = interaction.options["answer"]
				const channelId = interaction.options["channel"]
				const result = await prisma.answer.findFirst({
					where: {
						answer,
						channelId,
					},
				})
				if (!result) return interaction.reply("No answer found!")
				await prisma.answer.delete({
					where: {
						id: result.id,
					},
				})
				await interaction.reply(`Removed ${result.id}`)
				break
			default:
				await interaction.reply("Invalid type!")
		}
	}
}
