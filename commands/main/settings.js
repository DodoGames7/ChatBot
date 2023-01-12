module.exports = [{
    name: "settings",
    code: `$title[Settings]
    $description[hey $username, you can manage me on how i should behave to internet people by checking the following settings:
    
    **embed**: switch to embed mode when replying
    **Reply Mention**: let's the bot ping you at every single reply
    
    Note: click on buttons to toggle options to re-enable or re-disable them]
    $color[d74894]
    $addButton[1;Reply Mention;1;replytoggle_$authorID;no]
    $addButton[1;Embed;1;setting_$authorID;no]
    $onlyPerms[manageserver;you need \`ManageServer\` Perm in order to manage me on how i should talk]
    `
    },
    {
        type: "interaction",
        $if: "old",
        prototype: "button",
        code: `
    $if[$getServerVar[embed]==false]
    $interactionReply[From Now On!, i will use embeds as you toggled the option;;;;all;yes]
    $setServerVar[embed;true;$guildID]
    $else
    $if[$getServerVar[embed]==true]
    $interactionReply[From Now On!, i will no longer use embeds as you toggled the option;;;;all;yes]
    $setServerVar[embed;false;$guildID]
    $endif
    $endif
    $onlyif[$get[authorID]==$interactionData[author.id];
    {newEmbed:{title:Error!}{description:You aren't the author of this interaction.}}
    {options:{ephemeral: true}}
{extraOptions:{interaction: true}}
    ]
    
    $onlyif[$get[customId]==setting;]
    
    $let[authorID;$splitText[2]]
    $let[customId;$splitText[1]] 
    $textSplit[$interactionData[customId];_] 
    `
    },{
        type: "interaction",
        prototype: "button",
        $if: "old",
        code: `$if[$getServerVar[replyping]==yes]
    $interactionReply[From Now On!, i will no longer mention you as you toggled the option;;;;all;yes]
    $setServerVar[replyping;no;$guildID]
    $else
    $if[$getServerVar[replyping]==no]
    $interactionReply[From Now On!, i will mention you as you toggled the option;;;;all;yes]
    $setServerVar[replyping;yes;$guildID]
    $endif
    $endif
    $onlyif[$get[authorID]==$interactionData[author.id];
    {newEmbed:{title:Error!}{description:You aren't the author of this interaction.}}
    {options:{ephemeral: true}}
{extraOptions:{interaction: true}}
    ]

    $onlyif[$get[customId]==replytoggle;]
    
    $let[authorID;$splitText[2]]
    $let[customId;$splitText[1]] 
    $textSplit[$interactionData[customId];_] `
    }]