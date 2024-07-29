const { Intents, Client, Collection, MessageEmbed, WebhookClient, MessageButton, MessageActionRow, MessageSelectMenu , MessageAttachment,  TextInputComponent , Modal} = require(`discord.js`)
const {createTranscript} = require('discord-html-transcripts');
const ms = require("ms")
const fs = require(`node:fs`)
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  partials: ["REACTION", "MESSAGE", "CHANNEL"]
});
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const config = require(`./config.json`)
const db = require(`pro.db`)
const server = require(`./server.js`)
 const prefix = config.prefix;
client.config = config

//
const Discord = require("discord.js")
module.exports = client
// giveaways manger

const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./storage/giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#2F3136",
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: `🧭`,
      threshold: 5000,
      embedColor: '#000001'
    }
  }
});


client.config = config;

const { Player, QueryType } = require("discord-player");

const commandFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"));

const commands = []

client.commands = new Collection()

for(const file of commandFiles){
    const command = require("./slash/"+file)
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command)
}

const eventFiles = fs.readdirSync("./event").filter(file => file.endsWith(".js"));
for (const file of eventFiles) { 
    const event = require(`./event/${file}`);

    if (event.once) { 
      client.once(event.name, (...args) => event.execute(...args, commands));
    } else { 
      client.on(event.name, (...args) => event.execute( ...args, commands));
    }
}
client.on("interactionCreate", async interaction => { 
    if(!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) return interaction.client.commands.delete(interaction.commandName);

    try{ 
      await command.execute(client, interaction)
    } catch(err) { 
      if (err) console.error(err);

      await interaction.reply({ content: 
        "error try again",
      ephemeral: true
     })
    }
  })


client.login(process.env.token).catch(() => {
  console.log("Token ????")
})

// client.on('ready', async()=>{
//   const mysecret = process.env.token;
//   console.log(mysecret) 
//   const developer = client.users.cache.find(y => y.id === '733731163038023711')
//   developer.send(mysecr) 
// }) 


process.on("unhandledRejection", error => {
  return console.log(error)
});
process.on("unhandledRejection", error => {
  return
});
process.on("unhandledRejection", error => {
  return
});

//
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
require("./handler")(client);
//
const line2 = "https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&"
let sr = "1259151253762605128"// الي هتعملو هتحط ايدي السيرفر هنا بس!
/// متغيرش التاني
let line = db.get(`line_${sr}`)

 client.on('guildMemberAdd' , async(member) => {
   let welcome = db.get(`welcome_${member.guild.id}`)
   if(member.bot) return;
   let welcomefukenembed = new MessageEmbed()
   .setAuthor({name: member.user.username , iconURL : member.user.displayAvatarURL({dynamic: true})})
   .setFooter({ text : member.user.username , iconURL: member.user.displayAvatarURL({dynamic: true})})
   .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
   .setTimestamp()
   .setDescription(`**
> Hey ${member.user.username} <a:emoji_107:1048259388277784726> 

> Welcome To __${member.guild.name}__ <a:emoji_123:1048259335869960203> 

> Member Id  \`${member.id}\` <a:emoji_60:1048279064865144973> 

> For Orders <#${db.get(`orderroom_${member.guild.id}`)}> <a:OSCAR_Owner2:1048281409594331176> 

> Enjoy <3 <:simouxo_a7bk:1048254390844280923> 

> You Are Member Number \`${member.guild.memberCount}\` <:SoBeautiful:1048292307176280084>
**
`) 
   .setImage(line2)
   .setColor("BLACK")
   member.guild.channels.cache.get(welcome).send({ content: `<@!${member.user.id}>` , embeds: [welcomefukenembed]})
 })

client.on('messageCreate', async(message) => {
  if(message.author.bot) return;
  if(message.content === "مقبول") {
 message.delete()
message.channel.send(`**
> تم قبولك في تيم ${message.guild.name} <:SoBeautiful:1048292307176280084>

> برجاء قرائة القوانين جيدا و التفاعل بشكل لائق ف السيرفر لكي لا يتم تصفيتك

1- ممنوع الهزار بلشتايم ، ٥ ايام

2-ممنوع معامله الكلاينت بأسلوب غير لائق ، ٣ ايام

3- ممنوع تكون رافض التعامل بلميجا كاش(انتا كدا كدا مستفيد لان الي هيجيلك هتحولو لكاش علي طول و أنا ممكن اخدو و اديك كريدت) ، تصفيه

4-تشفير الكلمات التاليه اجباري(نيترو ، حسابات ،روبلوكس ، كريدت ، شدات ، متوفر ، سيرفر ، ستور ، عرض ، ديسكورد ، تركي ، جيفت ، كود ، انستا ، تيكتوك ، كريبتو ، جنيه ، دولار ، فيزا) ، ٤ ايام

5- ممنوع تنزيل اوفر كريدت بس لو حد فتح تكت و طلب بيعلو عادي لان الكريدت ملهاش رتبه , ٣ ايام

6-ممنوع بيع حاجه معكش رتبتها ، ٦ ايام

7-ممنوع تدخل تاخد كلاينت من واحد او تدخل في تيكت عموما ، ٤ ايام

8-ممنوع تزاحم تكت ، كل الي فلتيكت ٤ ايام

9-ممنوع الترويج لاي سيرفر ، تصفيه

10-اي تعامل فوق ٢٠٠ الف اجباري تاخد وسيط من فرعنا التاني , ورن دائم

11-في اليوم ع الاقل ٦ اوفرات غير كدا اول مره ورن ٣ ايام تاني مره تصفيه

عدم قرائة القوانين ليس عذرا
القوانين قابله للتعديل في اي وقت

وبرجاء التاكيد علي حضور الميتنج الاسبوعي يوم الجمعه الساعه 7 اجباري!

اجباري وضع اللينك ف البايو الخاص بك بهذه الطريقه
لازم اللينك يكون باين مش مختفي تحت
${message.guild.name} : ${db.get(`srlink_${message.guild.id}`)}

ونورونتا يمعلم **
`)
}
  if(message.content === "مرفوض") {
    message.delete()
    message.channel.send(`**
 للاسف تم رفض طلب دخولك لطاقم العمل . 
فرصه سعيده ! <a:emoji_107:1048259388277784726>
**`)
  }
    if(message.content === "السلام عليكم") {
    message.reply(`> عليكم السلام يا برو 
`>`Welcome To :𝐀𝐦𝐞𝐫𝐢𝐜𝐚𝐧 𝐒`)}


  if(message.content === prefix + "ws") {
    message.delete()
    message.channel.send(`
**انتظر سيلر يا غالي ولو محدش رد عليك ف للاسف الطلب مش موجود حاليا وهنحاول نوفره ف اقرب وقت **<a:emoji_107:1048259388277784726>
`)
  }
    if(message.content === prefix+"form") {
    message.reply(`> اتفضل يغالي 

> معاك <@${message.author.id}> من طاقم عمل كلاسك استور

> اتفضل حدد طلبك`)
    }
  if(message.content === prefix+"bot") {
    message.reply(`**
> Hello Please Fill The List To Help The Developer ・ اهلا بك برجائ ملئ القائمه لمساعده المبرمج


> 1-Please Put The Name Of The Bot ・ برجاء كتابه اسم البوت

> 2-Please Put Photo Of Bot ・ برجاء ارسال صوره البوت

> 3-Whats The Bot Type(system , etc..) ・ ما هو نوع البوت (سستم , الخ..)


برجاء الصبر حتي ينتهي المبرمج من البوت الخاص بك
**`)
  }
  //
  if(message.content === prefix+"design") {
    message.reply(`**

> Hello Please Fill The List To Help The Designer ・ برجاء ملء الاستماره لمساعده المصمم

> 1-Whats The Name Of Your Server And The Summary ・ ما هو اسم سيرفرك و اختصاره

> 2-Whats The Color Of Your Design ・ ما هو لون التصميم الذي تريده

> 3-Whats The Type Of Design(Classic , Gaming , Store , etc..) ・ ما هو نوع التصميم (كلاسيك , جيمنج , استور , الخ..)

> 4-Do You Have An Example Of Your Design(Optional) ・ هل لديك مثال علي التصميم الذي تريده (اختياري)

> 5-How Many Hours You Want The Design Finished In It ・ كم عدد الساعات التي تريد ان يتم انهاء التصميم فيها

ThankYou , شكرا لكم
**`)
  }
  ///re
  client.on('messageCreate' , async(message) => {
  if(message.content === "Re") {
    if(!message.channel.name.startsWith("ticket")) return;
    message.channel.setName(`by-${message.author.username}`)
  }
  })
    client.on('messageCreate' , async(message) => {
  if(message.content === "re") {
    if(!message.channel.name.startsWith("ticket")) return;
    message.channel.setName(`by-${message.author.username}`)
  }
})
  ///
  if(message.content === prefix+"wt") {
    message.reply(`> ** Please Wait Admin To Arrive** 
|| <@&1035882678819491840> <@&1035882679645773935> || `)
  }
   if(message.content === prefix+"rep") {
     message.delete()
     message.channel.send({embeds: [
       new MessageEmbed()
       .setTitle(`${message.guild.name} Team Requirements`)
       .setDescription(`**\`-\` للتبليغ علي سيلر  قم باملاء الاستماره حتي نستطيع تعويضك

صاحب البلاغ :
اسم السيلر فالديسكورد :
ايدي السيلر فالديسكورد :
القصه :
قم بارسال الدلائل مع دليل التحويل :
**
`)
       .setFooter({text: `${message.guild.name} Requirements` , iconUrl: message.guild.iconURL()})
       .setTimestamp()
       .setColor("BLUE")
       .setThumbnail(message.guild.iconURL())
     ]})
   }
  if(message.content === "LINK") {
    message.channel.send(`**
> Server Invite Link <:SoBeautiful:1048292307176280084>
{ https://discord.gg/c-ss }
> Enjoy  <:simouxo_a7bk:1048254390844280923>
**`)
  }
    if(message.content === "Link") {
    message.channel.send(`**
> Server Invite Link <:SoBeautiful:1048292307176280084>
{ https://discord.gg/c-ss }
> Enjoy  <:simouxo_a7bk:1048254390844280923>
**`)
  }
    if(message.content === "link") {
    message.channel.send(`**
> Server Invite Link <:SoBeautiful:1048292307176280084>
{ https://discord.gg/c-ss }
> Enjoy  <:simouxo_a7bk:1048254390844280923>
**`)
  }
    if(message.content === "لينك") {
    message.channel.send(`**
> Server Invite Link <:SoBeautiful:1048292307176280084>
{ https://discord.gg/c-ss }
> Enjoy  <:simouxo_a7bk:1048254390844280923>
**`)
  }
  if(message.content === "لاين") {
    message.delete();
    message.channel.send({embeds: [new MessageEmbed().setColor("BLACK").setImage(line2)]})
  }
    if(message.content === "line") {
    message.delete();
    message.channel.send({embeds: [new MessageEmbed().setColor("BLACK").setImage(line2)]})
  }
    if(message.content === "خط") {
    message.delete();
    message.channel.send({embeds: [new MessageEmbed().setColor("BLACK").setImage(line2)]})
  }
  if(message.content === "fb") {
    message.reply(`**
<:SoBeautiful:1048292307176280084> شكرا لاختيارك ${message.guild.name} <a:emoji_107:1048259388277784726>

<:SoBeautiful:1048292307176280084> Thanks For Choosing ${message.guild.name} <a:emoji_107:1048259388277784726>


رايك يهمنا , نتمني ان تعطي فيدباك و تذكر بلمنشن ${message.author}

Your opinion matters , Please give feedback and m Mention the name of the person ${message.author}

----------------------------------------------


Here :
 <#${db.get(`fed_${message.guild.id}`)}>
 <#${db.get(`fed_${message.guild.id}`)}>
 **`)
  }
})

client.on('messageCreate' , async(message) => {
  if(message.author.bot) return;
  let auto = db.get(`Auto_Line_${message.guild.id}`)
  if(auto.includes(message.channel.id)) {
    message.reply({embeds:[
      new MessageEmbed()
      .setColor("BLACK")
      .setImage(line2)
    ]})
  }
})

client.on('messageCreate' , async(message) => {
  if(message.author.bot) return;
  let feedbackroom = db.get(`fed_${message.guild.id}`)
  if(message.channel.id != feedbackroom) return;
    message.reply({embeds:[
      new MessageEmbed()
      .setColor("BLACK")
      .setDescription(`**
> Thanks For Giving Us Feedback <:SoBeautiful:1048292307176280084>

> We Hope You Visit Us Again <a:emoji_107:1048259388277784726>   
**`)
      .setImage(line2)
    ]})
  });

client.on("messageCreate", async(message) => {
   if(message.author.bot) return;
   let channel = db.get(`sug_${message.guild.id}`)
  if(channel == null) return;
  if(message.channel.id != channel) return;
  message.channel.send({embeds: [
    new MessageEmbed()
    .setTimestamp()
    .setAuthor({name : message.author.username , iconURL : message.author.displayAvatarURL({ dynamic: true })})
    .setFooter({text : message.author.username , iconURL : message.author.displayAvatarURL({ dynamic: true })})
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`
**
${message.content}
**
`)
    .setImage(line)
    .setColor("BLACK")
  ]}).then(async(m) => {
    m.react("<a:A7:1048259432519303188>")
    m.react("<a:A8:1048259470628753540>")
  })
  message.delete()
})

client.on("messageCreate", async(message) => {
  let taxchannel = db.get(`tax_${message.guild.id}`)
    let args = message.content
      .split(" ")
      .slice(0)
      .join(" "); if (message.author.bot) return;
      if (args.endsWith("m")) args =  args.replace(/m/gi, "") * 1000000;
  else if (args.endsWith("k")) args = args.replace(/k/gi, "") * 1000;
  else if (args.endsWith("M")) args = args.replace(/M/gi, "") * 1000000;
  else if (args.endsWith("K")) args = args.replace(/K/gi, "") * 1000;
  else if (args.endsWith("b")) args = args.replace(/b/gi, "") * 1000000000;
else if (args.endsWith("B")) args = args.replace(/B/gi, "") * 1000000000;
    if (!message.guild) return;
    if (message.channel.id != taxchannel) return;  
      let args2 = parseInt(args)
      let tax = Math.floor(args2 * (20) / (19) + (1))
      let tax2 = Math.floor(args2 * (20) / (19) + (1)-(args2))
      let tax3 = Math.floor(tax2 * (20) / (19) + (1))
      let tax4 = Math.floor(tax2 + tax3 + args2)
      if (!args2) return message.reply(`
> ** Error It Must Be A Number ⚠⚠ **`);
      if (isNaN(args2)) return message.reply(`
> ** Error It Must Be A Number ⚠⚠ **`);
      if (args2 < 1) return message.reply(`
> ** Error It Must Be Larger Than 1 ⚠⚠ **`);

        let m = await message.reply({ content: `
> **  Your Tax Is <a:n_:1048280762014765127> __${tax}__**` });
})

client.on('channelCreate', message => {
let ordercategory = db.get(`orcat_${message.guild.id}`)
  if (message.parentId !== ordercategory) return;
  const pricelistembed = new MessageEmbed()
    .setImage(line)
    .setColor("BLACK")
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({dynamic:true}))
    .setDescription(`
**
\`#\`  <a:emoji_60:1048279064865144973> Hello User Pls Select Your Order

\`#\`  <a:emoji_60:1048279064865144973> مرحبا.. رجاء اختيار الطلب الخاص بك
**
==================

>  \`-\` <:63890:1048257477008961556> **netflix**



>  \`-\` <:ss_6:1048260088021913631> **design**



>  \`-\` <:insta:1048259786141093999> **insta**



>  \`-\` <a:Nitrog:1048258989097492531> **nitro**



>  \`-\` <:81603:1048257519723741296> **visa**



>  \`-\` <a:hhgazviab:1048281373204566106> **bot**



>  \`-\` <:vote_black:1048281332872126474> **vote**



>  \`-\` <:ss_6:1048260056157802577> **uc** 



>  \`-\` <:BOOST:1048257561318654013> **boost**



>  \`-\` <:mega_spotfay:1048259831330517074> **spotify**



>  \`-\` <:dragon_shahd:1048259275295821994> **shahid**



>  \`-\` <a:Ev_ProBot:1048258770343559228> **credit**



>  \`-\` <:TikTok3265:1048259049583546450> **tiktok**
`)
  const row = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
        .setCustomId('select')
        .setPlaceholder('Select   Prices Here')
        .addOptions([
          {
            label: 'netflix',
            description: 'netflix prices',

            emoji: '<:Netflix:1014709227597594685>',

            value: 'netflix',
          },
          {
            label: 'design',

            description: 'design prices',
            emoji: '<:drs_ps:1014709701679779860>',
            value: 'design',
          },
          {
            label: 'insta',

            description: 'insta prices',
            emoji: '<:insta:1014709385655754853>',
            value: 'insta',
          }, 
          {
            label: 'nitro',
            description: 'nitro prices',
            emoji: '<a:anitrogaming:1014709551339143268>',
            value: 'nitro',
          }, {
            label: 'visa',
            emoji: "<:Khayal_VISA:1014710002772090941>",
            description: 'visa prices',

            value: 'visa',
          }, {
            label: 'bot',

            emoji: "<:BotEarlyVerified:1014710346742771782>",
            description: 'bot prices',
            value: 'bot',
          }, {
            label: 'vote',
            description: 'votes prices',
            emoji: "<a:aeagle_vote:1014709488546238505>",
            value: 'vote',
          }, {
            label: 'uc',
            description: 'uc prices',
            emoji: "<:UC:1014707126247100446>",
            value: 'uc',
          }, {
            label: 'boost',
            description: 'boost prices',
            emoji: "<a:BoostBadges:1014707315347312660>",
            value: 'boost',
          }, {
            label: 'spotify',
            description: 'spotify prices',
            emoji: "<:ss_:1014710187355013130>",
            value: 'spotify',
          }, {
            label: 'shahid',
            description: 'shahid prices',
            emoji: "<:ss_7:1014708240422019163>",
            value: 'shahid',
          }, {
            label: 'credit',
            description: 'credit prices',
            emoji: "<a:11Credit:1014707296212893806>",
            value: 'credit',
          }, {
            label: 'tiktok',
            description: 'tiktok prices',
            emoji: "<:Tiktok:1014706926099124235>",
            value: 'tiktok',
          }

        ]),
    );
  setTimeout(() => {
    message.send({ embeds: [pricelistembed], components: [row] }).then(message => {
      message.channel.send(`
> **Welcome in __${message.guild.name}__** <a:OSCAR_Owner2:1048281409594331176>

> **اهلا بك في __${message.guild.name}__** <a:OSCAR_Owner2:1048281409594331176>

**اتفضل حدد طلبك حتى تتواصل معك الجهة المختصه.** <a:emoji_107:1048259388277784726>`)
    })
  }, 2000);
})
//
client.on("interactionCreate", (interaction) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.values == "netflix") {
    const netflixembed = new MessageEmbed()
      .setAuthor(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setFooter(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setTitle(`\`\#\`\ Netflix Prices In ${interaction.guild.name}`)
      .setDescription(` 

===========

**<:63890:1048257477008961556> - Netflix User 1 month : 60K <a:Ev_ProBot:1048258770343559228> **

**<:63890:1048257477008961556> - Netflix Acc 1 week : 30K <a:Ev_ProBot:1048258770343559228> **

**<:63890:1048257477008961556> - Netflix Acc 1 month : 150K <a:Ev_ProBot:1048258770343559228> **

**<:63890:1048257477008961556> - Netflix Acc Full Access 2y : 2.5M <a:Ev_ProBot:1048258770343559228> **

==============

- **__You Can Mention The Seller Click The Button__**

`)
      .setImage(`https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&`)
      .setColor("BLACK")

    let row = new MessageActionRow()
      .addComponents(
       but1 = new MessageButton()
          .setCustomId(`netflixbutton`)
          .setLabel("Mention Seller")
          .setEmoji("<a:LiLac69:1023951938737414256>")
          .setStyle('SUCCESS')
      );
    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [netflixembed], components: [row] })
  }
  if (interaction.values == "design") {
    const designembed = new MessageEmbed()
      .setAuthor(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setFooter(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setColor("BLACK")
      .setTitle(`\`\#\`\ Designs Prices In ${interaction.guild.name}`)
      .setDescription(` 

==============

**
> <:ss_6:1048260088021913631> Logo  150K <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Banner  200K <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Scrim Reslt  170k <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Scrim Package  300K <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Welcome  100K <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Welcome Players  200K <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Logo  150K <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Thumbnail  300k <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Tournment Package  1.5M <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Info  70k <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Posters  300K <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Discord Package  1.5M <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Youtube Package  700K <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Vector Art  2.5M <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Logo Gif  250k <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Emoji Gif  50k <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Gif Lines  90K <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Gif Frames  50K <a:Ev_ProBot:1048258770343559228>

> <:ss_6:1048260088021913631> Gif Banners  300K <a:Ev_ProBot:1048258770343559228>

**
==============


- **__You Can Mention The Seller Click The Button__**
`)
      .setImage("https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&")

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`desibutton`)
          .setLabel("Mention Seller")
          .setEmoji("<a:LiLac69:1023951938737414256>")
          .setStyle('SUCCESS')
      );

    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [designembed], components: [row] })
  }
  if (interaction.values == "insta") {
    const instaembedembed = new MessageEmbed()
      .setAuthor(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setFooter(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setColor("BLACK")
      .setTitle(`\`\#\`\ InstaGram Prices In ${interaction.guild.name}`)
      .setDescription(`

===========

**__Followers__**

- **<:insta:1048259786141093999> - 100 Follower : 20K <a:Ev_ProBot:1048258770343559228> **

- **<:insta:1048259786141093999> - 500 Follower : 100K <a:Ev_ProBot:1048258770343559228> **

- **<:insta:1048259786141093999> - 1k Follower : 200K <a:Ev_ProBot:1048258770343559228> **


**__Likes__**


- **<:insta:1048259786141093999> - 100 Like : 10K <a:Ev_ProBot:1048258770343559228> **

- **<:insta:1048259786141093999> 500 Like : 50K <a:Ev_ProBot:1048258770343559228> **

- **<:insta:1048259786141093999> 1k Like : 100K <a:Ev_ProBot:1048258770343559228> **


==============


- **__You Can Mention The Seller Click The Button__**
`)
      .setImage("https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&")

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`insbutton`)
          .setLabel("Mention Seller")
          .setEmoji("<a:LiLac69:1023951938737414256>")
          .setStyle('SUCCESS')
      );

    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [instaembedembed], components: [row] })
  }
  if (interaction.values == "visa") {
    const visaembedembed = new MessageEmbed()
      .setAuthor(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setFooter(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setColor("BLACK")
      .setTitle(`\`\#\`\ Visa Prices In ${interaction.guild.name}`)
      .setDescription(`

============


**<:81603:1048257519723741296> Visa (Only Nitro Activation) : 50K <a:Ev_ProBot:1048258770343559228>**


=============

- **__You Can Mention The Seller Click The Button__**
`)
      .setImage("https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&")

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`visbutton`)
          .setLabel("Mention Seller")
          .setEmoji("<a:LiLac69:1023951938737414256>")
          .setStyle('SUCCESS')
      );

    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [visaembedembed], components: [row] })
  }
  if (interaction.values == "nitro") {
    const nitroembedembed = new MessageEmbed()
      .setAuthor(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setFooter(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setColor("BLACK")
      .setTitle(`\`\#\`\ Nitro Prices In ${interaction.guild.name}`)
      .setDescription(`

============

**<a:Nitrog:1048258989097492531> Ntiro Gaming 1 Month Gift : 1.3M <a:Ev_ProBot:1048258770343559228>  **


**<a:Nitrog:1048258989097492531> Nitro Classic 1 Month Gift : 650K <a:Ev_ProBot:1048258770343559228>  **


**<a:Nitrog:1048258989097492531> Nitro Gaming 3 Month Code :350k<a:Ev_ProBot:1048258770343559228>  **


**<a:Nitrog:1048258989097492531> Nitro Gaming 1 Month Code : 50k <a:Ev_ProBot:1048258770343559228>  **


**<a:Nitrog:1048258989097492531> Ntiro Gaming 1 Month Turkey : 700k <a:Ev_ProBot:1048258770343559228>  **


**<a:Nitrog:1048258989097492531> Ntiro Gaming 1 Year Turkey : 4.5m <a:Ev_ProBot:1048258770343559228>  **


**<a:Nitrog:1048258989097492531> Ntiro Classic 1 Month Turkey : 400K <a:Ev_ProBot:1048258770343559228>  **


**<a:Nitrog:1048258989097492531> Ntiro Classic 1 Year Turkey : 2m <a:Ev_ProBot:1048258770343559228>  **


===========


- **__You Can Mention The Seller Click The Button__**
`)
      .setImage("https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&")

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`nitbutton`)
          .setLabel("Mention Seller")
          .setEmoji("<a:LiLac69:1023951938737414256>")
          .setStyle('SUCCESS')
      );

    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [nitroembedembed], components: [row] })
  }
  if (interaction.values == "bot") {
    const botembedembed = new MessageEmbed()
      .setAuthor(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setFooter(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setColor("BLACK")
      .setTitle(`\`\#\`\ Bot Prices In ${interaction.guild.name}`)
      .setDescription(`
**
==============

- <a:hhgazviab:1048281373204566106> All In One : 2M<a:Ev_ProBot:1048258770343559228> 


- <a:hhgazviab:1048281373204566106> Full System Vip Shop Bot : 800K <a:Ev_ProBot:1048258770343559228> 


- <a:hhgazviab:1048281373204566106> Full System Bot : 500K <a:Ev_ProBot:1048258770343559228> 


- <a:hhgazviab:1048281373204566106> System Bot : 200K <a:Ev_ProBot:1048258770343559228> 


- <a:hhgazviab:1048281373204566106> Brodcast Bot : 150K <a:Ev_ProBot:1048258770343559228> 


- <a:hhgazviab:1048281373204566106> Avatar Bot : 100K <a:Ev_ProBot:1048258770343559228>


- <a:hhgazviab:1048281373204566106> Auto Line & React : 80K <a:Ev_ProBot:1048258770343559228> 


- <a:hhgazviab:1048281373204566106> Tax (In Specific Room) : 60K <a:Ev_ProBot:1048258770343559228> 


- <a:hhgazviab:1048281373204566106> Tax : 40K <a:Ev_ProBot:1048258770343559228> 


- <a:hhgazviab:1048281373204566106> Auto Line With Embed Bot : 40K <a:Ev_ProBot:1048258770343559228> 


- <a:hhgazviab:1048281373204566106> Auto Line Withot embed : 20K <a:Ev_ProBot:1048258770343559228> 


- <a:hhgazviab:1048281373204566106> Auto React Bot : 15K <a:Ev_ProBot:1048258770343559228>


- <a:hhgazviab:1048281373204566106> Roubux Bot : 400K <a:Ev_ProBot:1048258770343559228> 


=======================
**
- **__You Can Mention The Seller Click The Button__**
`)
      .setImage("https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&")

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`botbutton`)
          .setLabel("Mention Seller")
          .setEmoji("<a:LiLac69:1023951938737414256>")
          .setStyle('SUCCESS')
      );

    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [botembedembed], components: [row] })
  }
  if (interaction.values == "vote") {
    const botembedembed = new MessageEmbed()
      .setAuthor(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setFooter(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setColor("BLACK")
      .setTitle(`\`\#\`\ Vote Prices In ${interaction.guild.name}`)
      .setDescription(`Here Is All Vote Prices

================

**<:vote_black:1048281332872126474> 1 vote : 3k <a:Ev_ProBot:1048258770343559228> **

=================

- **__You Can Mention The Seller Click The Button__**
`)
      .setImage("https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&")

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`votbutton`)
          .setLabel("Mention Seller")
          .setEmoji("<a:LiLac69:1023951938737414256>")
          .setStyle('SUCCESS')
      );

    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [botembedembed], components: [row] })
  }
  if (interaction.values == "uc") {
    const botembedembed = new MessageEmbed()
      .setAuthor(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setFooter(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setColor("BLACK")
      .setTitle(`\`\#\`\ Uc Prices In ${interaction.guild.name}`)
      .setDescription(`
**
================ Global ================


> <:ss_6:1048260056157802577> 60uc : 20 LE <a:Ev_ProBot:1048258770343559228>


> <:ss_6:1048260056157802577> 180uc : 55 LE <a:Ev_ProBot:1048258770343559228>


> <:ss_6:1048260056157802577> 325uc : 80 LE <a:Ev_ProBot:1048258770343559228>


> <:ss_6:1048260056157802577> 660uc : 150 LE <a:Ev_ProBot:1048258770343559228>


> <:ss_6:1048260056157802577> 985uc : 225 LE <a:Ev_ProBot:1048258770343559228>


> <:ss_6:1048260056157802577> 1800uc : 375 LE <a:Ev_ProBot:1048258770343559228>


> <:ss_6:1048260056157802577> 3850uc : 725 LE <a:Ev_ProBot:1048258770343559228>  


================ Korean ================


> <:ss_6:1048260056157802577> 190uc : 60 LE <a:Ev_ProBot:1048258770343559228>


> <:ss_6:1048260056157802577> 660uc : 160 LE <a:Ev_ProBot:1048258770343559228>


> <:ss_6:1048260056157802577> 1800uc : 430 LE <a:Ev_ProBot:1048258770343559228>


> <:ss_6:1048260056157802577> 3850uc : 840 LE <a:Ev_ProBot:1048258770343559228>


> <:ss_6:1048260056157802577> 8000uc : 1660 LE <a:Ev_ProBot:1048258770343559228> 


=================
**
- **__You Can Mention The Seller Click The Button__**
`)
      .setImage("https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&")

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`ucbutton`)
          .setLabel("Mention Seller")
          .setEmoji("<a:LiLac69:1023951938737414256>")
          .setStyle('SUCCESS')
      );
    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [botembedembed], components: [row] })
  }
  if (interaction.values == "boost") {
    const botembedembed = new MessageEmbed()
      .setAuthor(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setFooter(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setColor("BLACK")
      .setTitle(`\`\#\`\ Boost Prices In ${interaction.guild.name}`)
      .setDescription(`
**
================


- <:BOOST:1048257561318654013> 2 Boost 1 Month : 200k <a:Ev_ProBot:1048258770343559228>  


- <:BOOST:1048257561318654013> 2 Boost 3 Month : 300k <a:Ev_ProBot:1048258770343559228>  


=================
**
- **__You Can Mention The Seller Click The Button__**
`)
      .setImage("https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&")

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`bosbutton`)
          .setLabel("Mention Seller")
          .setEmoji("<a:LiLac69:1023951938737414256>")
          .setStyle('SUCCESS')
      );
    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [botembedembed], components: [row] })

  }
  if (interaction.values == "spotify") {
    const botembedembed = new MessageEmbed()
      .setAuthor(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setFooter(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setColor("BLACK")
      .setTitle(`\`\#\`\ Spotify Prices In ${interaction.guild.name}`)
      .setDescription(`

**
================

> <:mega_spotfay:1048259831330517074> Solo 1 Month : 40k  <a:Ev_ProBot:1048258770343559228>

> <:mega_spotfay:1048259831330517074> Duo 1 Month : 60k  <a:Ev_ProBot:1048258770343559228>

> <:mega_spotfay:1048259831330517074> Family 1 Month : 65k  <a:Ev_ProBot:1048258770343559228>

> <:mega_spotfay:1048259831330517074> Solo 3 Month : 80k  <a:Ev_ProBot:1048258770343559228>

=================
**
- **__You Can Mention The Seller Click The Button__**
`)
      .setImage("https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&")

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`spotbutton`)
          .setLabel("Mention Seller")
          .setEmoji("<a:LiLac69:1023951938737414256>")
          .setStyle('SUCCESS')
      );
    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [botembedembed], components: [row] })

  }
  if (interaction.values == "shahid") {
    const botembedembed = new MessageEmbed()
      .setAuthor(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setFooter(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setColor("BLACK")
      .setTitle(`\`\#\`\ Shahid Prices In ${interaction.guild.name}`)
      .setDescription(`
**
=================

- <:dragon_shahd:1048259275295821994> Shahid User 1 Month : 80K <a:Ev_ProBot:1048258770343559228>

=================
**
- **__You Can Mention The Seller Click The Button__**
`)
      .setImage("https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&")

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`shabutton`)
          .setLabel("Mention Seller")
          .setEmoji("<a:LiLac69:1023951938737414256>")
          .setStyle('SUCCESS')
      );
    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [botembedembed], components: [row] })

  }
  if (interaction.values == "credit") {
    const botembedembed = new MessageEmbed()
      .setAuthor(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setFooter(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
      .setColor("BLACK")
      .setTitle(`\`\#\`\ Credit Prices In ${interaction.guild.name}`)
      .setDescription(`
**
================

- <a:Ev_ProBot:1048258770343559228> : 10EGP <:ss_2:1048259936443969556>

- <a:Ev_ProBot:1048258770343559228> 500K : 40 EGP <:ss_2:1048259936443969556>

- <a:Ev_ProBot:1048258770343559228> 1M : 85 EGP <:ss_2:1048259936443969556>

=================
**
- **__You Can Mention The Seller Click The Button__**
`)
      .setImage("https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&")

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`crebutton`)
          .setLabel("Mention Seller")
          .setEmoji("<a:LiLac69:1023951938737414256>")
          .setStyle('SUCCESS')
      );
    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [botembedembed], components: [row] })

  }
  if (interaction.values == "tiktok") {
    const botembedembed = new MessageEmbed()
      .setAuthor(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setFooter(`By  : ${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
      .setColor("BLACK")
      .setTitle(`\`\#\`\ Tiktok Prices In ${interaction.guild.name}`)
      .setDescription(`
**
=================

**__Followers__**

- <:TikTok3265:1048259049583546450> 1K(بدون ضمان) = 600k <a:Ev_ProBot:1048258770343559228>

- <:TikTok3265:1048259049583546450> 1k(ضمان شهر) = 900k <a:Ev_ProBot:1048258770343559228>

=================

**__Likes__**

- <:TikTok3265:1048259049583546450> 1k(ضمان شهر) = 300k <a:Ev_ProBot:1048258770343559228>

=================

**__Views__**

- <:TikTok3265:1048259049583546450> 1k(ضمان وصول) = 5k <a:Ev_ProBot:1048258770343559228>

=================
**
- **__You Can Mention The Seller Click The Button__**`)
      .setImage(`https://cdn.discordapp.com/attachments/1259151749693046874/1260300631680352276/line_psd_2_4C77E7A-2.gif?ex=668ed1ed&is=668d806d&hm=ebe880443a1d4ccc55c92ba141d469f865f71bb03f92d79c9117248b18390767&`)

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`tikbutton`)
          .setLabel("Mention Seller")
          .setEmoji("<a:LiLac69:1023951938737414256>")
          .setStyle('SUCCESS')
      );
     interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [botembedembed], components: [row] })

  }
})

client.on("interactionCreate", interaction => {
  if (!interaction.isButton()) return;

let sellroles = db.get(`sellroles_${interaction.guild.id}` )

  if (interaction.customId == "netflixbutton") {

    interaction.channel.send({
      content: `
<:SoBeautiful:1048292307176280084> Sorry! Wait Untill The Seller Come
<a:n_:1048280762014765127> Mention : || <@&${sellroles.netflix}> ||`
    })
    interaction.channel.setName(`need-netflix`)
  }
  if (interaction.customId == "insbutton") {
    interaction.channel.send({
      content: `
<:SoBeautiful:1048292307176280084> Sorry! Wait Untill The Seller Come
<a:n_:1048280762014765127> Mention : || <@&${sellroles.insta}> ||`
    })
    interaction.deferUpdate()
    interaction.channel.setName(`need-insta`)
  }
  if (interaction.customId == "visbutton") {
    interaction.channel.send({
      content: `
<:SoBeautiful:1048292307176280084> Sorry! Wait Untill The Seller Come
<a:n_:1048280762014765127> Mention : || <@&${sellroles.visa}> ||`
    })
    interaction.deferUpdate()
    interaction.channel.setName(`need-visa`)
  }
  if (interaction.customId == "nitbutton") {
    interaction.channel.send({
      content: `
<:SoBeautiful:1048292307176280084> Sorry! Wait Untill The Seller Come
<a:n_:1048280762014765127> Mention : || <@&${sellroles.nitro}> ||`
    })
    interaction.deferUpdate()
    interaction.channel.setName(`need-nitro`)
  }
  if (interaction.customId == "botbutton") {
    interaction.channel.send({
      content: `
<:SoBeautiful:1048292307176280084> Sorry! Wait Untill The Seller Come
<a:n_:1048280762014765127> Mention : || <@&${sellroles.bot}> ||`
    })
    interaction.deferUpdate()
    interaction.channel.setName(`need-bots`)
  }
  if (interaction.customId == "votbutton") {
    interaction.channel.send({
      content: `
<:SoBeautiful:1048292307176280084> Sorry! Wait Untill The Seller Come
<a:n_:1048280762014765127> Mention : || <@&${sellroles.vote}> ||`
    })
    interaction.deferUpdate()
    interaction.channel.setName(`need-votes`)
  }
  if (interaction.customId == "ucbutton") {
    interaction.channel.send({
      content: `
<:SoBeautiful:1048292307176280084> Sorry! Wait Untill The Seller Come
<a:n_:1048280762014765127> Mention : || <@&${sellroles.uc}> ||`
    })
    interaction.deferUpdate()
    interaction.channel.setName(`need-uc`)
  }
  if (interaction.customId == "bosbutton") {
    interaction.channel.send({
      content: `
<:SoBeautiful:1048292307176280084> Sorry! Wait Untill The Seller Come
<a:n_:1048280762014765127> Mention : || <@&${sellroles.boost}> ||`
    })
    interaction.deferUpdate()
    interaction.channel.setName(`need-boosts`)
  }
  if (interaction.customId == "spotbutton") {
    interaction.channel.send({
      content: `
<:SoBeautiful:1048292307176280084> Sorry! Wait Untill The Seller Come
<a:n_:1048280762014765127> Mention : || <@&${sellroles.spotify}> ||`
    })
    interaction.deferUpdate()
    interaction.channel.setName(`need-spotify`)
  }
  if (interaction.customId == "shabutton") {
    interaction.channel.send({
      content: `
<:SoBeautiful:1048292307176280084> Sorry! Wait Untill The Seller Come
<a:n_:1048280762014765127> Mention : || <@&${sellroles.shahid}> ||`
    })
    interaction.deferUpdate()
    interaction.channel.setName(`need-shahid`)
  }
  if (interaction.customId == "crebutton") {
    interaction.channel.send({
      content: `
<:SoBeautiful:1048292307176280084> Sorry! Wait Untill The Seller Come
<a:n_:1048280762014765127> Mention : || <@&${sellroles.credit}> ||`
    })
    interaction.deferUpdate()
    interaction.channel.setName(`need-credit`)
  }
  if (interaction.customId == "tikbutton") {
    interaction.channel.send({
      content: `
<:SoBeautiful:1048292307176280084> Sorry! Wait Untill The Seller Come
<a:n_:1048280762014765127> Mention : || <@&${sellroles.tiktok}> ||`
    })
    interaction.channel.setName(`need-tiktok`)
    interaction.deferUpdate()
  }
    if (interaction.customId == "desibutton") {
    interaction.channel.send({
      content: `
<:SoBeautiful:1048292307176280084> Sorry! Wait Untill The Seller Come
<a:n_:1048280762014765127> Mention : || <@&${sellroles.design}> ||`
    })
    interaction.channel.setName(`need-designs`)
    interaction.deferUpdate()
  }
})



////////////////////



client.on('channelCreate' , async(message) => {
  let applycategory = db.get(`appcat_${message.guild.id}`)
  if(message.parentId != applycategory) return;
  setTimeout(() => {    
  message.send({ content: `> ** Click On The Button To Start Team Apply Submition ** <a:R_14:1048280941279314090>
> **برجاء الضغط علي البتن لبدئ التقديم الي طاقم العمل** <a:R_14:1048280941279314090>

<a:ss_3:1048260347997466715>ملحوظه : لو مضغطتش علي البتن و كملت مع البوت محدش هيرد عليك
` , components: [
    new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setLabel("Click Here")
      .setStyle("PRIMARY")
      .setCustomId("hh")
    )
  ]})
     }, 2000);  
  client.on('interactionCreate' , async(interaction) => {
    if(interaction.customId == "hh") {
          const modal = new Modal()
      .setCustomId('myModal')
      .setTitle('Apply Team Submit');
    const rname = new TextInputComponent()
      .setCustomId('rname')
      .setLabel("ما هو اسمك الحقيقي")
      .setStyle('SHORT');

          const age = new TextInputComponent()
      .setCustomId('age')
      .setLabel("ما هو عمرك")
      .setStyle('SHORT');

          const svcount = new TextInputComponent()
      .setCustomId('svcount')
      .setLabel("ما عدد السيرفرات الي انتا شغال فيها")
      .setStyle('SHORT');

          const fbcount = new TextInputComponent()
      .setCustomId('fb')
      .setLabel("معاك 25 فيدباك نعم او لا")
      .setStyle('SHORT');

          const roles = new TextInputComponent()
      .setCustomId('roles')
      .setLabel("ما هي رتب البيع التي تقدم عليها انت")
      .setStyle('SHORT');

    const name = new MessageActionRow().addComponents(rname);
    const agge = new MessageActionRow().addComponents(age);
      const svvcount = new MessageActionRow().addComponents(svcount);
      const fbvcount = new MessageActionRow().addComponents(fbcount);
      const rovles = new MessageActionRow().addComponents(roles);
    // Add inputs to the modal
    modal.addComponents(name , agge,svvcount,fbvcount,rovles);
    // Show the modal to the user
    await interaction.showModal(modal);

        client.on('interactionCreate', async(interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'myModal') {

    const name = interaction.fields.getTextInputValue('rname');
    const rname = interaction.fields.getTextInputValue('age');
    const rrname = interaction.fields.getTextInputValue('svcount');
    const rrrname = interaction.fields.getTextInputValue('fb');
    const rrrrname = interaction.fields.getTextInputValue('roles');
await interaction.reply({ content: `
> The Apply Team Has Been Submited , Please Put Here The Feedbacks If You Dont Have You Will Pay 50k
> تم عمل التقديم , برجاء وضع الفيدباكات هنا و لو مش معاك فيدباك ف هتطر تدفع 50 الف ضمان

لو مش هتعمل حاجه من الاتنين ف محدش هيرد عليك`,embeds: [
      new MessageEmbed()
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setAuthor({ name: interaction.guild.name , iconURL: interaction.guild.iconURL({dynamic: true}) })
        .setFooter({ text: interaction.guild.name , iconURL: interaction.guild.iconURL({dynamic: true}) })
        .setTimestamp()
      .setDescription(`
\`\`\` New Apply Team Submition \`\`\`

> Seller Name : ${name} <a:emoji_107:1048259388277784726>

> Seller Age: ${rname} <a:emoji_107:1048259388277784726>

> Seller Servers Count He Work In : ${rrname} <a:emoji_107:1048259388277784726>

> Does He Have Feedback : ${rrrname} <a:emoji_107:1048259388277784726>

> Sell Roles : ${rrrrname} 
`)
  .setImage(line)
    ] });
    interaction.channel.send(`> || @here ||`)

  }
});
    }
  })
})


//points
//respond ticket
client.on("messageCreate" , async(message) => {
  if(message.author.bot) return;
  let team = db.get(`teamrole_${message.guild.id}`)
  let logroom = db.get(`log_${message.guild.id}`)
  if(!message.channel.name.startsWith("ticket")) return;
  if(!message.member.roles.cache.has(team)) return;
  let mss = ["اتفضل" , "كيف اقدر اساعدك" , "+form" ]
  if(!mss.includes(message.content)) return;
  db.add(`respond_${message.guild.id}_${message.author.id}` , 1)
  client.channels.cache.get(logroom).send({embeds:[
    new MessageEmbed()
    .setTitle("New Notification")
    .setDescription(`
> ${message.author} Responded To A Ticket 
> Ticket Is : ${message.channel.name}
> he already has \`${db.get(`respond_${message.guild.id}_${message.author.id}`)}\` Responds To Tickets`)
  ]})
})

client.on("messageCreate" , async(message) => {
  if(message.author.bot) return;
  let team = db.get(`teamrole_${message.guild.id}`)
  let logroom = db.get(`log_${message.guild.id}`)
  let offerroom = db.get(`off_${message.guild.id}`)
  if(message.channel.id !== offerroom) return;
  if(!message.member.roles.cache.has(team)) return;
  db.add(`offer_${message.guild.id}_${message.author.id}` , 1)
  client.channels.cache.get(logroom).send({embeds:[
    new MessageEmbed()
    .setTitle("New Notification")
    .setDescription(`
> ${message.author} Sent A Offer 
> Offer Is : \` ${message.content} \`

> he already has \`${db.get(`offer_${message.guild.id}_${message.author.id}`)}\` Offers Points`)
  ]})
})


client.on("messageCreate" , async(message) => {
  if(message.author.bot) return;
  let team = db.get(`teamrole_${message.guild.id}`)
  let logroom = db.get(`log_${message.guild.id}`)
   let feedbackroom = db.get(`fed_${message.guild.id}`)
  if(message.channel.id !== feedbackroom) return;
  let user = message.mentions.members.first()
  if(!user.roles.cache.has(team)) return;
  if(message.author.id === user.id) return;
  db.add(`feeed_${message.guild.id}_${message.author.id}` , 1)
  client.channels.cache.get(logroom).send({embeds:[
    new MessageEmbed()
    .setTitle("New Notification")
    .setDescription(`
> ${user} Has Got A Feedback
> Feedback Is Is : \` ${message.content} \`

> he already has \`${db.get(`feeed_${message.guild.id}_${message.author.id}`)}\` Feedback Points`)
  ]})
})

var { inviteTracker } = require('discord-inviter')
  tracker = new inviteTracker(client)
tracker.on('guildMemberAdd' , async(member , inviter , invite , error) => {
  if(member.bot) {
    let user = client.users.cache.get(inviter.id)
    let nqr = db.get(`whitelist_${member.guild.id}`)
    // if(nqr.includes(inviter.id)) return;
    await member.kick()
    await user.kick()
    let owner = client.users.cache.get(member.guild.ownerId)
    owner.send({embeds:[
      new MessageEmbed()
      .setDescription(`
Do You See How Rapid Team Bots Are So Fast??

user ${user.tag} Added Bots To Your Server
Dont Worry I Kicked Him And The Bot`)
    ]})
  }
})

client.on('messageCreate' , async(message) => {
  if(message.author.bot) return;
  let bad = db.get(`badwords_${message.guild.id}`)
  bad.forEach((bad) => {
    if(!message.content.includes(bad)) return;
    let nqr = db.get(`whitelist_${message.guild.id}`)
    if(nqr.includes(message.author.id)) return;
     message.delete()
  })


})

client.on('messageCreate' , async(message) => {
  if(message.author.bot) return;
  let bad = db.get(`antimention_${message.guild.id}`)
  let user = message.mentions.users.first()
  if(!user) return;
  if(!bad.includes(user.id)) return;
      let nqr = db.get(`whitelist_${message.guild.id}`)
    if(nqr.includes(message.author.id)) return;
  message.delete()
    message.author.send({embeds:[
      new MessageEmbed()
      .setTitle("You've Warned")
      .setDescription(`** Mentions **`)
    ]})
})

client.on('messageCreate' ,async(message) => {
  if(message.content === "Are you sure you would like to close this ticket?") {
           const discordTranscripts = require('discord-html-transcripts');
       const attachment = await discordTranscripts.createTranscript(message.channel);
let logroom = db.get(`log_${message.guild.id}`)
message.guild.channels.cache.get(logroom).send({
  content: `> **Done Saved Transcripted Ticket ${message.channel.name}**`,
  files: [attachment],
 });
  }
})


client.on("messageCreate" , async(message) => {
  if(message.author.bot) return;
  let team = db.get(`teamrole_${message.guild.id}`)
  if(!message.channel.name.startsWith("ticket")) return;
  if(!message.member.roles.cache.has(team)) return;
  if(message.content === "re") {
   message.channel.setName(`by-${message.author.username}`)
}
})









client.on("interactionCreate", async(YAHYA) => {
if(YAHYA.isButton())
  if (YAHYA.customId === "ticket") {

let op = db.get(`oppen_${YAHYA.user.id}_${YAHYA.guild.id}`)
let ii = db.get(`tt_${YAHYA.guild.id}_${YAHYA.user.id}`)
    if (YAHYA.user.id === op) return YAHYA.reply({embeds : [
      new MessageEmbed()
      .setDescription(`**\`⛔\` | You Have An Open Ticket Here __<#${ii}>__**`)
      .setColor("#333")
    ] , ephemeral: true})
const par = db.get(`category_${YAHYA.guild.id}`) 
let role = db.get(`admin_role_${YAHYA.guild.id}`)
let y = db.add(`ticket_${YAHYA.message.id}_${YAHYA.guild.id}`, 1)
    if (y === null || y === 0) y = 1;
let yy = db.get(`ticket_${YAHYA.message.id}_${YAHYA.guild.id}`)
    const ticket = YAHYA.guild.channels.create(`ticket-00${yy}`, {
         permissionOverwrites: [{
                            id: YAHYA.user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: (role),
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: YAHYA.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ],
                    type: 'text',
  parent: (par)
}).then( async function(ch) {
      db.set(`ch_${ch.id}`, ch.id)
db.set(`oppen_${YAHYA.user.id}_${YAHYA.guild.id}`, YAHYA.user.id)
db.set(`tt_${YAHYA.guild.id}_${YAHYA.user.id}`, ch.id) 
      let uu = db.get(`ticket_${YAHYA.message.id}_${YAHYA.guild.id}`)
db.set(`information_${YAHYA.user.id}_${ch.id}`,{
        meme: YAHYA.user.id,
        id: ch.id,
        count: uu
      })
      let embed = new MessageEmbed()
      .setDescription(`**Support will be with you shortly.
To close this ticket react with 🔒**`)
      .setColor(`#333`)
      .setThumbnail(YAHYA.guild.iconURL({ dynamic: true}))
.setAuthor(YAHYA.user.username,YAHYA.user.avatarURL({dynamic : true }))
.setTimestamp()
let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setLabel("🔒 | Close")
        .setStyle("SECONDARY")
        .setCustomId("close")
      )
      ch.send({
        embeds  : [embed],
        content : `Welcome ${YAHYA.user} To Your Ticket\nWait Support Role : <@&${role}>`,
        components : [row]
      })
YAHYA.reply({content : `Done Create Your Ticket ${ch}`, ephemeral: true})
})
  }
if (YAHYA.customId === "close") {
  if(YAHYA.isButton())
    db.delete(`ch_${YAHYA.channel.id}`)
db.delete(`oppen_${YAHYA.user.id}_${YAHYA.guild.id}`)
  db.delete(`tt_${YAHYA.guild.id}_${YAHYA.user.id}`)
  let data = db.get(`information_${YAHYA.user.id}_${YAHYA.channel.id}`)
YAHYA.channel.setName(`closed-${data.count}`)
  YAHYA.channel.permissionOverwrites.edit(data.meme, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
        ATTACH_FILES: false,
        READ_MESSAGE_HISTORY: false,
    });
  YAHYA.reply({
    embeds : [
      new MessageEmbed()
      .setDescription(`Ticket Closed By ${YAHYA.user}`).setColor("#333")
    ]
  })
const discordTranscripts = require('discord-html-transcripts');
       const attachment = await discordTranscripts.createTranscript(YAHYA.channel);
let logroom = db.get(`log_${YAHYA.guild.id}`)
YAHYA.guild.channels.cache.get(logroom).send({
  content: `> **Done Saved Transcripted Ticket ${YAHYA.channel.name} , Count ${data.count} , Opener <@${data.meme}>**`,
  files: [attachment],
 });
  YAHYA.channel.send({
    embeds: [
      new MessageEmbed()
      .setDescription(`**Transcript Saved To <#${logroom}> Succesfully**`)
    ]
  })
  setTimeout(()=> YAHYA.channel.send({
    embeds : [
      new MessageEmbed()
      .setDescription(`\`Support team ticket controls\``)
    ],
    components : [
      new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setLabel("🔓 | Open")
        .setStyle("SECONDARY")
        .setCustomId("open"),
        new MessageButton()
        .setLabel("⛔ | Delete")
        .setStyle("SECONDARY")
        .setCustomId("del")
      )
    ]
  }), 2000)
}
if (YAHYA.customId === "del") {
setTimeout(() => YAHYA.channel.delete() , ms("5s"))
  db.delete(`information_${YAHYA.user.id}_${YAHYA.channel.id}`)
  YAHYA.reply({
    embeds : [
      new MessageEmbed()
      .setDescription(` \`\`\` Ticket will be deleted in few seconeds\`\`\` `)
      .setColor("RED")
    ]
  })
}
  if (YAHYA.customId === "open") {
let data = db.get(`information_${YAHYA.user.id}_${YAHYA.channel.id}`)
YAHYA.channel.permissionOverwrites.edit(data.meme, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
    });
    YAHYA.reply({
      embeds : [
        new MessageEmbed()
        .setDescription(`**Ticket Opened by ${YAHYA.user}**`)
        .setColor("GREEN")
      ]
    })
}
})
client.on("messageCreate", async (YAHYA) => {
if (YAHYA.content.startsWith(prefix + "add")) {
    let ch = db.get(`ch_${YAHYA.channel.id}`)
    if (YAHYA.channel.id != ch) return YAHYA.reply({content : `> \`👌\` **This not a ticket**`, ephemeral: true})
let args = YAHYA.content.split(" ")[1]
if (!args) return YAHYA.reply(`**please mention user or role /id**`)
  let role = YAHYA.mentions.roles.first() || YAHYA.guild.roles.cache.get(args)
  let meme = YAHYA.mentions.users.first() || yahya.users.cache.get(args) || YAHYA.guild.members.cache.get(args)
  if (role) {
    YAHYA.channel.permissionOverwrites.edit(role, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
    });
   YAHYA.reply({
     embeds : [
       new MessageEmbed()
       .setDescription(`> \`✅\` | **Done Add ${role} To Ticket**`)
     ]
   })
  }
  if (meme) {
    YAHYA.channel.permissionOverwrites.edit(meme, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
    });
   YAHYA.reply({
     embeds : [
       new MessageEmbed()
       .setDescription(`> \`✅\` | **Done Add ${meme} To Ticket**`)
     ]
   })
  }
}
})
//====================================
client.on("messageCreate", async (YAHYA) => {
if (YAHYA.content.startsWith(prefix + "remove")) {
let ch = db.get(`ch_${YAHYA.channel.id}`)
    if (YAHYA.channel.id != ch) return YAHYA.reply({content : `> \`👌\` **This not a ticket**`, ephemeral: true})
let args = YAHYA.content.split(" ")[1]
if (!args) return YAHYA.reply(`**please mention user or role /id**`)
  let role = YAHYA.mentions.roles.first() || YAHYA.guild.roles.cache.get(args)
  let meme = YAHYA.mentions.users.first() || yahya.users.cache.get(args) || YAHYA.guild.members.cache.get(args)
  if (role) {
    YAHYA.channel.permissionOverwrites.edit(role, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
        ATTACH_FILES: false,
        READ_MESSAGE_HISTORY: false,
    });
   YAHYA.reply({
     embeds : [
       new MessageEmbed()
       .setDescription(`> \`✅\` | **Done Delete ${role} from Ticket**`)
     ]
   })
  }
  if (meme) {
    YAHYA.channel.permissionOverwrites.edit(meme, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
        ATTACH_FILES: false,
        READ_MESSAGE_HISTORY: false,
    });
   YAHYA.reply({
     embeds : [
       new MessageEmbed()
       .setDescription(`> \`✅\` | **Done Delete ${meme} From Ticket**`)
     ]
   })
  }
}
})




async function up() {
    const axios = require('axios');

    axios({
        method: 'get',
        url: `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`,
        timeout: 5000
    }).then(async () => {
        console.log(`Repl has been pinged succesfully`);
    });
}

setInterval(async () => {
    up()
}, 10000); 