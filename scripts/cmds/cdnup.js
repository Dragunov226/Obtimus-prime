const axios = require('axios');

module.exports = {
  config: {
    name: "cdnup",
    aliases: ["cdn", "চদন" ,"cdina"],
    version: "1.0",
    author: "JARiF", // dont change the author 🐔👑
    countDown: 15,
    role: 0,
    longDescription: "Discord LINK Kamlami",
    category: "download",
    guide: {
      en: "{pn} prompt"
    }
  },

onStart: async function ({ api, event, message, args }) {
const discordWebhookUrl = 'https://discord.com/api/webhooks/1183449023445737544/R9UP_eJbue5wRVR2fgIZdlq8pBYevF1B9hmDymaeNNku3FgAMVOeGMgdQDMiPsan_Nep';

const fileData = await global.utils.getStreamFromUrl(event.messageReply.attachments[0].url)

axios.post(discordWebhookUrl, {
  file: fileData,
}, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
  .then((response) => {
    message.reply(response.data.attachments[0].url);
  })
  .catch((error) => {
   message.reply(error);
  });
}
}
