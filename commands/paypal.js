exports.run = (client, message, args) => {
    message.channel.send("[PayPal](https://www.paypal.me/YardenAkin)").catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name : "paypal",
  description : "Posts link to Yarden's personal PayPal.",
  usage: "paypal"
};
