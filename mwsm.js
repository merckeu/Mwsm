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
			'--disable-dev-shm-usage',
			'--disable-accelerated-2d-canvas',
			'--no-first-run',
			'--no-zygote',
			'--single-process',
			'--disable-gpu'
		]
	}
});

client.initialize();
io.on('connection', function(socket) {
	socket.emit('Reset', true);
	if ((OPTIONS.auth === 1 || OPTIONS.auth === "true")) {
		console.log('> Bot-Mwsm : Loading application', '100%');
		socket.emit('message', '> Bot-Mwsm : Connecting Application 100%');
		socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.authenticated);
		console.log('> Bot-Mwsm : ' + CONSOLE.authenticated);
		socket.emit('qr', RESOURCE.authenticated);
		socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.ready);
		console.log('> Bot-Mwsm : ' + CONSOLE.ready);
		socket.emit('qr', RESOURCE.ready);
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
	client.on('ready', function() {
		if ((OPTIONS.auth === 0 || OPTIONS.auth === "false")) {
			socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.ready);
			console.log('> Bot-Mwsm : ' + CONSOLE.ready);
			socket.emit('qr', RESOURCE.ready);
			db.run("UPDATE options SET auth=?", [true], (err) => {
				if (err) {
					console.log('> Bot-Mwsm : ' + err)
				}
				socket.emit('Reset', false);
			});
		}
	});

	client.on('authenticated', function() {
		if ((OPTIONS.auth === 0 || OPTIONS.auth === "false")) {
			socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.authenticated);
			console.log('> Bot-Mwsm : ' + CONSOLE.authenticated);
		}
	});

	client.on('auth_failure', function() {
		socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.auth_failure);
		console.log('> Bot-Mwsm : ' + CONSOLE.auth_failure);
		socket.emit('qr', RESOURCE.auth_failure);
		db.run("UPDATE options SET auth=?", [false], (err) => {
			if (err) {
				console.log('> Bot-Mwsm : ' + err)
			}
			socket.emit('Reset', true);
		});

	});

	client.on('disconnected', (reason) => {
		socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.disconnected);
		console.log('> Bot-Mwsm : ' + CONSOLE.disconnected);
		socket.emit('qr', RESOURCE.disconnected);
		db.run("UPDATE options SET auth=?", [false], (err) => {
			if (err) {
				console.log('> Bot-Mwsm : ' + err)
			}
			socket.emit('Reset', true);
		});
		delay(5000).then(async function() {
			client.initialize();
		});
	});

	client.on('loading_screen', (percent, message) => {
		if ((OPTIONS.auth === 0 || OPTIONS.auth === "false")) {
			socket.emit('Reset', true);
			console.log('> Bot-Mwsm : Loading application', percent + '%');
			socket.emit('message', '> Bot-Mwsm : Connecting Application ' + percent + '%');
			if (percent >= "100") {
				socket.emit('qr', RESOURCE.authenticated);
			} else {
				socket.emit('message', '> Bot-Mwsm : ' + CONSOLE.connection);
				console.log('> Bot-Mwsm : ' + CONSOLE.connection);
				socket.emit('qr', RESOURCE.connection);
			}
		}
	});


	socket.emit('interval', OPTIONS.interval);
	socket.emit('sendwait', OPTIONS.sendwait);
	socket.emit('response', OPTIONS.response);
	socket.emit('access', OPTIONS.access);
	socket.emit('port', OPTIONS.access);
	socket.emit('pixfail', OPTIONS.pixfail);
	socket.emit('replyes', OPTIONS.replyes);
	socket.emit('count', OPTIONS.count);
	socket.emit('onbot', OPTIONS.onbot);

	socket.emit('background', RESOURCE.background);
	socket.emit('pix', RESOURCE.about);
});

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

// Authenticated
app.post('/authenticated', (req, res) => {
	if ((link.prepare('SELECT * FROM options').get().auth == 1)) {
		res.json({
			Status: "Success"
		});

	} else {
		res.json({
			Status: "Fail"
		});
	}
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
	if (Response == "") {
		Response = OPTIONS.response;
	}
	if (Interval != "" && Sendwait != "" && Access != "" && Pixfail != "" && Count != "") {
		db.run("UPDATE options SET interval=?, sendwait=?, access=?, pixfail=?, response=?, replyes=?, onbot=?, count=?", [Interval, Sendwait, Access, Pixfail, Response, Replyes, Onbot, Count], (err) => {
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
			exec('pm2 restart Bot-Mwsm --update-env');
		});

	} else {
		res.json({
			Status: "Fail",
			Return: "Enter all Data"
		});

	}
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

	setTimeout(function() {
		Mensagem.some(function(Send, index) {
			const PIXFAIL = [undefined, "XXX", null, ""];
			setTimeout(function() {
				if (!PIXFAIL.includes(OPTIONS.pixfail) && Send == "CodigoIndisponivel") {
					Send = Send.replace("CodigoIndisponivel", OPTIONS.pixfail);
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
			}, index * OPTIONS.interval);
		});
	}, Delay + Math.floor(Math.random() * 1000));
});

client.on('message', async msg => {

	const nomeContato = msg._data.notifyName;
	let groupChat = await msg.getChat();

	if (msg.type.toLowerCase() == "e2e_notification") return null;
	if (msg.body == "") return null;
	if (msg.from.includes("@g.us")) return null;

	db.get("SELECT * FROM replies WHERE whats='" + msg.from.replaceAll('@c.us', '') + "'", (err, REPLIES) => {
		if (err) {
			console.log('> Bot-Mwsm : ' + err)
		}
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
	if (MsgBox && (OPTIONS.onbot === 1 || OPTIONS.onbot === "true") && msg.body !== null || msg.body === "0" || msg.type === 'ptt' || msg.hasMedia) {
		if ((OPTIONS.replyes === 1 || OPTIONS.replyes === "true")) {
			msg.reply(OPTIONS.response);
		} else {
			client.sendMessage(msg.from, OPTIONS.response);
		}
	}
});

console.log("\nAPI is Ready!\n");
const Port = process.env.PORT || OPTIONS.access;
server.listen(Port, function() {
	console.log('Server Running on Port *: ' + Port);
});
