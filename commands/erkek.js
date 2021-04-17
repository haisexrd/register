const Discord = require('discord.js')
const db = require('quick.db')
const kdb = new db.table("kullanici")
const conf  = require('../config.json')
const set = require('../selection/settings.json')
module.exports.run = async(client, message, args) => {
if(!message.member.roles.cache.has(set.roller.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!")

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))

if(!member) return message.channel.send("Sanki Bir Kullanıcıyı Etiketlemeyi Unuttun?")

if(member.id === message.author.id) return message.channel.send('Kendini Kayıt Edemezsin Dostum.');

if(member.id === message.guild.OwnerID) return message.channel.send("Sunucu Sahibini Kayıt Edemezsin Dostum.")

if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Kullanıcı Senle Aynı Yada Senden Üst Pozisyonda!")

}

let isim = args[1]
if(!isim) return message.channel.send("Galiba Bir Isim Girmeyi Unuttun Dostum.")

let yas = args[2]
if(!yas) return message.channel.send("Galiba Bir Yaş Girmeyi Unuttun Dostum.")


//if (db.fetch(`tag.${message.guild.id}`)) {
//if(!member.user.username.includes(set.taglar.tag) && !member.roles.cache.has(set.vip) && !member.roles.cache.has(set.roller.booster)) return message.channel.send('Sunucumuz şuanda taglı alımdadır. Tagımızı alıp kayıt olabilirsiniz.')
//}

if(member.roles.cache.has(set.roller.erkek) || member.roles.cache.has(set.roller.erkek2) || member.roles.cache.has(set.roller.kız) || member.roles.cache.has(set.roller.kız2)) {
return message.channel.send("Bu Kullanıcı Zaten Kayıtlı.")

}


if(!member.user.username.includes(set.taglar.tag)) {
    member.setNickname(`${set.taglar.tagsız} ${isim} | ${yas}`)
    member.roles.add(set.roller.erkek)
    member.roles.add(set.roller.erkek2)
    member.roles.remove(set.roller.unregister)
} 

  if(member.user.username.includes(set.taglar.tag)) {
    member.setNickname(`${set.taglar.tag} ${isim} | ${yas}`)
    member.roles.add(set.taglar.tagrol)
    member.roles.add(set.roller.erkek)
    member.roles.add(set.roller.erkek2)
    member.roles.remove(set.roller.unregister)
}

let mesaj = "Kullanıcı Başarıyla Kayıt Edildi, <@&${set.roller.erkek}> ve <@&${set.roller.erkek2}> Rolleri Verildi";
client.channels.cacge.get(set.kanallar.kayıtkanal).send(mesaj)


let mesaj = "Kayıt Başarılı \n Kayıt Eden Yetkili : ${message.author} \n Verilen Rol : <@&${set.roller.erkek}> <@&${set.roller.erkek2}> \n Alınan Rol : <@&${set.roller.unregister}>"

client.channels.cacge.get(set.kanallar.log).send(mesaj)



exports.conf = {
  enabled: true,
  aliases: ['erkek', 'e'],
  guildOnly: true,
  permlevel: 0
};

exports.help = {
    name: 'erkek'
}
