exports.run = (client, message, args) => {
    message.channel.send("[Wiki](http://lotrminecraftmod.wikia.com/wiki/Champions_of_Middle-Earth)").catch(console.error);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name : "wiki",
  description : "Posts a link to the CoME wiki",
  usage : "wiki"
};
