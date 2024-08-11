module.exports = {
  config: {
    name: "Mugiwara",
    aliases: ['gc', 'supportgc'],
    version: "1.0",
    author: "MarianCross",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Add user to support group",
    },
    longDescription: {
      en: "This command adds the user to the admin support group.",
    },
    category: "support",
    guide: {
      en: "To use this command, simply type !Alessgc.",
    },
  },

  // onStart is a function that will be executed when the command is executed
  onStart: async function ({ api, args, message, event }) {
    const supportGroupId = "8689116994435110"; // ID of the support group

    const threadID = event.threadID;
    const userID = event.senderID;

    // Check if the user is already in the support group
    const threadInfo = await api.getThreadInfo(supportGroupId);
    const participantIDs = threadInfo.participantIDs;
    if (participantIDs.includes(userID)) {
      // User is already in the support group
      api.sendMessage(
        "Vous êtes déjà dans le groupe si vous ne le voyez pas veuillez me contacter avec callad.",
        threadID
      );
    } else {
      // Add user to the support group
      api.addUserToGroup(userID, supportGroupId, (err) => {
        if (err) {
          console.error("Désolé votre compte est privé donc vous ne pouvez pas rejoindre le groupe 😅:", err);
          api.sendMessage("I can't add you because your id is not allowed message request or your account is private. please add me then try again...", threadID);
        } else {
          api.sendMessage(
            "Vous avez été ajouté au groupe de support administrateur. Si vous n'avez pas trouvé la boîte de réception dans votre inbox, veuillez vérifier vos demandes de messages ou votre boîte de courrier indésirable.",
            threadID
          );
        }
      });
    }
  },
};
