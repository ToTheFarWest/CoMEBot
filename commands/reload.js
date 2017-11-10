exports.run = (client, message, args) => {
    if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.reply(`The command ${args[0]} has been reloaded`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name : "reload",
  description : "Reloads a command",
  usage: "reload <command>"
};
