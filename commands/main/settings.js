module.exports = [{
    name: "settings",
    code: `$title[Settings]
    $description[hey $username, you can manage me on how i should behave to internet people by checking the following settings:
    
    **embed**: switch to embed mode when replying
    **Reply Mention**: let's the bot ping you at every single reply
    
    **current Settings**
    embed: \`$getServerVar[embed]\`
    Reply Mention: \`$getServerVar[replyping]\`
    
    Note: click on buttons to toggle options to re-enable or re-disable them]
    $color[d74894]
    $addButton[1;Refresh;danger;refresh_$authorID;no;🔄]
    $addButton[1;Reply Mention;primary;replytoggle_$authorID;no]
    $addButton[1;Embed;primary;setting_$authorID;no]
    $onlyPerms[manageserver;you need \`MANAGE_SERVER\` Perm in order to manage me on how i should talk]
    `
    },
    {
        type: "interaction",
        $if: "v4",
        prototype: "button",
        code: `
    $if[$getServerVar[embed]==false]
    $interactionReply[From Now On!, i will use embeds as you toggled the option;;;;everyone;yes]
    $setServerVar[embed;true;$guildID]
    $elseif[$getServerVar[embed]==true]
    $interactionReply[From Now On!, i will no longer use embeds as you toggled the option;;;;everyone;yes]
    $setServerVar[embed;false;$guildID]
    $endelseif
    $endif
    $onlyif[$get[authorID]==$interactionData[author.id];{
    "content" : "You aren't the author of this interaction.",
    "ephemeral" : true,
    "options" : { "interaction" : true }
    }]
    
    $onlyif[$get[customId]==setting;]
    
    $let[authorID;$splitText[2]]
    $let[customId;$splitText[1]] 
    $textSplit[$interactionData[customId];_] 
    `
    },{
        type: "interaction",
        prototype: "button",
        $if: "v4",
        code: `$if[$getServerVar[replyping]==yes]
    $interactionReply[From Now On!, i will no longer mention you as you toggled the option;;;;everyone;yes]
    $setServerVar[replyping;no;$guildID]
    $elseif[$getServerVar[replyping]==no]
    $interactionReply[From Now On!, i will mention you as you toggled the option;;;;everyone;yes]
    $setServerVar[replyping;yes;$guildID]
    $endelseif
    $endif
    $onlyif[$get[authorID]==$interactionData[author.id];{
    "content" : "You aren't the author of this interaction.",
    "ephemeral" : true,
    "options" : { "interaction" : true }
    }]
    
    $onlyif[$get[customId]==replytoggle;]
    
    $let[authorID;$splitText[2]]
    $let[customId;$splitText[1]] 
    $textSplit[$interactionData[customId];_] `
    },{
        type: "interaction",
        prototype: "button",
        code: `$interactionUpdate[;{newEmbed:{title:Settings}{description:hey $username, you can manage me on how i should behave to internet people by checking the following settings:
    
    **embed**: switch to embed mode when replying
    **Reply Mention**: let's the bot ping you at every single reply
    
    **current Settings**
    embed: \`$getServerVar[embed]\`
    Reply Mention: \`$getServerVar[replyping]\`
    
    Note: click on buttons to toggle options to re-enable or re-disable them}{color:d74894}};{actionRow:
        
        $onlyif[$get[authorID]==$interactionData[author.id];{
    "content" : "You aren't the author of this interaction.",
    "ephemeral" : true,
    "options" : { "interaction" : true }
    }]
    
    $onlyif[$get[customId]==refresh;]
    
    $let[authorID;$splitText[2]]
    $let[customId;$splitText[1]] 
    $textSplit[$interactionData[customId];_] 
    `
    }]
