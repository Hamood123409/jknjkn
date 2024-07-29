const { SlashCommandBuilder } = require(`@discordjs/builders`)
module.exports = {
  data: new SlashCommandBuilder()
    .setName("end")
    .setDescription (`to end a giveaway`)
.addStringOption((option) => 
  option.setName(`id-giv`).setDescription("id message giveaway").setRequired(true)),

    async execute(client, interaction) {

if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({
      content: "**🥺 You Don't Have Permissions**"
    });
        const query = interaction.options.getString('id-giv');

        // fetching the giveaway with message Id or prize
        const giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            // Search with giveaway Id
client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // If no giveaway was found with the corresponding input
        if (!giveaway) {
            return interaction.reply({
                content: 'Unable to find a giveaway for `' + query + '`.',
                ephemeral: true
            });
        }

        if (giveaway.ended) {
            return interaction.reply({
                content: 'This giveaway has ended',
                ephemeral: true
            });
        }

        // Edit the giveaway
        client.giveawaysManager.end(giveaway.messageId)
            // Success message
            .then(() => {
                // Success message
                interaction.reply(`>
      **Done end this giveaway**`);
            })
            .catch((e) => {
                console.log(e)
            });

    }
};