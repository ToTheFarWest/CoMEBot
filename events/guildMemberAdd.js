exports.run = (client, member) => {
    const defaultChannel = member.guild.channels.find(c=> c.permissionsFor(member.guild.me).has("SEND_MESSAGES"));
    //const defaultChannel = member.guild.channels.find("id", "377145115677949953"); 
    defaultChannel.send(`Welcome ${member.user} to ${member.guild.name}.`).catch(console.error);

    let wanderer = member.guild.roles.find("name", "Wanderer");
    member.addRole(wanderer).catch(console.error);
}
