import { PrismaClient } from "@prisma/client"
import { CrossBuild } from "crossbuild"
import { Client as Unb } from "unb-api"

export const client = new CrossBuild({
	name: "Minotaur",
	discordOptions: {
		intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
	},
	discordToken: process.env.DISCORD_TOKEN,
	componentPaths: ["components"],
})

export const prisma = new PrismaClient()
export const unb = new Unb(process.env.UNB_TOKEN!)