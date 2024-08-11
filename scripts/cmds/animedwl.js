
      } else if (type === 'animeInfo') {
        const episodeNumber = parseInt(args[0], 10);
        if (isNaN(episodeNumber) || episodeNumber < 1 || episodeNumber > totalEp) {
          return message.reply(`⚠ | Please enter a valid episode number!`);
        }

        const episodeId = `${animeId}-episode-${episodeNumber}`;

        const res = await axios.get(`${API}/download/${episodeId}`);
        const downloadLinks = res.data.results;

        let replyText = `Here is your episode ${episodeNumber} download link senpai\n\n(Reply the episode number on the previous message which episode you want to get the download links again)\n\n`;
        const qualities = ['640x360', '854x480', '1280x720', '1920x1080'];

        for (const quality of qualities) {
          if (downloadLinks[quality]) {
            const url = downloadLinks[quality];
            const shortRes = await axios.get(`${URL_SHORTENER_API}/?url=${encodeURIComponent(url)}&apikey=${API_KEY}`);
            replyText += `${quality}: ${shortRes.data.shortUrl}\n\n`;
          }
        }

        message.reply(replyText, async (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              type: 'downloadLinks',
              data: downloadLinks,
              animeId: animeId,
              totalEp: totalEp
            });
          }
        });
      }
    } catch (e) {
      message.reply(`🥺 An error occurred`);
      console.error(e.message);
    }
  }
};

async function search(query) {
  const url = `${API}/search/${query}`;
  const response = await axios.get(url);
  return response.data;
};

async function getInfo(id) {
  const url = `${API}/anime/${id}`;
  const response = await axios.get(url);
  return response.data;
};

async function watch(id) {
  const url = `${API}/episode/${id}`;
  const response = await axios.get(url);
  return response.data;
}

async function download(id) {
  const url = `${API}/download/${id}`;
  const response = await axios.get(url);
  return response.data;
}
