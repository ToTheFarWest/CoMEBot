exports.run = (client, message, args) => {
    message.channel.send("https://www.patreon.com/ChampionsME").catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["donate", "patron"],
  permLevel: 0
};

exports.help = {
  name : "patreon",
  description : "Posts link to the CoME Patreon page.",
  usage : "patron"
};
