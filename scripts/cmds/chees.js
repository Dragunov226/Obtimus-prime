module.exports = {
	config: {
		name: "chess",
		version: "1",
		author: "yeasin",
		countDown: 5,
		role: 0,
		shortDescription: "play chess board game",
		longDescription: "play chess board game",
		category: "game",
		guide: "{pn} start"
	},
	onStart: async function({
		api, event, threadsData, usersData, args
	}) {
		const jsChessEngine = require('js-chess-engine');
		const game = new jsChessEngine.Game();
		const {
			createCanvas,
			loadImage
		} = require('canvas');
		const fs = require('fs/promises'); // Using fs/promises for async functionality
		const fss = require('fs');
		const axios = require('axios');
		const url = require('url');
		const {
			resolve
		} = require('path');
		const path = require('path');
		const file_path_1 = resolve(__dirname,
			"cache",
			`canvas-image-chess-${event.threadID}.png`);
		const file_path_4 = resolve(__dirname,
			"cache",
			"canvas-image-chess.txt");

		function countSlashes(str) {
			// Count the number of occurrences of '/' in the string
			return str.split('/').length;
		}

		async function checkPathExists(filePath) {
			try {
				await fss.promises.access(filePath,
					fss.constants.F_OK);
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		}

		async function downloadAndCacheImage(imageUrl) {
			if (imageUrl) {
				const filename = path.basename(imageUrl);				
				const filePath = path.join(__dirname, 'cache', filename);

				try {
					await fs.access(filePath, fss.constants.F_OK); // Check
					return; // Skip
				} catch (error) {
					console.log(`${filename} not found in cache, downloading...`);
				}

				try {
					const response = await axios.get(imageUrl, {
						responseType: 'arraybuffer'
					});
					await fs.writeFile(filePath, response.data);
					console.log(`${filename} downloaded and saved to cache.`);
				} catch (error) {
					console.error(`Error downloading ${filename}:`, error);
				}
			}
		}

		async function convertToChessSymbol(char) {
			let imageSrc;
			let imageData;
			let imageUrl;
			if (char.trim() === 'P') {
			    //console.log(`${char} white-pawn.png`);
				imageSrc = path.join(__dirname,
					"cache",
					'white-pawn.png');
				imageUrl = 'https://i.ibb.co/jL4Lkr0/white-pawn.png';
				await downloadAndCacheImage(imageUrl);

			} else if (char.trim() === 'N') {
			    //console.log(`${char} white-knight.png`);
				imageSrc = path.join(__dirname,
					"cache",
					'white-knight.png');
				imageUrl = 'https://i.ibb.co/6ZZpsM9/white-knight.png';
				await downloadAndCacheImage(imageUrl);
			} else if (char.trim() === 'B') {
			    //console.log(`${char} white-bishop.png`);
				imageSrc = path.join(__dirname,
					"cache",
					'white-bishop.png');
				imageUrl = 'https://i.ibb.co/ScDjFmN/white-bishop.png';
				await downloadAndCacheImage(imageUrl);
			} else if (char.trim() === 'R') {
			    //console.log(`${char} white-rook.png`);
				imageSrc = path.join(__dirname,
					"cache",
					'white-rook.png');
				imageUrl = 'https://i.ibb.co/TYzLyKC/white-rook.png';
				await downloadAndCacheImage(imageUrl);
			} else if (char.trim() === 'Q') {
			    //console.log(`${char} white-queen.png`);
				imageSrc = path.join(__dirname,
					"cache",
					'white-queen.png');
				imageUrl = 'https://i.ibb.co/xYTsJZT/white-queen.png';
				await downloadAndCacheImage(imageUrl);
			} else if (char.trim() === 'K') {
			    //console.log(`${char} white-king.png`);
				imageSrc = path.join(__dirname,
					"cache",
					'white-king.png');
				imageUrl = 'https://i.ibb.co/VDScm63/white-king.png';
				await downloadAndCacheImage(imageUrl);
			} else if (char.trim() === 'p') {
			    //console.log(`${char} black-pawn.png`);
				imageSrc = path.join(__dirname,
					"cache",
					'black-pawn.png');
				imageUrl = 'https://i.ibb.co/kgzWHsL/black-pawn.png';
				await downloadAndCacheImage(imageUrl);
			} else if (char.trim() === 'n') {
			    //console.log(`${char} black-knight.png`);
				imageSrc = path.join(__dirname,
					"cache",
					'black-knight.png');
				imageUrl = 'https://i.ibb.co/6WThmz7/black-knight.png';
				await downloadAndCacheImage(imageUrl);
			} else if (char.trim() === 'b') {
                //console.log(`${char} black-bishop.png`);
				imageSrc = path.join(__dirname,
					"cache",
					'black-bishop.png');
				imageUrl = 'https://i.ibb.co/7XrZR8X/black-bishop.png';
				await downloadAndCacheImage(imageUrl);
			} else if (char.trim() === 'r') {
			    //console.log(`${char} black-rook.png`);
				imageSrc = path.join(__dirname,
					"cache",
					'black-rook.png');
				imageUrl = 'https://i.ibb.co/6PqSjy4/black-rook.png';
				await downloadAndCacheImage(imageUrl);
			} else if (char.trim() === 'q') {
			    //console.log(`${char} black-queen.png`);
				imageSrc = path.join(__dirname,
					"cache",
					'black-queen.png');
				imageUrl = 'https://i.ibb.co/r7S5psv/black-queen.png';
				await downloadAndCacheImage(imageUrl);
			} else if (char.trim() === 'k') {
			    //console.log(`${char} black-king.png`);
				imageSrc = path.join(__dirname,
					"cache",
					'black-king.png');
				imageUrl = 'https://i.ibb.co/ysTc60G/black-king.png';
				await downloadAndCacheImage(imageUrl);
			}
			imageData = await fs.readFile(imageSrc);
			return imageData;
		}

		function isUpperCase(char) {
			// Check if the character code is between A-Z (uppercase)
			return char >= 'A' && char <= 'Z';
		}

		function isLowerCase(char) {
			// Check if the character code is between a-z (lowercase)
			return char >= 'a' && char <= 'z';
		}


		async function writeJsonFile(path, data, txt) {
			try {
				const jsonDataFile = JSON.stringify(data,
					null,
					2);
				await fs.writeFile(path,
					jsonDataFile,
					'utf-8');

			} catch (error) {
				console.log(error);
			}
		}
		async function directory_create(directory) {
			if (!fss.existsSync(directory)) {
				// If it doesn't exist, create the directory
				fss.mkdirSync(directory, {
					recursive: true
				}, (err) => {
					if (err) {
						console.error('Error creating directory:', err);
					} else {
						console.log('Directory created successfully');
					}
				});
			}
		}
		directory_create(resolve(__dirname, "cache"));

		checkPathExists(file_path_4)
		.then((exists) => {
			if (!exists) {
				let groupTID = []
				writeJsonFile(file_path_4, groupTID);
			}
		})

		async function chessboardImage(width, height, squareSize, filePath, ffn) {
			const canvas = createCanvas(width,
				height);
			const ctx = canvas.getContext('2d');
			const cellSize = squareSize;
			// Fill background with white
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0,
				0,
				width,
				height);
			const numSlashes = countSlashes(ffn);
			let x = 0;
			let y = 0;
			let label = 'A';
			for (let i = 0; i < numSlashes; i++) {
				const part_ffn = ffn.split('/')[i];

				for (const char of part_ffn) {
				    //console.log(char);
					if (isUpperCase(char)) {
						const symbol = await convertToChessSymbol(char);
						const usemages = await loadImage(symbol);
						const imageWidth = usemages.width;
						const imageHeight = usemages.height;
						const scaleFactor = Math.min(cellSize / imageWidth, cellSize / imageHeight);
						const scaledImageWidth = imageWidth * scaleFactor;
						const scaledImageHeight = imageHeight * scaleFactor;
						const isBlackSquare = (x + y) % (squareSize * 2) === 0;
						ctx.fillStyle = isBlackSquare ? '#594d2a': '#ffffff';
						ctx.fillRect(x, y, squareSize, squareSize);
						ctx.drawImage(usemages,
							x + (cellSize - scaledImageWidth) / 2,
							y + (cellSize - scaledImageHeight) / 2,
							scaledImageWidth,
							scaledImageHeight);
						x += squareSize;
						if (x >= width) {
							x = 0;
							y += squareSize;
						}
					} else if (isLowerCase(char)) {
						const symbol = await convertToChessSymbol(char);
						const usemages = await loadImage(symbol);
						const imageWidth = usemages.width;
						const imageHeight = usemages.height;
						const scaleFactor = Math.min(cellSize / imageWidth, cellSize / imageHeight);
						const scaledImageWidth = imageWidth * scaleFactor;
						const scaledImageHeight = imageHeight * scaleFactor;
						const isBlackSquare = (x + y) % (squareSize * 2) === 0;
						ctx.fillStyle = isBlackSquare ? '#594d2a': '#ffffff';
						ctx.fillRect(x, y, squareSize, squareSize);
						ctx.drawImage(usemages,
							x + (cellSize - scaledImageWidth) / 2,
							y + (cellSize - scaledImageHeight) / 2,
							scaledImageWidth,
							scaledImageHeight);
						x += squareSize;
						if (x >= width) {
							x = 0;
							y += squareSize;
						}
					} else {
						//console.log(`${char} is not an alphanumeric character.`);
						for (let v = 0; v < parseInt(char); v++) {
							const isBlackSquare = (x + y) % (squareSize * 2) === 0;
							ctx.fillStyle = isBlackSquare ? '#594d2a': '#ffffff';
							ctx.fillRect(x, y, squareSize, squareSize);
							x += squareSize;
							if (x >= width) {
								x = 0;
								y += squareSize;
							}
						}
					}
				}
			}
			for (let col = 0; col < 8; col++) {
				// Iterate through 8 columns (0 to 7)
				const x = col * squareSize; // Calculate x-coordinate based on column index
				ctx.fillStyle = '#FF00FF';
				ctx.font = `${squareSize / 4}px Arial`;
				ctx.textAlign = 'right';
				ctx.textBaseline = 'top';
				ctx.fillText(String.fromCharCode(65 + col), x + squareSize, y - squareSize + 2);
			}
			for (let row = 8; row >= 0; row--) {
				// Iterate through 8 rows in reverse order (7 to 0)
				const y = row * squareSize; // Calculate y-coordinate based on row index
				ctx.fillStyle = '#FF00FF'; // Adjust color as needed
				ctx.font = `${squareSize / 4}px Arial`;
				ctx.textAlign = 'right';
				ctx.textBaseline = 'top';
				ctx.fillText(9 - row, x + squareSize / 5, y - squareSize + 2); // Adjust position for label
			}
			const buffer = canvas.toBuffer('image/png');
			await fs.writeFile(filePath, buffer);
		}

		async function processSmS(arg, msg, msgTID, data_file) {
			let groupPamission = JSON.parse(await fs.readFile(data_file,
				'utf8'));
			if (groupPamission.length === 0) {
				groupPamission.push({
					tid: msgTID, sms: msg
				});
				await fs.writeFile(data_file, JSON.stringify(groupPamission), 'utf8');
			} else {
				let index = groupPamission.findIndex(element => element.tid === msgTID);
				if (index !== -1) {
					if (arg === 'start') {
						groupPamission[index].sms = msg;
						await fs.writeFile(data_file, JSON.stringify(groupPamission), 'utf8');
					} else if (arg === 'stop') {
						groupPamission[index].sms = '';
						await fs.writeFile(data_file, JSON.stringify(groupPamission), 'utf8');
					}

				} else {
					groupPamission.push({
						tid: msgTID, sms: msg
					});
					await fs.writeFile(data_file, JSON.stringify(groupPamission), 'utf8');
				}
			}
		}


		if (args.length === 0 || undefined) {
			await processSmS('stop', '', event.threadID, file_path_4);
			api.sendMessage("worng Command", event.threadID);
		} else if (args.length === 1) {
			if (args[0].toLowerCase() === "start") {
				const game = new jsChessEngine.Game();
				const fullFFn = game.exportFEN();
				const ffn = fullFFn.split(' ')[0];
				await processSmS('start', fullFFn, event.threadID, file_path_4);
				chessboardImage(768, 768, 96, file_path_1, ffn)
				.then(() => {
					api.sendMessage({
						body: "Chess Board",
						attachment: fss.createReadStream(__dirname + `/cache/canvas-image-chess-${event.threadID}.png`)
					}, event.threadID, () => fss.unlinkSync(__dirname + `/cache/canvas-image-chess-${event.threadID}.png`));
				});
			}
		} else if (args.length === 2) {
			if (args[0].toLowerCase() === "mov" && args[1].includes("|")) {
				const arg = args[1].toUpperCase();
				//console.log(arg.split('|')[0]);
				//console.log(arg.split('|')[1]);
				const argForm = arg.split('|')[0];
				const argTo = arg.split('|')[1];
				let groupPamission = JSON.parse(await fs.readFile(file_path_4, 'utf8'));
				let index = groupPamission.findIndex(element => element.tid === event.threadID);
				if (index !== -1 && groupPamission[index].sms) {
					const game = new jsChessEngine.Game(groupPamission[index].sms);
					game.move(argForm, argTo);
					game.aiMove(3);
					const fullFFn = game.exportFEN();
					const ffn = fullFFn.split(' ')[0];
					await processSmS('start', fullFFn, event.threadID, file_path_4);
					chessboardImage(768, 768, 96, file_path_1, ffn)
					.then(() => {
						api.sendMessage({
							body: "Chess Board",
							attachment: fss.createReadStream(__dirname + `/cache/canvas-image-chess-${event.threadID}.png`)
						}, event.threadID, () => fss.unlinkSync(__dirname + `/cache/canvas-image-chess-${event.threadID}.png`));
					});
				}
			} else if (args[0].toLowerCase() === "mov" && !args[1].includes("|")) {
				const arg = args[1].toUpperCase();
				//console.log(arg.split('|')[0]);
				//console.log(arg.split('|')[1]);
				let groupPamission = JSON.parse(await fs.readFile(file_path_4, 'utf8'));
				let index = groupPamission.findIndex(element => element.tid === event.threadID);
				if (index !== -1 && groupPamission[index].sms) {
					const fullFFn = groupPamission[index].sms;
					const ffn = fullFFn.split(' ')[0];
					const game = new jsChessEngine.Game(groupPamission[index].sms);
					const probability = game.moves(arg);
					chessboardImage(768, 768, 96, file_path_1, ffn)
					.then(() => {
						api.sendMessage({
							body: `probability is => ${probability}`,
							attachment: fss.createReadStream(__dirname + `/cache/canvas-image-chess-${event.threadID}.png`)
						}, event.threadID, () => fss.unlinkSync(__dirname + `/cache/canvas-image-chess-${event.threadID}.png`));
					});
				}
			}
		}
	}
}
