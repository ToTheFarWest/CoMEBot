const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");

//This loop reads the /events/ folder and attatches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        //calls all events and their args after the client var.
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});


/*client.on("ready", () => {
    console.log("I am ready!");
});
*/
client.on("message", (message) => {
    if (message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;

    //Defining args (sp00ki)
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //eval
    const clean = text => {
        if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
}
    if (message.content.startsWith(config.prefix + "eval")) {
        if(message.author.id !== config.ownerID) return;
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }


    //Running commands
    else{
        try {
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(client, message, args, config);
        }
        catch (err) {
            console.error(err);
        }
    }
});
client.login(config.token)
