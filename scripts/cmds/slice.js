const axios = require("axios");

module.exports = {
config: {
		name: "slice",
    version: "1.0",
		author: "DRG",
		countDown: 5,
		role: 0,
		shortDescription: "Write light glow sliced Text Through textpro.me",
		longDescription: "Write light glow sliced Text Through textpro.me",
		category: "text",
		guide: {
      en: "{p}{n} query",
    }
	},

 onStart: async function ({ api, event, args, message }) {
 try { 
 const samir = args.join(' ');
 const response = await axios.get(`https://tanjiro-api.onrender.com/textpro?text=${samir}&&link=https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html&api_key=tanjiro`);

 const message = {attachment:await global.utils.getStreamFromURL(response.data.result)};
 return api.sendMessage(message, event.threadID);
 } catch (error) {
 console.error(error);
 message.reply("An error occurred while fetching response");
 }
 }
};
