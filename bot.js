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

//Commands
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir(`./commands/`, (err,files) => {
  if(err) console.error(err);
  console.log(`Loading a total of %{files.length} commands.`);
  files.forEach(f=> {
    //require the file into memory
    let props = require(`./commands/${f}`);
    console.log(`Loading Command: ${props.help.name}. :ok_hand:`);
    //add the command to the Commands Collection
    client.commands.set(props.help.name, props);
    //loops through each Alias in that commands
    props.conf.aliases.forEach(alias => {
      //add the alias to the Aliases Collection
      client.aliases.set(alias, props.help.name);
    });
  });
});

//elevation
client.elevation = function(message) {
  let permlvl = 0;
  let mod_role = message.guild.roles.find("name", "Moderator");
  if(mod_role && message.member.roles.has(mod_role.id)) permlvl = 1;
  let admin_role = message.guild.roles.find("name", "Admin");
  if(admin_role && message.member.roles.has(admin_role.id)) permlvl = 2;
  let owner_role = message.guild.roles.find("name", "Owner");
  if(owner_role && message.member.roles.has(owner_role.id)) permlvl = 3;
  if(message.author.id === config.ownerID) permlvl = 4;
};

client.on("message", (message) => {
    //Ignores messages by clients or without the prefix
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
    else{
      //elevation
      let perms = client.elevation(message);
      let cmd;
      //check if the command exists in Commands
      if (client.commands.has(command)) {

        cmd = client.commands.get(command);
      }
      //Check if the command exists in Aliases
      else if (client.aliases.has(command)){
        cmd = client.commands.get(client.aliases.get(command));
      }

      if(cmd) {
        //Check user's perm level against the required level in the command.
        //console.log("Checking perms...");
        if(perms < cmd.conf.permLevel) {
          //console.log("No perms");
          return;
        }
        //Run the 'exports.run()' function defined in each command.
        cmd.run(client, message, args)
      }
  }


    //Running commands
/*    else{
        try {
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(client, message, args, config);
        }
        catch (err) {
            console.error(err);
        }
    }*/
});
client.login(config.token)
