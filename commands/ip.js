exports.run = (client, message, args) => {
    message.channel.send("me-champions.com").catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name : "ip",
  description : "Posts the CoME Server IP",
  usage : "ip"
};
