module.exports = {
  config: {
    name: "join",
    aliases: ['addme', 'joinme'],
    version: "1.0",
    author: "Samir B. Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Add user to support group",
    },
    longDescription: {
      en: "This command adds the user to the group wher bot exist",
    },
    category: "owner",
    guide: {
      en: "To use this command, simply type !join <threadID>.",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    const supportGroupId = args[0];
    if (!supportGroupId) {
      api.sendMessage("𝑩𝒐𝒔𝒔 𝒗𝒆𝒖𝒊𝒍𝒍𝒆𝒓 𝒔𝒂𝒊𝒔𝒊𝒓 𝒍'𝒊𝒅 𝒅𝒖 𝒈𝒓𝒐𝒖𝒑𝒆 𝒔𝒐𝒖𝒉𝒂𝒊𝒕𝒆́.", event.threadID);
      return;
    }
    const threadID = event.threadID;
    const userID = event.senderID;
    const threadInfo = await api.getThreadInfo(supportGroupId);
    const participantIDs = threadInfo.participantIDs;
    if (participantIDs.includes(userID)) {
      api.sendMessage(
        "𝑨𝒗𝒆𝒄 𝒕𝒐𝒖𝒕 𝒎𝒆𝒔 𝒓𝒆𝒔𝒑𝒆𝒄𝒕 𝒃𝒐𝒔𝒔 𝒗𝒐𝒖𝒔 𝒆̂𝒕𝒆𝒔 𝒅𝒆́𝒋𝒂̀ 𝒂𝒋𝒐𝒖𝒕𝒆́. 𝑽𝒆𝒖𝒊𝒍𝒍𝒆𝒓 𝒗𝒆𝒓𝒊𝒇𝒊𝒆𝒓 𝒅𝒂𝒏𝒔 𝒗𝒐𝒔 𝒊𝒏𝒗𝒊𝒕𝒂𝒕𝒊𝒐𝒏𝒔 𝒑𝒂𝒓 𝒎𝒆𝒔𝒔𝒂𝒈𝒆.",
        threadID
      );
    } else {
      api.addUserToGroup(userID, supportGroupId, (err) => {
        if (err) {
          console.error("Failed to add user to support group:", err);
          api.sendMessage("I can't add you because your id is not allowed message request or your account is private. please add me then try again...", threadID);
        } else {
          api.sendMessage(
            "𝑽𝒐𝒖𝒔 𝒂𝒗𝒆𝒛 𝒆𝒕𝒆́ 𝒂𝒅𝒆𝒓𝒆𝒓 𝒂𝒗𝒆𝒄 𝒔𝒖𝒄𝒄𝒆𝒔 🧞‍♂️. 𝑽𝒆𝒖𝒊𝒍𝒍𝒆𝒓 𝒗𝒆𝒓𝒊𝒇𝒊𝒆𝒓 𝒗𝒐𝒔 𝒊𝒏𝒗𝒊𝒕𝒂𝒕𝒊𝒐𝒏𝒔 𝒑𝒂𝒓 𝒎𝒆𝒔𝒔𝒂𝒈𝒆𝒔",
            threadID
          );
        }
      });
    }
  },
};
