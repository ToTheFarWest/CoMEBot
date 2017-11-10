exports.run = (client, message, args) => {
    message.channel.send("pong!").catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pong"],
  permLevel: 0
};

exports.help = {
  name : "ping",
  description : "Pings the server",
  usage: "ping"
};
