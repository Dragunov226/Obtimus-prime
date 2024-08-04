const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = {
	config: {
		name: "admin",
		version: "1.6",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Thêm, xóa, sửa quyền admin",
			en: "Add, remove, edit admin role"
		},
		category: "box chat",
		guide: {
			vi: '   {pn} [add | -a] <uid | @tag>: Thêm quyền admin cho người dùng'
				+ '\n	  {pn} [remove | -r] <uid | @tag>: Xóa quyền admin của người dùng'
				+ '\n	  {pn} [list | -l]: Liệt kê danh sách admin',
			en: '   {pn} [add | -a] <uid | @tag>: Add admin role for user'
				+ '\n	  {pn} [remove | -r] <uid | @tag>: Remove admin role of user'
				+ '\n	  {pn} [list | -l]: List all admins'
		}
	},

	langs: {
		vi: {
			added: "✅ | Đã thêm quyền admin cho %1 người dùng:\n%2",
			alreadyAdmin: "\n⚠️ | %1 người dùng đã có quyền admin từ trước rồi:\n%2",
			missingIdAdd: "⚠️ | Vui lòng nhập ID hoặc tag người dùng muốn thêm quyền admin",
			removed: "✅ | Đã xóa quyền admin của %1 người dùng:\n%2",
			notAdmin: "⚠️ | %1 người dùng không có quyền admin:\n%2",
			missingIdRemove: "⚠️ | Vui lòng nhập ID hoặc tag người dùng muốn xóa quyền admin",
			listAdmin: "👑 | Danh sách admin:\n%1"
		},
		en: {
			added: "✅ |☠ 𝑵𝒐𝒖𝒗𝒆𝒍𝒍𝒆 𝒎𝒊𝒔𝒔𝒊𝒐𝒏 𝒅'𝒂𝒅𝒎𝒊𝒏 𝒂𝒋𝒐𝒖𝒕𝒆́ ☠ %1 users:\n%2",
			alreadyAdmin: "\n⚠️ | %1 users 𝑽𝒐𝒖𝒔 𝒆̂𝒕𝒆𝒔 𝒅𝒆́𝒋𝒂 𝒂𝒅𝒎𝒊𝒏 :\n%2",
			missingIdAdd: "⚠️ | ☠𝑽𝒆𝒖𝒊𝒍𝒍𝒆𝒓 𝒂𝒋𝒐𝒖𝒕𝒆𝒓 𝒍'𝑰𝑫 𝒅𝒆 𝒍𝒂 𝒑𝒆𝒓𝒔𝒐𝒏𝒏𝒆 ☠",
			removed: "✅ | 𝑨𝒅𝒎𝒊𝒏 𝒃𝒂𝒏𝒏𝒊 of %1 users:\n%2",
			notAdmin: "⚠️ | %1 ☠𝑻'𝒆𝒔 𝒑𝒂𝒔 𝒂𝒅𝒎𝒊𝒏 𝒅𝒖 𝒃𝒂𝒍𝒍𝒂𝒊𝒔 ☠:\n%2",
			missingIdRemove: "⚠️ | 𝑽𝒆𝒖𝒊𝒍𝒍𝒆𝒓 𝒂𝒋𝒐𝒖𝒕𝒆𝒓 𝒍'𝒊𝒖𝒅 𝒅𝒆 𝒍𝒂 𝒑𝒆𝒓𝒔𝒐𝒏𝒏𝒆",
			listAdmin: "☬⚡⚡⚡ | 𝑳𝒊𝒔𝒕𝒆 𝒅𝒆𝒔 𝒂𝒅𝒎𝒊𝒏𝒔:\n%1"
		}
	},

	onStart: async function ({ message, args, usersData, event, getLang }) {
		switch (args[0]) {
			case "add":
			case "-a": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions);
					else if (event.messageReply)
						uids.push(event.messageReply.senderID);
					else
						uids = args.filter(arg => !isNaN(arg));
					const notAdminIds = [];
					const adminIds = [];
					for (const uid of uids) {
						if (config.adminBot.includes(uid))
							adminIds.push(uid);
						else
							notAdminIds.push(uid);
					}

					config.adminBot.push(...notAdminIds);
					const getNames = await Promise.all(uids.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
					return message.reply(
						(notAdminIds.length > 0 ? getLang("added", notAdminIds.length, getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")) : "")
						+ (adminIds.length > 0 ? getLang("alreadyAdmin", adminIds.length, adminIds.map(uid => `• ${uid}`).join("\n")) : "")
					);
				}
				else
					return message.reply(getLang("missingIdAdd"));
			}
			case "remove":
			case "-r": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions)[0];
					else
						uids = args.filter(arg => !isNaN(arg));
					const notAdminIds = [];
					const adminIds = [];
					for (const uid of uids) {
						if (config.adminBot.includes(uid))
							adminIds.push(uid);
						else
							notAdminIds.push(uid);
					}
					for (const uid of adminIds)
						config.adminBot.splice(config.adminBot.indexOf(uid), 1);
					const getNames = await Promise.all(adminIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
					return message.reply(
						(adminIds.length > 0 ? getLang("removed", adminIds.length, getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")) : "")
						+ (notAdminIds.length > 0 ? getLang("notAdmin", notAdminIds.length, notAdminIds.map(uid => `• ${uid}`).join("\n")) : "")
					);
				}
				else
					return message.reply(getLang("missingIdRemove"));
			}
			case "list":
			case "-l": {
				const getNames = await Promise.all(config.adminBot.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
				return message.reply(getLang("listAdmin", getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")));
			}
			default:
				return message.SyntaxError();
		}
	}
};
