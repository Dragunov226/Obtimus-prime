const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "OtinXShiva",
    countDown: 5,
    role: 2,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("𝚟𝚎𝚞𝚒𝚕𝚕𝚎𝚛 𝚙𝚛𝚎́𝚌𝚒𝚜𝚎𝚛 𝚕𝚎 𝚗𝚘𝚖 𝚍𝚞 𝚏𝚒𝚌𝚑𝚒𝚎𝚛...𝚖𝚊𝚒𝚝𝚛𝚎 🧞‍♂️ ", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
