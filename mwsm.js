//##########################################################
var ACCESS = 8000; //Porta de Acesso Padrao
//##########################################################

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
var Delay, Wait;
var MsgBox = false;
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
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('mwsm.db');
const register = new Date().getDate();
require('events').EventEmitter.defaultMaxListeners = Infinity;
const port = process.env.PORT || ACCESS;

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
			'--disable-dev-shm-usage',
			'--disable-accelerated-2d-canvas',
			'--no-first-run',
			'--no-zygote',
			'--single-process',
			'--disable-gpu'
		]
	}
});

var Status;
client.initialize();

io.on('connection', function(socket) {
	db.get("SELECT * FROM console", function(err, MySQL) {
		socket.emit('message', '> Bot-Mwsm : ' + MySQL.connection);
		//console.log('> Bot-Mwsm : ' + MySQL.connection);
	});

	db.get("SELECT * FROM resources", function(err, MySQL) {
		socket.emit('qr', MySQL.connection);
	});

	client.on('qr', (qr) => {
		qrcode.toDataURL(qr, (err, url) => {
			try {
				socket.emit('qr', url);
			} catch (err) {
				console.log('> Bot-Mwsm : ' + err);
			} finally {
				db.get("SELECT * FROM console", function(err, MySQL) {
					socket.emit('message', '> Bot-Mwsm : ' + MySQL.received);
					console.log('> Bot-Mwsm : ' + MySQL.received);
				});

			}
		});

	});

	client.on('loading_screen', (percent, message) => {
		console.log('> Bot-Mwsm : Loading application', percent + '%');
	});

	client.on('ready', () => {
		db.get("SELECT * FROM console", function(err, MySQL) {
			socket.emit('message', '> Bot-Mwsm : ' + MySQL.ready);
			console.log('> Bot-Mwsm : ' + MySQL.ready);
		});
		db.get("SELECT * FROM resources", function(err, MySQL) {
			socket.emit('qr', MySQL.ready);
		});

	});

	client.on('authenticated', () => {
		db.get("SELECT * FROM console", function(err, MySQL) {
			socket.emit('message', '> Bot-Mwsm : ' + MySQL.authenticated);
			console.log('> Bot-Mwsm : ' + MySQL.authenticated);
		});
		db.get("SELECT * FROM resources", function(err, MySQL) {
			socket.emit('qr', MySQL.authenticated);
		});

	});

	client.on('auth_failure', () => {
		db.get("SELECT * FROM console", function(err, MySQL) {
			socket.emit('message', '> Bot-Mwsm : ' + MySQL.auth_failure);
			console.log('> Bot-Mwsm : ' + MySQL.auth_failure);
		});
		db.get("SELECT * FROM resources", function(err, MySQL) {
			socket.emit('qr', MySQL.auth_failure);
		});

	});

	client.on('change_state', state => {
		Status = "change_state";
		console.log('> Bot-Mwsm : ' + state);
	});

	client.on('disconnected', (reason) => {
		db.get("SELECT * FROM console", function(err, MySQL) {
			socket.emit('message', '> Bot-Mwsm : ' + MySQL.disconnected);
			console.log('> Bot-Mwsm : ' + MySQL.disconnected);
		});
		db.get("SELECT * FROM resources", function(err, MySQL) {
			socket.emit('qr', MySQL.disconnected);
		});

		delay(5000).then(async function() {
			client.initialize();
		});
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

	db.get("SELECT * FROM options", function(err, MySQL) {
		if (err) throw err;
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
			Delay = MySQL.sendwait;
		}

		setTimeout(function() {
			Mensagem.some(function(Send, index) {
				setTimeout(function() {
					if (MySQL.pixfail != "XXX" && Send == "CodigoIndisponivel") {
						Send = Send.replace("CodigoIndisponivel", MySQL.pixfail);
					}
					client.sendMessage(WhatsApp, Send).then(response => {
						Wait = WhatsApp;
						res.status(200).json({
							status: true,
							message: 'Bot-Mwsm : Message Sent',
							response: response
						});
					}).catch(err => {
						return true;
						res.status(500).json({
							status: false,
							message: 'Bot-Mwsm : Message was not Sent',
							response: err.text
						});
					});
				}, index * MySQL.interval);
			});
		}, Delay + Math.floor(Math.random() * 1000));
	});


});

client.on('message', async msg => {

	const nomeContato = msg._data.notifyName;
	let groupChat = await msg.getChat();

	if (msg.type.toLowerCase() == "e2e_notification") return null;
	if (msg.body == "") return null;
	if (msg.from.includes("@g.us")) return null;

	db.serialize(() => {
		db.get("SELECT * FROM replies WHERE whats='" + msg.from.replaceAll('@c.us', '') + "'", function(err, REPLIES) {
			if (err) throw err;
			if (REPLIES == undefined) {
				db.run("INSERT INTO replies(whats,date,count) VALUES(?, ?, ?)", [msg.from.replaceAll('@c.us', ''), register, 1], (err) => {
					if (err) throw err;
					db.get("SELECT * FROM console", function(err, CONSOLE) {
						console.log('> Bot-Mwsm : ' + CONSOLE.inserted);
						MsgBox = true;
					});
				});
			} else {
				if (register.toString() > REPLIES.date) {
					db.run("UPDATE replies SET date=?, count=? WHERE whats=?", [register, 1, msg.from.replaceAll('@c.us', '')], (err) => {
						if (err) throw err;
						db.get("SELECT * FROM console", function(err, CONSOLE) {
							console.log('> Bot-Mwsm : ' + CONSOLE.updated);
							MsgBox = true;
						});
					});
				} else {
					db.get("SELECT * FROM options", function(err, OPTIONS) {
						if (OPTIONS.count > REPLIES.count) {
							COUNT = REPLIES.count + 1;
							db.run("UPDATE replies SET count=? WHERE whats=?", [COUNT, msg.from.replaceAll('@c.us', '')], (err) => {
								if (err) throw err;
								db.get("SELECT * FROM console", function(err, CONSOLE) {
									console.log('> Bot-Mwsm : ' + CONSOLE.updated);
									MsgBox = true;
								});
							});
						} else {
							db.get("SELECT * FROM console", function(err, CONSOLE) {
								console.log('> Bot-Mwsm : ' + CONSOLE.found);
								MsgBox = false;
							});

						}
					});
				}
			}
		});
		db.get("SELECT * FROM options", function(err, OPTIONS) {
			if (err) throw err;
			if (MsgBox && OPTIONS.response != "" && msg.body !== null || msg.body === "0" || msg.type === 'ptt' || msg.hasMedia) {
				if (OPTIONS.replyes) {
					msg.reply(OPTIONS.response);
				} else {
					client.sendMessage(msg.from, OPTIONS.response);
				}
			}

		});

	});

});

console.log("\nAPI is Ready!\n");

server.listen(port, function() {
	console.log('Server Running on Port *: ' + port);
});