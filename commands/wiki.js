exports.run = (client, message, args) => {
    message.channel.send("http://lotrminecraftmod.wikia.com/wiki/Champions_of_Middle-Earth").catch(console.error);
}
