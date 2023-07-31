import { PrismaClient } from "@prisma/client"
import { CrossBuild } from "crossbuild"

export const client = new CrossBuild({
	name: "Minotaur",
	discordOptions: {
		intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
	},
	discordToken: process.env.DISCORD_TOKEN,
	componentPaths: ["components"],
})

export const prisma = new PrismaClient()
