const axios = require('axios');

module.exports = {
	config: {
		name: "milf2",
		aliases: ["m2"],
		version: "1.0",
		author: "Mahir Tahsan",
		countDown: 5,
		role: 0,
		shortDescription: "get random milf image",
		longDescription: "",
		category: "anime",
		guide: "{pn} {{<name>}}"
	},

	onStart: async function ({ message, args }) {
		const name = args.join(" ");
		if (!name)

			try {
				let res = await axios.get(`https://www.nguyenmanh.name.vn/api/nsfw/ass?apikey=krwWfbvh`)


				let res2 = res.data
				let img = res2.url

				const form = {
					body: ` `

				};
				if (img)
					form.attachment = await global.utils.getStreamFromURL(img);
				message.reply(form);
			} catch (e) {
				message.reply(`🥺 ইরোর`)
			}


	}
};
