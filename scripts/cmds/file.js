const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "OtinXShiva",
    countDown: 5,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["61563580892213"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("-Bro tu veux fouiller mes fichiers ? Non seul Abdallah en a le droit", event.threadID, event.messageID);
    }
    
    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("veuillez saisir le nom du fichier 😉.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`Fichier introuvable 😪: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
