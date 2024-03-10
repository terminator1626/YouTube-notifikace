const Discord = require('discord.js');
const fs = require('fs');
const rss = require('rss-converter');
const config = require('./config.json');
const client = new Discord.Client({
     partials: [
          "CHANNEL",
          "GUILD_MEMBER",
          "MESSAGE",
          "REACTION",
          "USER"
     ],
});
const fetch = require("isomorphic-fetch");
const opusscript = require('opusscript')
const ffmpeg = require('ffmpeg')
client.on("ready", async () => {
     client.user.setActivity("@17layzie", { type: "WATCHING" })
     setInterval(async () => {
          let feed = await rss.toJson('https://www.youtube.com/feeds/videos.xml?channel_id=' + config.channel_yt);
          let jsonOpen = fs.readFileSync('links.json');
          let json = JSON.parse(jsonOpen);
          if (jsonOpen.includes(feed.items[0].yt_videoId)) return;
          json.push(feed.items[0].yt_videoId);
          let jsonLink = JSON.stringify(json);
          fs.writeFileSync('links.json', jsonLink);
          let y = client.channels.cache.get(config.channel_id)
          if (!y) return;
          y.send(`Ahoj <@&${config.role}>\n\n**${feed.author.name}** právě vydal nové videjko. Podívej se jako první na **${feed.items[0].title}**||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ _ https://www.youtube.com/watch?v=${feed.items[0].yt_videoId}`);
     }, 6000);
})
client.login(config.token);
