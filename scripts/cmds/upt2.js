module.exports = {
  config: {
    name: "upt2",
    aliases: ["run"],
    version: "1.0",
    author: "Ilom",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "uptime"
    },
    longDescription: {
      vi: "",
      en: "Sends system uptime about the bot along with an image."
    },
    category: "system",
    guide: {
      en: "{pn}"
    },
    dependencies: {
		"pidusage": ""
		}
  },
  
  byte2mb: function (bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
  },
  
  onStart: async ({ api, event, args, usersData, threadsData }) => {
    
    const time = process.uptime(),
      hours = Math.floor(time / (60 * 60)),
      minutes = Math.floor((time % (60 * 60)) / 60),
      seconds = Math.floor(time % 60);
    var z_1 = (hours < 10) ? '0' + hours : hours;
    var x_1 = (minutes < 10) ? '0' + minutes : minutes;
    var y_1 = (seconds < 10) ? '0' + seconds : seconds;
    
    const timeNow = moment.tz("Asia/Kathmandu").format("DD/MM/YYYY || HH:mm:ss");
    if (!fs.existsSync(__dirname + `/tad/Grandstander-Bold.ttf`)) {
      let getfont2 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/Grandstander-Bold.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/Grandstander-Bold.ttf`, Buffer.from(getfont2, "utf-8"));
    }
    const { loadImage, createCanvas, registerFont } = require("canvas");

    let k = args[0];
    if (args[0] === "list") {
      const alime = (await axios.get('https://api-hthanh.thanhbaybi.repl.co/taoanhdep/list')).data;
      var count = alime.listAnime.length;
      var data = alime.listAnime;
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 20;
      var numPage = Math.ceil(count / limit);
      var msg = ``;
      for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
        if (i >= count) break;
        msg += `[ ${i + 1} ] - ${data[i].ID} | ${data[i].name}\      }
      msg += `hmmm?`;
      return api.sendMessage(msg, event.threadID, event.messageID);
    }
    if (!k) {
      var id = Math.floor(Math.random() * 848) + 1;
    } else {
      var id = k;
    }
    const lengthchar = (await axios.get('https://run.mocky.io/v3/0dcc2ccb-b5bd-45e7-ab57-5dbf9db17864')).data;
    console.log(lengthchar.length);
    const Canvas = require('canvas');
    let pathImg = __dirname + `/tad/avatar_115.png`;
    let pathAva = __dirname + `/tad/avatar_223.png`;
    let pathLine = __dirname + `/tad/avatar_343.png`;
    let pathIcon = __dirname + `/tad/avatar_3ds23c12311.png`;
    let pathIconIG = __dirname + `/tad/sssss.png`;
    let pathIcongithub = __dirname + `/tad/owo.png`;
    let icon3 = (await axios.get(encodeURI(`https://imgur.com/u8UU1cb.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathIcongithub, Buffer.from(icon3, "utf-8"));
    let icon = (await axios.get(encodeURI(`https://imgur.com/TEAVHvA.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathIcon, Buffer.from(icon, "utf-8"));
    let icon2 = (await axios.get(encodeURI(`https://imgur.com/pJnSU7m.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathIconIG, Buffer.from(icon2, "utf-8"));
    let avtAnime = (
      await axios.get(encodeURI(`${lengthchar[id].imgAnime}`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
    let background = (await axios.get(encodeURI(`https://imgur.com/1QncZxH.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    let line = (await axios.get(encodeURI(`https://imgur.com/1iWNkmi.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathLine, Buffer.from(line, "utf-8"));
          
    
    let a = await loadImage(pathAva);
    let a1 = await loadImage(pathImg);
    let a2 = await loadImage(pathLine);
    let g = await loadImage(pathIcon);
    let r = await loadImage(pathIconIG);
    let o = await loadImage(pathIcongithub);
    let canvas = createCanvas(a1.width, a1.height);
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = lengthchar[id].colorBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(a1, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(a2, 2000, 200, a2.width, a2.height);
    ctx.drawImage(g, 800, 2500, 350, 350);
    ctx.drawImage(o, 1100, 2800, 550, 550);
    ctx.drawImage(r, 1600, 3350, 350,
