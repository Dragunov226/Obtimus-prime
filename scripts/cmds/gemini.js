      message.reply({
        body: response1.data,
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  },

  onReply: async function ({ message, event, Reply, args }) {
    try {
      let { author, commandName } = Reply;
      if (event.senderID !== author) return;

      const gif = args.join(' ');
      const response23 = await axios.get(`https://api-samir.onrender.com/Gemini?text=${encodeURIComponent(gif)}`);

      if (response23.data && response23.data.candidates && response23.data.candidates.length > 0) {
        const textContent = response23.data.candidates[0].content.parts[0].text;
        const wh = `${textContent}`;
        message.reply({
          body: wh,
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
          });
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
};
