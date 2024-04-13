const {
	Client,
	LocalAuth,
	MessageMedia
} = require('whatsapp-web.js');
const express = require('express');
const {
	body,
	validationResult
} = require('express-validator');
var Delay, Wait, Permission = false,
	MsgBox = false,
	Session = false;
const wwebVersion = '2.2403.2-beta';
const socketIO = require('socket.io');
const qrcode = require('qrcode');
const http = require('http');
const fileUpload = require('express-fileupload');
const axios = require('axios');
const mime = require('mime-types');
const app = express();
const os = require("os");
const hostName = os.hostname();
const server = http.createServer(app);
const io = socketIO(server);
const sys = require('util');
const exec = require('child_process').exec;
const link = require('better-sqlite3')('mwsm.db');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mwsm.db');
const register = new Date().getDate();
require('events').EventEmitter.defaultMaxListeners = Infinity;
const CONSOLE = link.prepare('SELECT * FROM console').get();
const RESOURCE = link.prepare('SELECT * FROM resources').get();
const OPTIONS = link.prepare('SELECT * FROM options').get();
const crypto = require('crypto');
const Keygen = (length = 7, characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') => Array.from(crypto.randomFillSync(new Uint32Array(length))).map((x) => characters[x % characters.length]).join('');
var Password = [OPTIONS.token, Keygen()];
global.io = io;

function delay(t, v) {
	return new Promise(function(resolve) {
		setTimeout(resolve.bind(null, v), t)
	});
}

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.use("/", express.static(__dirname + "/"))

app.get('/', (req, res) => {
	res.sendFile('index.html', {
		root: __dirname
	});
});

const client = new Client({
	authStrategy: new LocalAuth({
		clientId: 'Bot-Mwsm'
	}),

	puppeteer: {
		headless: true,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-extensions',
			'--disable-dev-shm-usage',
			'--disable-accelerated-2d-canvas',
			'--no-first-run',
			'--no-zygote',
			'--single-process',
			'--disable-gpu'
		]
	},
	webVersionCache: {
		type: 'remote',
		remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
	},
});

io.on('connection', function(socket) {
	socket.emit('Reset', true);
	if (Session || (OPTIONS.auth == 1 || OPTIONS.auth == "true")) {
		console.log('> Bot-Mwsm : ' + CONSOLE.authenticated);
		console.log('> Bot-Mwsm : ' + CONSOLE.ready);
		socket.emit('qr', RESOURCE.authenticated);
		socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.authenticated);
		socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.ready);
		socket.emit('qr', RESOURCE.ready);
		Session = true;
	} else {
		socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.connection);
		console.log('> Bot-Mwsm : ' + CONSOLE.connection);
		socket.emit('qr', RESOURCE.connection);
	}

	client.on('qr', (qr) => {
		qrcode.toDataURL(qr, (err, url) => {
			try {
				socket.emit('qr', url);
			} catch (err) {
				console.log('> Bot-Mwsm : ' + err);
				socket.emit('message', '> Bot-Mwsm : ' + err);
			} finally {
				socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.received);
				console.log('> Bot-Mwsm : ' + CONSOLE.received);
			}
		});
	});

	client.on('ready', async () => {
		if ((OPTIONS.auth == 0 || OPTIONS.auth == "false")) {
			db.run("UPDATE options SET auth=?", [true], (err) => {
				if (err) {
					console.log('> Bot-Mwsm : ' + err)
				}
			});
		}
		socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.ready);
		console.log('> Bot-Mwsm : ' + CONSOLE.ready);
		socket.emit('qr', RESOURCE.ready);
		Session = true;
		if (!Permission) {
			Permission = true;
			socket.emit('Reset', false);
			client.sendMessage(client.info.wid["_serialized"], "*Mwsm Token:*\n" + Password[1]);
		}
	});

	client.on('authenticated', (data) => {
		socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.authenticated);
		console.log('> Bot-Mwsm : ' + CONSOLE.authenticated);
		socket.emit('qr', RESOURCE.authenticated);
	});


	client.on('auth_failure', () => {
		socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.auth_failure);
		console.log('> Bot-Mwsm : ' + CONSOLE.auth_failure);
		socket.emit('qr', RESOURCE.auth_failure);
		db.run("UPDATE options SET auth=?", [false], (err) => {
			if (err) {
				console.log('> Bot-Mwsm : ' + err)
			}
			socket.emit('Reset', true);
			Session = false;
		});

	});


	client.on('disconnected', (reason) => {
		socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.disconnected);
		console.log('> Bot-Mwsm : ' + CONSOLE.disconnected);
		socket.emit('qr', RESOURCE.disconnected);
		db.run("UPDATE options SET auth=?, token=?", [false, null], (err) => {
			if (err) {
				console.log('> Bot-Mwsm : ' + err)
			}
			socket.emit('Reset', true);
			Session = false;
		});
		delay(3000).then(async function() {
			try {
				await client.destroy();
			} catch (err) {
				console.log('> Bot-Mwsm : ' + err);
				socket.emit('message', '> Bot-Mwsm : ' + err);
			} finally {
				socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.connection);
				console.log('> Bot-Mwsm : ' + CONSOLE.connection);
				socket.emit('qr', RESOURCE.connection);
				socket.emit('Reset', true);
				delay(2000).then(async function() {
					exec('pm2 restart Bot-Mwsm --update-env');
				});
			}
		});
	});


	client.on('loading_screen', (percent, message) => {
		console.log('> Bot-Mwsm : Loading application', percent + '%');
		socket.emit('message', '> Bot-Mwsm : Connecting Application ' + percent + '%');
		if (percent >= "100") {
			socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.authenticated);
			console.log('> Bot-Mwsm : ' + CONSOLE.authenticated);
			socket.emit('qr', RESOURCE.authenticated);
		} else {
			socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.connection);
			console.log('> Bot-Mwsm : ' + CONSOLE.connection);
			socket.emit('qr', RESOURCE.connection);
			socket.emit('Reset', true);

		}

	});

	global.io.emit('background', RESOURCE.background);
	global.io.emit('pix', RESOURCE.about);

	delay(2000).then(async function() {
		if (Session && Permission) {
			await socket.emit('Reset', false);
		}
	});
});

client.initialize();

// Reset
app.post('/reset', (req, res) => {
	db.run("UPDATE options SET auth=?", [false], (err) => {
		if (err) {
			console.log('> Bot-Mwsm : ' + err)
		}
		global.io.emit('qr', RESOURCE.connection);
	});
	const Reset = req.body.reset;
	if (Reset == "true") {
		res.json({
			Status: "Success"
		});
		exec('pm2 restart Bot-Mwsm --update-env');
	}
});

// Shutdown
app.post('/shutdown', (req, res) => {
	const Shutdown = req.body.shutdown;
	const Token = req.body.token;
	if (Shutdown == "true" && [link.prepare('SELECT * FROM options').get().token, Password[1]].includes(Token)) {
		res.json({
			Status: "Success"
		});
		client.logout();
	} else {
		res.json({
			Status: "Fail",
			Return: CONSOLE.wrong
		});
	}
});


// Authenticated
app.post('/authenticated', (req, res) => {
	if ((OPTIONS.auth == 1 || OPTIONS.auth == "true")) {
		res.json({
			Status: "Success"
		});

	} else {
		res.json({
			Status: "Fail"
		});
	}
});

// Token
app.post('/token', (req, res) => {
	const Token = req.body.token;
	if ([link.prepare('SELECT * FROM options').get().token, Password[1]].includes(Token)) {
		global.io.emit('interval', OPTIONS.interval);
		global.io.emit('sendwait', OPTIONS.sendwait);
		global.io.emit('response', OPTIONS.response);
		global.io.emit('access', OPTIONS.access);
		global.io.emit('port', OPTIONS.access);
		global.io.emit('pixfail', OPTIONS.pixfail);
		global.io.emit('replyes', OPTIONS.replyes);
		global.io.emit('count', OPTIONS.count);
		global.io.emit('onbot', OPTIONS.onbot);
		global.io.emit('limiter', OPTIONS.limiter);
		res.json({
			Status: "Success",
			Return: CONSOLE.right
		});

	} else {
		res.json({
			Status: "Fail",
			Return: CONSOLE.wrong
		});
	}
});


// Get Data
app.post('/getdata', (req, res) => {
	db.get("SELECT * FROM options", (err, GET) => {
		if (err) {
			res.json({
				Status: "Fail"
			});
		} else {
			res.json({
				Status: "Success",
				interval: OPTIONS.interval,
				sendwait: OPTIONS.sendwait,
				response: OPTIONS.response,
				access: OPTIONS.access,
				port: OPTIONS.access,
				pixfail: OPTIONS.pixfail,
				replyes: OPTIONS.replyes,
				count: OPTIONS.count,
				onbot: OPTIONS.onbot,
				limiter: OPTIONS.limiter
			});

		}
	});
});

// Update SQLite
app.post('/sqlite-options', (req, res) => {
	const Interval = req.body.interval;
	const Sendwait = req.body.sendwait;
	const Access = req.body.access;
	const Pixfail = req.body.pixfail;
	var Response = req.body.response;
	const Replyes = req.body.replyes;
	const Onbot = req.body.onbot;
	const Count = req.body.count;
	const Token = req.body.token;
	const Limiter = req.body.limiter;
	if (Response == "") {
		Response = OPTIONS.response;
	}
	if ([link.prepare('SELECT * FROM options').get().token, Password[1]].includes(Token)) {
		if (Interval != "" && Sendwait != "" && Access != "" && Pixfail != "" && Count != "" && Limiter != "") {
			db.run("UPDATE options SET interval=?, sendwait=?, access=?, pixfail=?, response=?, replyes=?, onbot=?, count=?, limiter=?", [Interval, Sendwait, Access, Pixfail, Response, Replyes, Onbot, Count, Limiter], (err) => {
				if (err) {
					res.json({
						Status: "Fail",
						Return: "Failed to Insert Data"
					});
				}
				console.log('> Bot-Mwsm : ' + CONSOLE.settings);
				global.io.emit('message', '> Bot-Mwsm : ' + CONSOLE.settings);
				res.json({
					Status: "Success",
					Return: CONSOLE.settings,
					Port: Access
				});
				session = false;
				global.io.emit('Reset', true);
				exec('pm2 restart Bot-Mwsm --update-env');
			});

		} else {
			res.json({
				Status: "Fail",
				Return: "Enter all Data"
			});
		}

	} else {
		res.json({
			Status: "Fail",
			Return: "Incorrect Credentials"
		});
	}

});



// Force message
app.post('/force-message', [
	body('to').notEmpty(),
	body('msg').notEmpty(),
], async (req, res) => {
	const errors = validationResult(req).formatWith(({
		msg
	}) => {
		return msg;
	});

	if (!errors.isEmpty()) {
		return res.status(422).json({
			Status: "Fail",
			message: errors.mapped()
		});
	}
	const number = req.body.to;
	const numberDDI = number.substr(0, 2);
	const numberDDD = number.substr(2, 2);
	const numberUser = number.substr(-8, 8);
	const Mensagem = req.body.msg.replaceAll("\\n", "\r\n").split("##");
	var WhatsApp = number + "@c.us";

	if (numberDDI === "55" && parseInt(numberDDD) <= 30) {
		WhatsApp = "55" + numberDDD + "9" + numberUser + "@c.us";
	} else if (numberDDI === "55" && parseInt(numberDDD) > 30) {
		WhatsApp = "55" + numberDDD + numberUser + "@c.us";
	}

	Mensagem.some(function(Send, index) {
		const HOTKEY = ["http"];
		setTimeout(function() {
			if (Send.includes(HOTKEY)) {
				delay(0).then(async function() {
					let mimetype;
					const attachment = await axios.get(Send, {
						responseType: 'arraybuffer'
					}).then(response => {
						mimetype = response.headers['content-type'];
						return response.data.toString('base64');
					});
					const media = new MessageMedia(mimetype, attachment, 'Media');
					client.sendMessage(WhatsApp, media).then(response => {
						res.status(200).json({
							Status: "Success",
							message: 'Bot-Mwsm : Message Sent'
						});
					}).catch(err => {
						res.status(500).json({
							Status: "Fail",
							message: 'Bot-Mwsm : Message was not Sent'
						});
					});

				});
			} else {
				client.sendMessage(WhatsApp, Send).then(response => {
					Wait = WhatsApp;
					res.status(200).json({
						Status: "Success",
						message: 'Bot-Mwsm : Message Sent'
					});
				}).catch(err => {
					res.status(500).json({
						Status: "Fail",
						message: 'Bot-Mwsm : Message was not Sent'
					});
					return true;
				});
			}
		}, index * OPTIONS.interval);
	});
});


// Send message
app.post('/send-message', [
	body('to').notEmpty(),
	body('msg').notEmpty(),

], async (req, res) => {
	const errors = validationResult(req).formatWith(({
		msg
	}) => {
		return msg;
	});

	if (!errors.isEmpty()) {
		return res.status(422).json({
			status: false,
			message: errors.mapped()
		});
	}
	const number = req.body.to;
	const numberDDI = number.substr(0, 2);
	const numberDDD = number.substr(2, 2);
	const numberUser = number.substr(-8, 8);
	const Mensagem = req.body.msg.replaceAll("\\n", "\r\n").split("##");
	var WhatsApp = number + "@c.us";

	if (numberDDI === "55" && parseInt(numberDDD) <= 30) {
		WhatsApp = "55" + numberDDD + "9" + numberUser + "@c.us";
	} else if (numberDDI === "55" && parseInt(numberDDD) > 30) {
		WhatsApp = "55" + numberDDD + numberUser + "@c.us";
	}


	if (WhatsApp == Wait || Wait == undefined) {
		Delay = 300;
	} else {
		Delay = OPTIONS.sendwait;
	}

	if (OPTIONS.schedule <= OPTIONS.limiter) {
		setTimeout(function() {
			Mensagem.some(function(Send, index) {
				const PIXFAIL = [undefined, "XXX", null, ""];
				setTimeout(function() {
					if (!PIXFAIL.includes(OPTIONS.pixfail) && Send == "CodigoIndisponivel") {
						Send = Send.replace("CodigoIndisponivel", OPTIONS.pixfail);
					}
					const HOTKEY = ["http"];
					if (Send.includes(HOTKEY)) {
						delay(0).then(async function() {
							let mimetype;
							const attachment = await axios.get(Send, {
								responseType: 'arraybuffer'
							}).then(response => {
								mimetype = response.headers['content-type'];
								return response.data.toString('base64');
							});
							const media = new MessageMedia(mimetype, attachment, 'Media');
							client.sendMessage(WhatsApp, media).then(response => {
								res.status(200).json({
									Status: "Success",
									message: 'Bot-Mwsm : Message Sent'
								});
							}).catch(err => {
								res.status(500).json({
									Status: "Fail",
									message: 'Bot-Mwsm : Message was not Sent'
								});
							});

						});
					} else {
						client.sendMessage(WhatsApp, Send).then(response => {
							Wait = WhatsApp;
							res.status(200).json({
								Status: "Success",
								message: 'Bot-Mwsm : Message Sent'
							});
						}).catch(err => {
							res.status(500).json({
								Status: "Fail",
								message: 'Bot-Mwsm : Message was not Sent'
							});
							return true;
						});
					}
				}, index * OPTIONS.interval);
			});
		}, Math.floor(Delay + Math.random() * 1000));
	} else {
		console.log("Mensagem Agendada");
	}
});

client.on('message', async msg => {
	const nomeContato = msg._data.notifyName;
	let groupChat = await msg.getChat();

	if (msg.type.toLowerCase() == "e2e_notification") return null;
	if (msg.body == "") return null;
	if (msg.from.includes("@g.us")) return null;
	const NULLED = [undefined, "XXX", null, ""];

	if (msg.body.toUpperCase().includes("TOKEN") && NULLED.includes(link.prepare('SELECT * FROM options').get().token)) {
		if (msg.body.includes(":") && msg.body.replace(/[^a-z0-9]/gi, '').length == 12) {
			db.run("UPDATE options SET token=?", [msg.body.split(":")[1]], (err) => {
				if (err) throw err;
				console.log('> Bot-Mwsm : ' + CONSOLE.saved);
				global.io.emit('message', '> Bot-Mwsm : ' + CONSOLE.saved);
				msg.reply(CONSOLE.saved);
			});
		} else {
			console.log('> Bot-Mwsm : ' + CONSOLE.wrong);
			global.io.emit('message', '> Bot-Mwsm : ' + CONSOLE.wrong);
			msg.reply(CONSOLE.wrong);
		}
	} else {
		db.serialize(() => {
			db.get("SELECT * FROM replies WHERE whats='" + msg.from.replaceAll('@c.us', '') + "'", (err, REPLIES) => {
				if (REPLIES == undefined) {
					db.run("INSERT INTO replies(whats,date,count) VALUES(?, ?, ?)", [msg.from.replaceAll('@c.us', ''), register, 1], (err) => {
						if (err) {
							console.log('> Bot-Mwsm : ' + err)
						}
						console.log('> Bot-Mwsm : ' + CONSOLE.inserted);
						global.io.emit('message', '> Bot-Mwsm : ' + CONSOLE.inserted);
						MsgBox = true;
					});

				} else {

					if (register.toString() > REPLIES.date) {
						db.run("UPDATE replies SET date=?, count=? WHERE whats=?", [register, 1, msg.from.replaceAll('@c.us', '')], (err) => {
							if (err) {
								console.log('> Bot-Mwsm : ' + err)
							}
							console.log('> Bot-Mwsm : ' + CONSOLE.updated);
							global.io.emit('message', '> Bot-Mwsm : ' + CONSOLE.updated);
							MsgBox = true;
						});
					} else {
						if (OPTIONS.count > REPLIES.count) {
							COUNT = REPLIES.count + 1;
							db.run("UPDATE replies SET count=? WHERE whats=?", [COUNT, msg.from.replaceAll('@c.us', '')], (err) => {
								if (err) throw err;
								console.log('> Bot-Mwsm : ' + CONSOLE.updated);
								global.io.emit('message', '> Bot-Mwsm : ' + CONSOLE.updated);
								MsgBox = true;
							});
						} else {
							console.log('> Bot-Mwsm : ' + CONSOLE.found);
							global.io.emit('message', '> Bot-Mwsm : ' + CONSOLE.found);
							MsgBox = false;

						}
					}
				}
			});

			db.get("SELECT * FROM replies WHERE whats='" + msg.from.replaceAll('@c.us', '') + "'", (err, REPLIES) => {
				if (err) {
					console.log('> Bot-Mwsm : ' + err)
				}
				if (REPLIES != undefined) {
					if (MsgBox && (OPTIONS.onbot == 1 || OPTIONS.onbot == "true") && msg.body != null || msg.body == "0" || msg.type == 'ptt' || msg.hasMedia) {
						if ((OPTIONS.replyes == 1 || OPTIONS.replyes == "true")) {
							msg.reply(OPTIONS.response);
						} else {
							client.sendMessage(msg.from, OPTIONS.response);
						}
					}
				}
			});

		});
	}

});

console.log("\nAPI is Ready!\n");
const Port = process.env.PORT || OPTIONS.access;
server.listen(Port, function() {
	console.log('Server Running on Port *: ' + Port);
});