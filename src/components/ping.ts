import { Component, CrossBuild, ReceivedInteraction } from "crossbuild"

export default class Cmd extends Component {
	constructor(client: CrossBuild) {
		super("ping", "command", client, {
			description: "Ping!",
		})
	}

	override async run(interaction: ReceivedInteraction) {
		await interaction.reply(`Pong! ${this.client.discordClient?.ws.ping || "69420"}ms`)
	}
}
