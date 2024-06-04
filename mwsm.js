//******************************************************************
// MkAuth WhatsApp Send Message
//******************************************************************
const {
	Client,
	LocalAuth,
	Buttons,
	List,
	MessageMedia
} = require('whatsapp-web.js');
const express = require('express');
const {
	body,
	validationResult
} = require('express-validator');
var Delay, Wait, Reboot, Sending, Permission = false,
	MsgBox = false,
	Session = false;
const socketIO = require('socket.io');
const qrcode = require('qrcode');
const http = require('http');
const https = require('https');
const fileUpload = require('express-fileupload');
const axios = require('axios');
const mime = require('mime-types');
const app = express();
const os = require("os");
const hostName = os.hostname();
const server = http.createServer(app);
const io = socketIO(server);
const sys = require('util');
const fs = require("fs");
const ip = require('ip');
const Url2PDF = require("Url2PDF");
const cron = require('node-cron');
const htmlPDF = new Url2PDF();
const WServer = "https://raw.githubusercontent.com/MKCodec/Mwsm/main/version.json";
const exec = require('child_process').exec;
const link = require('better-sqlite3')('mwsm.db');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mwsm.db');
const register = new Date().getDate();
const Package = require('./package.json');
require('events').EventEmitter.defaultMaxListeners = Infinity;
const crypto = require('crypto');
const Keygen = (length = 7, characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') => Array.from(crypto.randomFillSync(new Uint32Array(length))).map((x) => characters[x % characters.length]).join('');
var Password = [Debug('OPTIONS').token, Keygen()];
process.env.LANG = "pt-BR.utf8";
global.io = io;

//Delay
function delay(t, v) {
	return new Promise(function(resolve) {
		setTimeout(resolve.bind(null, v), t)
	});
}

//Search DataBase
function Debug(Select, Search = '*', Mode = 'single') {
	switch (Mode.toLowerCase()) {
		case "single":
			Select = link.prepare('SELECT ' + Search.toLowerCase() + ' FROM ' + Select.toLowerCase() + ' ORDER BY ID DESC').get();
			break;
		case "multiple":
			Select = link.prepare('SELECT ' + Search.toLowerCase() + ' FROM ' + Select.toLowerCase()).pluck().all();
			break;
		case "all":
			Select = link.prepare('SELECT ' + Search.toLowerCase() + ' FROM ' + Select.toLowerCase() + ' ORDER BY ID DESC').all();
			break;
	}
	return Select;
}

//Insert DataBase
const Insert = async (Table, Column, Value, Update = false) => {
	if (Update) {
		const isInsert = await link.prepare('UPDATE ' + Table.toLowerCase() + ' SET ' + Column.toLowerCase() + ' = ? WHERE id = ?').run(Value, '1');
		if (isInsert) {
			return true;
		} else {
			return false;
		}
	} else {
		const isInsert = await link.prepare('INSERT INTO ' + Table.toLowerCase() + ' (' + Column.toLowerCase() + ') VALUES (?)').run(Value);
		if (isInsert) {
			return link.prepare('SELECT * FROM ' + Table.toLowerCase() + ' ORDER BY ID DESC').get().id;
		} else {
			return false;
		}

	}
}

//ForEach Async Mode
Array.prototype.someAsync = function(callbackfn) {
	return new Promise(async (resolve, reject) => {
		await Promise.all(this.map(async item => {
			if (await callbackfn(item)) resolve(true)
		})).catch(reject)
		resolve(false)
	})
}


function wget(url, dest) {
	return new Promise((res) => {
		https.get(url, (response) => {
			if (response.statusCode == 302) {
				wget(String(response.headers.location), dest);
			} else {
				const file = fs.createWriteStream(dest);
				response.pipe(file);
				file.on("finish", function() {
					file.close();
					res();
				});
			}
		});
	});
}

const GetUpdate = async (GET, SET = true) => {
	var Status;
	const Upgrade = async (GET) => {
		const Update = await fetch(GET).then(response => {
			return response.json();
		}).catch(err => {
			return {
				version: [{
					release: '0.0.0',
					patch: '0000-00-00 00:00:00'
				}]
			}
		});
		return Update;
	};
	isUpdate = await Upgrade(GET);
	var Conclusion = true;
	(isUpdate.version).someAsync(async (Return) => {
		if ((Return.release == Package.version)) {
			var isDateTime = Debug('RELEASE').mwsm;
			if (isDateTime == "undefined" || isDateTime == null) {
				isDateTime = "0000-00-00 00:00:00";
			}
			for (let i = 0; i < (isUpdate.version).length; i++) {
				if ((isUpdate.version)[i].patch > Return.patch) {
					if (((isUpdate.version)[i].patch) > (isDateTime)) {
						await global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').isfound);
						console.log('> Bot-Mwsm : ' + Debug('CONSOLE').isfound);
						if (SET && (Debug('RELEASE').isupdate == 1 || Debug('RELEASE').isupdate == "true")) {
							const Register = await Insert('OPTIONS', 'PATCH', ((isUpdate.version)[i].patch), true);
							if (Register) {
								console.log('> Bot-Mwsm : ' + Debug('CONSOLE').isupfiles);
								await wget("https://raw.githubusercontent.com/MKCodec/Mwsm/main/script.js", "/var/api/Mwsm/script.js");
								await wget("https://raw.githubusercontent.com/MKCodec/Mwsm/main/style.css", "/var/api/Mwsm/style.css");
								await wget("https://raw.githubusercontent.com/MKCodec/Mwsm/main/index.html", "/var/api/Mwsm/index.html");
								await wget("https://raw.githubusercontent.com/MKCodec/Mwsm/main/mwsm.js", "/var/api/Mwsm/mwsm.js");
								console.log('> Bot-Mwsm : ' + 'API Updated Successfully!');
								await global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').isupdated);
								await global.io.emit('upgrade', true);
								await global.io.emit('update', true);
							} else {
								await global.io.emit('upgrade', true);
							}
							Status = true;
						}
					} else if (Conclusion && i == (isUpdate.version).length) {
						Conclusion = false;
						if (!SET) {
							await global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').isalready);
							console.log('> Bot-Mwsm : ' + Debug('CONSOLE').isalready);
						}
						await global.io.emit('upgrade', true);
						Status = false;
					}
				} else if (Return.release != '0.0.0' && Conclusion) {
					Conclusion = false;
					await global.io.emit('upgrade', false);
					if (!SET) {
						await global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').isneeds);
						console.log('> Bot-Mwsm : ' + Debug('CONSOLE').isneeds);
					}
				}
			}
		} else if (Return.release != '0.0.0' && Conclusion) {
			Conclusion = false;
			await global.io.emit('upgrade', false);
			if (!SET) {
				await global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').isneeds);
				console.log('> Bot-Mwsm : ' + Debug('CONSOLE').isneeds);
			}
		}
	});
	return Status;
}

cron.schedule('*/2 00-05 * * *', async () => {
	await GetUpdate(WServer);
}, {
	scheduled: true,
	timezone: "America/Sao_Paulo"
});

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

//Set Debugger
function Terminal(Value) {
	if ((Debug('OPTIONS').debugger == 1 || Debug('OPTIONS').debugger == "true")) {
		console.error(Value);
	}
}

app.use("/", express.static(__dirname + "/"))

app.get('/', (req, res) => {
	res.sendFile('index.html', {
		root: __dirname
	});
});


//Get Date
function AddZero(num) {
	return (num >= 0 && num < 10) ? "0" + num : num + "";
}

function DateTime() {
	isDate = new Date();
	UTC = isDate.getTime() + (isDate.getTimezoneOffset() * 60000);
	now = new Date(UTC + (3600000 * -3));
	var strDateTime = [
		[now.getFullYear(), AddZero(now.getMonth() + 1), AddZero(now.getDate())].join("-"), [AddZero(now.getHours()), AddZero(now.getMinutes()), AddZero(now.getSeconds())].join(":")
	].join(" ");
	return strDateTime;
};

//Search MkAUth API
const MkAuth = async (UID, FIND, EXT = 'titulos', TYPE = 'titulo', MODE = true) => {
	var SEARCH, LIST, STATUS, PUSH = [],
		Json = undefined;
	const Authentication = await axios.get('https://' + Debug('MKAUTH').tunel + '/api/', {
		auth: {
			username: Debug('MKAUTH').client_id,
			password: Debug('MKAUTH').client_secret
		}
	}).then(response => {
		return response.data;
	}).catch(err => {
		return false;
	});
	if (Authentication) {
		const MkSync = await axios.get('https://' + Debug('MKAUTH').tunel + '/api/' + TYPE + '/' + EXT + '/' + UID, {
			headers: {
				'Authorization': 'Bearer ' + Authentication
			}
		}).then(response => {
			return response.data;
		}).catch(err => {
			return false;
		});
		if (MkSync.mensagem == undefined) {
			if (MODE) {
				SEARCH = MkSync.titulos;
			} else {
				SEARCH = MkSync;
			}
			(SEARCH).some(function(Send, index) {
				if (EXT == 'titulos') {
					if ((Send.titulo == FIND.replace(/^0+/, '') || parseInt(Send.titulo) == parseInt(FIND)) || Send.linhadig == FIND) {
						var Bolix = '';
						if (Send.linhadig == undefined || Send.linhadig == null) {
							Send.linhadig = '';
							Json_Bar = "false";
						} else {
							Bolix = "http://" + Debug('MKAUTH').domain + "/boleto/boleto.hhvm?titulo=" + Send.uuid;
							Json_Bar = "true";
						}
						if (Send.pix == undefined || Send.pix == null) {
							Send.pix = '';
							Json_Pix = "false";
						} else {

							Json_Pix = "true";
						}
						if (Send.pix_qr == undefined || Send.pix_qr == null) {
							Send.pix_qr = 'base64,';
							Json_QR = "false";
						} else {

							Json_QR = "true";
						}

						if (Send.pix_link == undefined || Send.pix_link == null) {
							Send.pix_link = '';
							Json_Link = "false";
						} else {
							Json_Link = "true";
						}
						var SEND = [];
						if ((Debug('MKAUTH').bar == 1 || Debug('MKAUTH').bar == "true")) {
							SEND.push(Send.linhadig);
						}

						if ((Debug('MKAUTH').pix == 1 || Debug('MKAUTH').pix == "true")) {
							SEND.push(Send.pix);
						}

						if ((Debug('MKAUTH').qrpix == 1 || Debug('MKAUTH').qrpix == "true")) {
							SEND.push(Send.pix_qr);
						}

						if ((Debug('MKAUTH').qrlink == 1 || Debug('MKAUTH').qrlink == "true")) {
							SEND.push(Send.pix_link);
						}

						if ((Debug('MKAUTH').pdf == 1 || Debug('MKAUTH').pdf == "true")) {
							SEND.push(Send.uuid);
						}
						if (SEND.length >= 1) {
							if (SEND.some(Row => Row == '')) {
								STATUS = "Null";
							} else {
								STATUS = Send.status;
							}
							Json = {
								"Status": STATUS,
								"ID": Send.titulo,
								"Payments": [{
										"value": Send.linhadig,
										"caption": "Bar",
										"status": Json_Bar
									},
									{
										"value": Send.pix,
										"caption": "Pix",
										"status": Json_Pix
									},
									{
										"value": Send.pix_qr.split("base64,")[1],
										"caption": "QRCode",
										"status": Json_QR
									},
									{
										"value": Send.pix_link,
										"caption": "Link",
										"status": Json_Link
									},
									{
										"value": Bolix,
										"caption": "Boleto",
										"status": Json_Bar
									}
								]
							};
						}
					}
				}

				if (EXT == 'listagem') {
					LIST = [FIND];
					if (FIND == 'all') {
						LIST = [Send.status];
					}
					if (parseInt(UID) <= 9 && parseInt(UID.length) == 1) {
						UID = "0" + UID;
					}
					if ((Send.datavenc).includes(new Date().getFullYear() + "-" + UID + "-") && LIST.some(Row => Send.status.includes(Row)) && Send.cli_ativado == 's') {
						Json = {
							"Identifier": Send.titulo,
							"Client": Send.nome,
							"Reward": Send.datavenc,
							"Payment": Send.status,
							"Connect": Send.login
						};
						PUSH.push(Json);
						Json = PUSH;
					}
				}
			});
			if (EXT == 'titulos') {
				if (Json == undefined) {
					Json = {
						"Status": "Error"
					};
					JDebug = {
						"MkAuth": "Cannot Find the Data > find",
					};
					Terminal(JSON.stringify(JDebug));
				} else {
					JDebug = {
						"Payment": Json.Status,
						"MkAuth": [{
								"Module": "Bar",
								"Available": Json["Payments"][0].status,
								"Allowed": "" + Debug('MKAUTH').bar + ""

							},
							{
								"Module": "Pix",
								"Available": Json["Payments"][1].status,
								"Allowed": "" + Debug('MKAUTH').pix + ""
							},
							{
								"Module": "QRC",
								"Available": Json["Payments"][2].status,
								"Allowed": "" + Debug('MKAUTH').qrpix + ""
							},
							{
								"Module": "QRL",
								"Available": Json["Payments"][3].status,
								"Allowed": "" + Debug('MKAUTH').qrlink + ""
							},
							{
								"Module": "PDF",
								"Available": Json["Payments"][4].status,
								"Allowed": "" + Debug('MKAUTH').pdf + ""
							}
						]
					}
					Terminal(JDebug);
				}
				return Json;
			}
			if (EXT == 'listagem') {
				if (Json == undefined) {
					Json = {
						"Status": "Error"
					};
					JDebug = {
						"MkAuth": "Cannot Find the Data",
					};
					Terminal(JSON.stringify(JDebug));
				} else {
					Terminal(Json);
				}
				return Json;
			}
		} else {
			if (MkSync.mensagem != undefined) {
				if (EXT == 'titulos') {
					JDebug = {
						"MkAuth": "Cannot Find the Data > uid",
					};
					Terminal(JSON.stringify(JDebug));
					return false;

				}

				if (EXT == 'listagem') {
					return false;
				}
			}
		}
	} else {
		return false;
	}
};

//Test
delay(0).then(async function() {
	//	const Master = await MkAuth('5', 'vencido', 'listagem');
});

//Check is Json
function testJSON(text) {
	text = text.toString().replace(/"/g, "").replace(/'/g, "");
	text = text.toString().replace('uid:', '"uid":"').replace(',find:', '","find":"').replace('}', '"}');
	if (typeof text !== "string") {
		return false;
	}
	try {
		var json = JSON.parse(text);
		return (typeof json === 'object');
	} catch (error) {
		return false;
	}
}

//Update WhatsApp
function WwbUpgrade() {
	delay(0).then(async function() {
		const Upgrade = async (GET) => {
			const Update = await fetch(GET).then(response => {
				return response.json();
			}).catch(err => {
				return {
					'currentVersion': '0.0.0.0'
				}
			});
			return Update;
		};
		Update = await Upgrade('https://raw.githubusercontent.com/wppconnect-team/wa-version/main/versions.json');
		if (Update.currentVersion == '0.0.0.0') {
			console.log('> Bot-Mwsm : ' + Debug('CONSOLE').fail);
			global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').fail);
		} else {
			if (Update.currentVersion.replace(/\D/g, "") == Debug('RELEASE').webjs.replace(/\D/g, "")) {
				console.log('> Bot-Mwsm : ' + Debug('CONSOLE').lastet);
				global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').lastet);
			} else {
				if (Update.currentBeta == null) {
					Update.versions.forEach(function(Return) {
						if (Return.version.includes(Update.currentVersion)) {
							if ((Return.version != Debug('RELEASE').webjs)) {
								db.run("UPDATE release SET webjs=?", [Return.version], (err) => {
									if (err) {
										console.log('> Bot-Mwsm : ' + err)
									}
									console.log('> Bot-Mwsm : ' + Debug('CONSOLE').updating);
									global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').updating);
									exec('pm2 restart Bot-Mwsm --update-env');
								});
							}

						}
					});
				} else {
					if (Return.version != Debug('RELEASE').webjs) {
						db.run("UPDATE release SET webjs=?", [Update.currentBeta], (err) => {
							if (err) {
								console.log('> Bot-Mwsm : ' + err)
							}
							console.log('> Bot-Mwsm : ' + Debug('CONSOLE').updating);
							global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').updating);
							exec('pm2 restart Bot-Mwsm --update-env');
						});
					}
				}
			}

		}
	});
}

// WhatsApp-web.js Functions
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
		remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/' + Debug('RELEASE').webjs + '.html',
	},
});
io.on('connection', function(socket) {
	socket.emit('Version', Package.version);
	socket.emit('Reset', true);
	if (Session || (Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
		console.log('> Bot-Mwsm : ' + Debug('CONSOLE').authenticated);
		console.log('> Bot-Mwsm : ' + Debug('CONSOLE').ready);
		socket.emit('qr', Debug('RESOURCES').authenticated);
		socket.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').authenticated);
		socket.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').ready);
		socket.emit('qr', Debug('RESOURCES').ready);
		Session = true;
	} else {
		socket.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').connection);
		console.log('> Bot-Mwsm : ' + Debug('CONSOLE').connection);
		socket.emit('qr', Debug('RESOURCES').connection);
	}

	client.on('qr', (qr) => {
		WwbUpgrade();
		qrcode.toDataURL(qr, (err, url) => {
			try {
				socket.emit('qr', url);
			} catch (err) {
				console.log('> Bot-Mwsm : ' + err);
				socket.emit('message', '> Bot-Mwsm : ' + err);
			} finally {
				socket.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').received);
				console.log('> Bot-Mwsm : ' + Debug('CONSOLE').received);
			}
		});
	});

	client.on('ready', async () => {
		if ((Debug('OPTIONS').auth == 0 || Debug('OPTIONS').auth == "false")) {
			db.run("UPDATE options SET auth=?", [true], (err) => {
				if (err) {
					console.log('> Bot-Mwsm : ' + err)
				}
			});
		}
		socket.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').ready);
		console.log('> Bot-Mwsm : ' + Debug('CONSOLE').ready);
		socket.emit('qr', Debug('RESOURCES').ready);
		Session = true;
		if (!Permission) {
			Permission = true;
			await GetUpdate(WServer, false);
			await socket.emit('Reset', false);
			await client.sendMessage(client.info.wid["_serialized"], "*Mwsm Token:*\n" + Password[1]);
		}
	});

	client.on('authenticated', (data) => {
		socket.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').authenticated);
		console.log('> Bot-Mwsm : ' + Debug('CONSOLE').authenticated);
		socket.emit('qr', Debug('RESOURCES').authenticated);
	});


	client.on('auth_failure', () => {
		socket.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').auth_failure);
		console.log('> Bot-Mwsm : ' + Debug('CONSOLE').auth_failure);
		socket.emit('qr', Debug('RESOURCES').auth_failure);
		db.run("UPDATE options SET auth=?", [false], (err) => {
			if (err) {
				console.log('> Bot-Mwsm : ' + err)
			}
			socket.emit('Reset', true);
			Session = false;
		});

	});


	client.on('disconnected', (reason) => {
		socket.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').disconnected);
		console.log('> Bot-Mwsm : ' + Debug('CONSOLE').disconnected);
		socket.emit('qr', Debug('RESOURCES').disconnected);
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
				socket.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').connection);
				console.log('> Bot-Mwsm : ' + Debug('CONSOLE').connection);
				socket.emit('qr', Debug('RESOURCES').connection);
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
			socket.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').authenticated);
			console.log('> Bot-Mwsm : ' + Debug('CONSOLE').authenticated);
			socket.emit('qr', Debug('RESOURCES').authenticated);
		} else {
			WwbUpgrade();
			socket.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').connection);
			console.log('> Bot-Mwsm : ' + Debug('CONSOLE').connection);
			socket.emit('qr', Debug('RESOURCES').connection);
			socket.emit('Reset', true);

		}

	});

	socket.emit('background', Debug('RESOURCES').background);
	socket.emit('donation', Debug('RESOURCES').about);

	delay(2000).then(async function() {
		if (Session && Permission) {
			await GetUpdate(WServer, false);
			await socket.emit('Reset', false);
		}
	});
});

// Reset
app.post('/reset', (req, res) => {
	db.run("UPDATE options SET auth=?", [false], (err) => {
		if (err) {
			console.log('> Bot-Mwsm : ' + err)
		}
		global.io.emit('qr', Debug('RESOURCES').connection);
	});
	const Reset = req.body.reset;
	if (Reset == "true") {
		if ((Debug('RELEASE').isupdate == 1 || Debug('RELEASE').isupdate == "true")) {
			GetUpdate(WServer);
		}
		res.json({
			Status: "Success"
		});
		global.io.emit('getlog', true);
		exec('pm2 restart Bot-Mwsm --update-env');
	}
});

// Shutdown
app.post('/shutdown', (req, res) => {
	const Shutdown = req.body.shutdown;
	const Token = req.body.token;
	if (Shutdown == "true" && [Debug('OPTIONS').token, Password[1]].includes(Token)) {
		res.json({
			Status: "Success"
		});
		global.io.emit('getlog', true);
		client.logout();
	} else {
		res.json({
			Status: "Fail",
			Return: Debug('CONSOLE').wrong
		});
	}
});


// Authenticated
app.post('/authenticated', (req, res) => {
	if ((Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
		res.json({
			Status: "Success"
		});

	} else {
		res.json({
			Status: "Fail"
		});
	}
});

// Debug
app.post('/debug', (req, res) => {
	const debug = req.body.debug;
	if (Debug('OPTIONS').debugger != debug) {
		db.run("UPDATE options SET debugger=?", [debug], (err) => {
			if (err) {
				res.json({
					Status: "Fail",
					Return: Debug('OPTIONS').debugger
				});
			}
			res.json({
				Status: "Success",
				Return: debug
			});
		});
	}
});


// API Update
app.post('/update', (req, res) => {
	const UP = req.body.uptodate;
	if (Debug('RELEASE').isupdate != UP) {
		db.run("UPDATE release SET isupdate=?", [UP], (err) => {
			if (err) {
				res.json({
					Status: "Fail",
					Return: Debug('OPTIONS').isupdate
				});
			}
			res.json({
				Status: "Success",
				Return: UP
			});
		});


	}
});




// Token
app.post('/token', (req, res) => {
	const Token = req.body.token;
	if ([Debug('OPTIONS').token, Password[1]].includes(Token)) {
		global.io.emit('interval', Debug('OPTIONS').interval);
		global.io.emit('sleep', Debug('OPTIONS').sleep);
		global.io.emit('sendwait', Debug('OPTIONS').sendwait);
		global.io.emit('response', Debug('OPTIONS').response);
		global.io.emit('call', Debug('OPTIONS').call);
		global.io.emit('access', Debug('OPTIONS').access);
		global.io.emit('port', Debug('OPTIONS').access);
		global.io.emit('pixfail', Debug('OPTIONS').pixfail);
		global.io.emit('replyes', Debug('OPTIONS').replyes);
		global.io.emit('alert', Debug('OPTIONS').alert);
		global.io.emit('count', Debug('OPTIONS').count);
		global.io.emit('onbot', Debug('OPTIONS').onbot);
		global.io.emit('reject', Debug('OPTIONS').reject);
		global.io.emit('limiter', Debug('OPTIONS').limiter);
		global.io.emit('domain', Debug('MKAUTH').domain);
		global.io.emit('tunel', Debug('MKAUTH').tunel);
		global.io.emit('username', Debug('MKAUTH').client_id);
		global.io.emit('password', Debug('MKAUTH').client_secret);
		global.io.emit('module', Debug('MKAUTH').module);
		global.io.emit('bar', Debug('MKAUTH').bar);
		global.io.emit('pix', Debug('MKAUTH').pix);
		global.io.emit('qrpix', Debug('MKAUTH').qrpix);
		global.io.emit('qrlink', Debug('MKAUTH').qrlink);
		global.io.emit('pdf', Debug('MKAUTH').pdf);
		global.io.emit('delay', Debug('MKAUTH').delay);
		global.io.emit('debugger', Debug('OPTIONS').debugger);
		global.io.emit('uptodate', Debug('RELEASE').update);

		if ((Debug('TARGET', '*', 'ALL')).length >= 1) {
			var isTARGET = [];
			Debug('TARGET', '*', 'ALL').some(function(TARGET, index) {
				GetLog = {
					"ID": TARGET.id,
					"TITLE": TARGET.title,
					"START": TARGET.start,
					"END": TARGET.end,
					"TARGET": TARGET.target,
					"STATUS": TARGET.status,
				};
				isTARGET.push(GetLog);

				if (Debug('TARGET', '*', 'ALL').length == (index + 1)) {
					global.io.emit('getlog', true);
					global.io.emit('setlog', isTARGET);
				}
			});
		} else {
			global.io.emit('getlog', false);
		}
		res.json({
			Status: "Success",
			Return: Debug('CONSOLE').right
		});

	} else {
		res.json({
			Status: "Fail",
			Return: Debug('CONSOLE').wrong
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
				interval: Debug('OPTIONS').interval,
				sleep: Debug('OPTIONS').sleep,
				sendwait: Debug('OPTIONS').sendwait,
				response: Debug('OPTIONS').response,
				call: Debug('OPTIONS').call,
				access: Debug('OPTIONS').access,
				port: Debug('OPTIONS').access,
				pixfail: Debug('OPTIONS').pixfail,
				replyes: Debug('OPTIONS').replyes,
				alert: Debug('OPTIONS').alert,
				count: Debug('OPTIONS').count,
				onbot: Debug('OPTIONS').onbot,
				reject: Debug('OPTIONS').reject,
				limiter: Debug('OPTIONS').limiter,
				domain: Debug('MKAUTH').domain,
				tunel: Debug('MKAUTH').tunel,
				username: Debug('MKAUTH').client_id,
				password: Debug('MKAUTH').client_secret,
				module: Debug('MKAUTH').module,
				bar: Debug('MKAUTH').bar,
				pix: Debug('MKAUTH').pix,
				qrpix: Debug('MKAUTH').qrpix,
				qrlink: Debug('MKAUTH').qrlink,
				pdf: Debug('MKAUTH').pdf,
				delay: Debug('MKAUTH').delay,
				debugger: Debug('OPTIONS').debugger,
				uptodate: Debug('RELEASE').update,
			});

		}
	});
});

// Set Options Mkauth
app.post('/options_mkauth', (req, res) => {
	const define = req.body.define;
	const enable = req.body.enable;
	db.run("UPDATE mkauth SET " + define + "=?", [enable], (err) => {
		if (err) {
			res.json({
				Status: "Fail",
				Return: Debug('MKAUTH').define
			});
		}
		res.json({
			Status: "Success",
			Return: enable
		});
	});
});

// Delay Mkauth
app.post('/delay_mkauth', (req, res) => {
	const range = req.body.range;
	if (Debug('MKAUTH').delay != range) {
		db.run("UPDATE mkauth SET delay=?", [range], (err) => {
			if (err) {
				res.json({
					Status: "Fail",
					Return: Debug('MKAUTH').delay
				});
			}
			res.json({
				Status: "Success",
				Return: range
			});
		});
	}
});



// Update SQLite
app.post('/sqlite-options', (req, res) => {
	const Interval = req.body.interval;
	const Sleep = req.body.sleep;
	const Sendwait = req.body.sendwait;
	const Access = req.body.access;
	const Pixfail = req.body.pixfail;
	var Response = req.body.response;
	var Call = req.body.call;
	const Replyes = req.body.replyes;
	const Alert = req.body.alert;
	const Onbot = req.body.onbot;
	const Reject = req.body.reject;
	const Count = req.body.count;
	const Token = req.body.token;
	const Limiter = req.body.limiter;
	if (Access != Debug('OPTIONS').access) {
		Reboot = true;
	} else {
		Reboot = false;
	}
	if (Response == "") {
		Response = Debug('OPTIONS').response;
	}
	if ([Debug('OPTIONS').token, Password[1]].includes(Token)) {
		if (Interval != "" && Sleep != "" && Sendwait != "" && Access != "" && Pixfail != "" && Count != "" && Limiter != "") {
			db.run("UPDATE options SET interval=?, sendwait=?, access=?, pixfail=?, response=?, replyes=?, onbot=?, count=?, limiter=?, sleep=?,  call=?,  reject=?,  alert=?", [Interval, Sendwait, Access, Pixfail, Response, Replyes, Onbot, Count, Limiter, Sleep, Call, Reject, Alert], (err) => {
				if (err) {
					res.json({
						Status: "Fail",
						Return: Debug('CONSOLE').failed
					});
				}
				console.log('> Bot-Mwsm : ' + Debug('CONSOLE').settings);
				global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').settings);
				res.json({
					Status: "Success",
					Return: Debug('CONSOLE').settings,
					Port: Access
				});
				session = false;
				if (Reboot) {
					global.io.emit('Reset', true);
					exec('pm2 restart Bot-Mwsm --update-env');

				}
			});

		} else {
			res.json({
				Status: "Fail",
				Return: Debug('CONSOLE').unnamed
			});
		}

	} else {
		res.json({
			Status: "Fail",
			Return: Debug('CONSOLE').wrong
		});
	}
});



// Force Message
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
	const Reconstructor = new Promise((resolve, reject) => {
		if (Mensagem.some(Rows => Debug('ATTACHMENTS', 'SUFFIXES', 'MULTIPLE').some(Row => Rows.includes(Row)))) {
			var Array = {};
			Mensagem.some(function(Send, index) {
				if (Debug('ATTACHMENTS', 'SUFFIXES', 'MULTIPLE').some(Row => Send.includes(Row))) {
					const Cloud = async (Url) => {
						let mimetype;
						const attachment = await axios.get(Url, {
							responseType: 'arraybuffer'
						}).then(response => {
							mimetype = response.headers['content-type'];
							return response.data.toString('base64');
						});
						return new MessageMedia(mimetype, attachment, 'Media');
					};

					Cloud(Send).then(Return => {
						Array[Send] = Return;
						resolve(Array);
					}).catch(err => {
						resolve(undefined);
					});
				}
			});
		} else {
			resolve(undefined);
		}
	});

	delay(0).then(async function() {
		const Retorno = await Promise.all([Reconstructor]);
		var Assembly = [];
		var Sending = 1;
		Mensagem.some(function(Send, index) {
			if (Debug('ATTACHMENTS', 'SUFFIXES', 'MULTIPLE').some(Row => Send.includes(Row))) {
				if (Retorno[0].hasOwnProperty(Send)) {
					Assembly.push(Retorno[0][Send]);
				}
			} else {
				Assembly.push(Send);
			}
		});
		Assembly.some(function(Send, index) {
			setTimeout(function() {

				var Preview = false;
				var Caption = "Media";

				client.sendMessage(WhatsApp, Send, {
					caption: Caption,
					linkPreview: Preview
				}).then(response => {
					Wait = WhatsApp;
					Sending = (Sending + 1);
				}).catch(err => {
					return res.status(500).json({
						Status: "Fail",
						message: 'Bot-Mwsm : Message was not Sent'
					});
				});

				if (Sending >= Assembly.length) {
					return res.status(201).json({
						Status: "Success",
						message: 'Bot-Mwsm : Message Sent'
					});
				}
			}, index * Debug('OPTIONS').interval);
		});
	});
});

// Link Mkauth
app.post('/link_mkauth', async (req, res) => {
	const User = req.body.username;
	const Pass = req.body.password;
	const Domain = req.body.domain;
	const Tunel = req.body.tunel;
	const Module = req.body.module;
	const Token = req.body.token;
	var ConnAuth, ResAuth;
	if ([Debug('OPTIONS').token, Password[1]].includes(Token)) {
		const Authentication = await axios.get('https://' + Tunel + '/api/', {
			auth: {
				username: User,
				password: Pass
			}
		}).then(response => {
			return response.data;
		}).catch(err => {
			return false;
		});
		ConnAuth = false;
		if (Authentication) {
			ConnAuth = true;
			const MkSync = await axios.get('https://' + Tunel + '/api/titulo/listar/limite=1&pagina=1', {
				headers: {
					'Authorization': 'Bearer ' + Authentication
				}
			}).then(response => {
				return response.data;
			}).catch(err => {
				return false;
			});
			ResAuth = false;
			if ((MkSync.error == undefined)) {
				ResAuth = true;
				db.run("UPDATE mkauth SET client_id=?, client_secret=?, domain=?, tunel=?, module=?", [User, Pass, Domain, Tunel, Module], (err) => {
					if (err) {
						res.json({
							Status: "Fail",
							Return: Debug('CONSOLE').failed
						});
					}
					res.json({
						Status: "Success",
						Return: Debug('CONSOLE').mksuccess
					});
				});
			} else {
				res.json({
					Status: "Fail",
					Return: Debug('CONSOLE').refused
				});
			}
		} else {
			res.json({
				Status: "Fail",
				Return: Debug('CONSOLE').mkfail
			});
		}
		JDebug = {
			"MkAuth": [{
				"Authentication": "" + ConnAuth + "",
				"Communication": "" + ResAuth + ""
			}]
		};
		Terminal(JSON.stringify(JDebug));
	} else {
		res.json({
			Status: "Fail",
			Return: Debug('CONSOLE').wrong
		});

	}
});

// Send Message
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

	if (Debug('OPTIONS').schedule <= Debug('OPTIONS').limiter) {
		var FUNCTION = [Debug('MKAUTH').bar, Debug('MKAUTH').pix, Debug('MKAUTH').qrpix, Debug('MKAUTH').qrlink, Debug('MKAUTH').pdf];
		const uID = await Insert('TARGET', 'START', DateTime());
		if (uID == false) {
			uID = Debug('TARGET').id;
		}
		const Constructor = new Promise((resolve, reject) => {
			var Array = [];
			var Radeon = {};
			var Preview = false;
			var Caption, Send, Register, Renner;
			var RETURNS = [];
			Radeon['Title'] = 'xxx';

			if (Mensagem.some(Row => testJSON(Row)) && (FUNCTION.includes('true') || FUNCTION.includes('1')) && (Debug('MKAUTH').module == 1 || Debug('MKAUTH').module == "true")) {

				Mensagem.some(function(Send, index) {
					if (testJSON(Send) && (FUNCTION.includes('true') || FUNCTION.includes('1'))) {

						const JsonEncode = Send.toString().replace(/"/g, "").replace(/'/g, "").replace('uid:', '"uid":"').replace(',find:', '","find":"').replace('}', '"}');
						const Json = JSON.parse(JsonEncode);
						Terminal(JSON.stringify(Json));
						MkAuth(Json.uid, Json.find).then(Synchronization => {
							if ((Debug('MKAUTH').bar == 1 || Debug('MKAUTH').bar == "true")) {
								RETURNS.push('Bar');
							}

							if ((Debug('MKAUTH').pix == 1 || Debug('MKAUTH').pix == "true")) {
								RETURNS.push('Pix');
							}

							if ((Debug('MKAUTH').qrpix == 1 || Debug('MKAUTH').qrpix == "true")) {
								RETURNS.push('QRCode');
							}

							if ((Debug('MKAUTH').qrlink == 1 || Debug('MKAUTH').qrlink == "true")) {
								RETURNS.push('Link');
							}

							if ((Debug('MKAUTH').pdf == 1 || Debug('MKAUTH').pdf == "true")) {
								RETURNS.push('Boleto');
							}
							if (Synchronization.ID != undefined) {
								Radeon['Title'] = Synchronization.ID;

								db.run("UPDATE target SET title=? WHERE id=?", [Synchronization.ID, uID], (err) => {
									if (err) throw err;
								});
							}
							if (Synchronization.Status != "pago" && Synchronization.Status != "Error" && Synchronization.Status != "Null") {
								(Synchronization.Payments).forEach(function(GET, index) {
									if (RETURNS.includes(GET.caption)) {
										switch (GET.caption) {
											case 'Bar':
												Send = GET.value;
												Caption = GET.caption;
												break;
											case 'Pix':
												Send = GET.value;
												Caption = GET.caption;
												break;
											case 'QRCode':
												Send = new MessageMedia('image/png', GET.value, GET.caption);
												Caption = GET.caption;
												break;
											case 'Link':
												Send = GET.value;
												Caption = GET.caption;
												break;
											case 'Boleto':
												Send = GET.value;
												Caption = GET.caption;
												break;
										}
										if (Send != '') {
											Array.push(Send);
										}
									}
									if (((Synchronization.Payments).length == (index + 1))) {
										Radeon['Message'] = Array;
										resolve(Radeon);
									}
								});
							} else {
								if (Synchronization.Status == "Error") {
									Radeon['Message'] = "Error";
									resolve(Radeon);

								} else {
									if (Synchronization.Status == "Null") {
										Radeon['Message'] = "Null";
										resolve(Radeon);

									} else {
										Radeon['Message'] = "Fail";
										resolve(Radeon);

									}
								}
							}
						}).catch(err => {
							Radeon['Message'] = false;
							resolve(Radeon);

						});


					}
				});
			} else {

				if (Mensagem.some(Row => testJSON(Row))) {
					Mensagem.some(function(Send, index) {
						if (testJSON(Send)) {
							const JsonEncode = Send.toString().replace(/"/g, "").replace(/'/g, "").replace('uid:', '"uid":"').replace(',find:', '","find":"').replace('}', '"}');
							const Json = JSON.parse(JsonEncode);
							Terminal(JSON.stringify(Json));
						}
					});

					if ((Debug('MKAUTH').module == 1 || Debug('MKAUTH').module == "true")) {
						if ((FUNCTION.includes('true') || FUNCTION.includes('1'))) {
							Radeon['Message'] = undefined;
						} else {
							Radeon['Message'] = "False";
						}
					} else {
						Radeon['Message'] = "Fatal";
						JDebug = {
							"MkAuth": "Connect was Failed",
						};
						Terminal(JSON.stringify(JDebug));
					}
					resolve(Radeon);
				} else {
					Radeon['Message'] = undefined;
					resolve(Radeon);
				}
			}
		});

		const Reconstructor = new Promise((resolve, reject) => {
			if (Mensagem.some(Row => Debug('ATTACHMENTS', 'SUFFIXES', 'MULTIPLE').some(Rows => Row.includes(Rows)))) {
				var Array = {};
				Mensagem.some(function(Send, index) {
					if (Debug('ATTACHMENTS', 'SUFFIXES', 'MULTIPLE').some(Row => Send.includes(Row))) {
						const Cloud = async (Url) => {
							let mimetype;
							const attachment = await axios.get(Url, {
								responseType: 'arraybuffer'
							}).then(response => {
								mimetype = response.headers['content-type'];
								return response.data.toString('base64');
							});
							return new MessageMedia(mimetype, attachment, 'Media');
						};
						Cloud(Send).then(Return => {
							Array[Send] = Return;
							resolve(Array);
						}).catch(err => {
							resolve(undefined);
						});
					}
				});
			} else {
				resolve(undefined);
			}
		});

		delay(0).then(async function() {
			const Retorno = await Promise.all([Constructor, Reconstructor]);
			var Boleto, PDF2Base64, Sleep = 0;
			if (Debug('MKAUTH').delay >= 3) {
				Sleep = (Sleep + (Debug('MKAUTH').delay * 1000));
			}

			if ((Retorno[0].Message != undefined) && (Retorno[0].Message != "Fail") && (Retorno[0].Message != "False") && (Retorno[0].Message != "Fatal") && (Retorno[0].Message != false) && (Retorno[0].Message != "Error") && (Retorno[0].Message != "Null")) {


				for (let i = 0; i < Retorno[0].Message.length; i++) {
					if (typeof Retorno[0].Message[i] === 'string') {
						if ((Retorno[0].Message[i].indexOf("boleto.hhvm") > -1)) {
							const UID = Retorno[0].Message[i].split("=")[1];
							Boleto = await Build(Retorno[0].Message[i]);
							PDF2Base64 = await new Promise((resolve, reject) => {
								if (Debug('ATTACHMENTS', 'SUFFIXES', 'MULTIPLE').some(Row => Boleto.includes(Row))) {
									const Cloud = async (Url) => {
										let mimetype;
										const attachment = await axios.get(Url, {
											responseType: 'arraybuffer'
										}).then(response => {
											mimetype = response.headers['content-type'];
											return response.data.toString('base64');
										});
										return new MessageMedia(mimetype, attachment, 'Fatura');
									};
									Cloud(Boleto).then(Return => {
										resolve(Return);
									}).catch(err => {
										resolve(undefined);
									});
								}
							});
							Boleto = await PDF2Base64;
							if (fs.existsSync(__dirname + "/" + UID + ".pdf")) {
								fs.unlinkSync(__dirname + "/" + UID + ".pdf");
							}
						}
					}
				}
			}
			delay(Sleep).then(async function() {
				var Assembly = [];
				var Sending = 1;
				var Ryzen = 0;
				var PrevERROR = false;
				Mensagem.someAsync(async (Send) => {
					if (testJSON(Send)) {
						if ((Retorno[0].Message != undefined) && (Retorno[0].Message != "Fail") && (Retorno[0].Message != false) && (Retorno[0].Message != "Error") && (Retorno[0].Message != "Null") || (Retorno[0].Message != "Fatal") || (Retorno[0].Message != "False")) {
							for (let i = 0; i < Retorno[0].Message.length; i++) {
								Assembly.push(Retorno[0].Message[i]);
							}
						}
					} else {
						if (Debug('ATTACHMENTS', 'SUFFIXES', 'MULTIPLE').some(Row => Send.includes(Row))) {
							if (typeof Send === 'string') {
								if ((Send.indexOf("http") > -1)) {
									if (Retorno[1].hasOwnProperty(Send)) {
										Assembly.push(Retorno[1][Send]);
									}
								} else {
									Assembly.push(Send);
								}
							} else {
								if (Retorno[1].hasOwnProperty(Send)) {
									Assembly.push(Retorno[1][Send]);
								}
							}
						} else {
							Assembly.push(Send);
						}
					}
				});

				if (WhatsApp == Wait || Wait == undefined) {
					Delay = 300;
				} else {
					Delay = Debug('OPTIONS').sendwait;
				}
				if (Assembly.length >= 1) {
					if ((Retorno[0].Message == "Fail") || (Retorno[0].Message == false) || (Retorno[0].Message == "Error") || (Retorno[0].Message == "Null") || (Retorno[0].Message == "Fatal") || (Retorno[0].Message == "False")) {
						if (Retorno[0].Message == "Fail") {
							res.json({
								Status: "Fail",
								message: Debug('CONSOLE').unavailable
							});
						}
						if (Retorno[0].Message == "Error") {
							res.json({
								Status: "Fail",
								message: Debug('CONSOLE').request
							});
						}
						if (Retorno[0].Message == "Null") {
							res.json({
								Status: "Fail",
								message: Debug('CONSOLE').missing
							});
						}

						if (Retorno[0].Message == "Fatal") {
							res.json({
								Status: "Fail",
								message: Debug('CONSOLE').mkfail
							});
						}

						if (Retorno[0].Message == "False") {
							res.json({
								Status: "Fail",
								message: Debug('CONSOLE').mkunselect
							});
						}

						if (Retorno[0].Message == false) {
							var SELECTOR = false;
							if ((Debug('MKAUTH').bar == 1 || Debug('MKAUTH').bar == "true")) {
								SELECTOR = true;
							}

							if ((Debug('MKAUTH').pix == 1 || Debug('MKAUTH').pix == "true")) {
								SELECTOR = true;
							}

							if ((Debug('MKAUTH').qrpix == 1 || Debug('MKAUTH').qrpix == "true")) {
								SELECTOR = true;
							}

							if ((Debug('MKAUTH').qrlink == 1 || Debug('MKAUTH').qrlink == "true")) {
								SELECTOR = true;
							}

							if ((Debug('MKAUTH').pdf == 1 || Debug('MKAUTH').pdf == "true")) {
								SELECTOR = true;
							}
							Retorno[0].Message = "Fail";
							if (SELECTOR) {
								res.json({
									Status: "Fail",
									message: Debug('CONSOLE').refused
								});
							} else {
								return res.json({
									Status: "Fail",
									message: Debug('CONSOLE').mkunselect
								});
							}
						}
						db.get("SELECT * FROM target WHERE id='" + Debug('TARGET').id + "'", (err, TARGET) => {
							if (TARGET != undefined) {
								if (Retorno[0].Title == "xxx") {
									Retorno[0].Title = Debug('TARGET').id;
								}
								if (Retorno[0].Message == undefined) {
									Retorno[0].Message = "Null";
								}
								if (Retorno[0].Message == "False") {
									Retorno[0].Message = "Fail";
								}


								db.serialize(() => {
									db.run("UPDATE target SET end=?, status=?, target=?, title=? WHERE id=?", [DateTime(), Retorno[0].Message, WhatsApp.replace(/^55+/, '').replace(/\D/g, ''), Retorno[0].Title, uID], (err) => {

										if (err) throw err;
									});
									db.get("SELECT * FROM target WHERE id='" + Debug('TARGET').id + "'", (err, TARGET) => {
										isTARGET = [];
										if (TARGET != undefined) {
											Debug('TARGET', '*', 'ALL').some(function(TARGET, index) {
												GetLog = {
													"ID": TARGET.id,
													"TITLE": TARGET.title,
													"START": TARGET.start,
													"END": TARGET.end,
													"TARGET": TARGET.target,
													"STATUS": TARGET.status,
												};
												isTARGET.push(GetLog);
												if (Debug('TARGET', '*', 'ALL').length == (index + 1)) {
													if ((Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
														global.io.emit('setlog', isTARGET);
													}
												}
											});
										}
									});
								});
							}
						});
					} else {

						Terminal(Assembly);
						setTimeout(function() {
							Assembly.some(function(Send, index) {
								const PIXFAIL = [undefined, "XXX", null, ""];
								if (!PIXFAIL.includes(Debug('OPTIONS').pixfail) && Send == "CodigoIndisponivel") {
									Send = Send.replace("CodigoIndisponivel", Debug('OPTIONS').pixfail);
								}
								setTimeout(function() {
									setTimeout(function() {
										if (typeof Send === 'string') {
											if ((Send.indexOf("boleto.hhvm") > -1)) {
												if (Boleto != undefined) {
													if (typeof Boleto !== 'string') {
														Send = Boleto;
													}
												}
												Caption = "Boleto";
												Preview = true;
												Ryzen = 1000;
											} else {
												if ((Send.indexOf("http") > -1)) {
													Caption = undefined;
													Preview = true;
												} else {
													Caption = undefined;
													Preview = false;
												}
											}
										} else {
											if (JSON.parse(JSON.stringify(Send)).filename != "Media") {
												Caption = JSON.parse(JSON.stringify(Send)).filename;
												Preview = false;
											} else {
												Caption = undefined;
												Preview = false;
											}
											Ryzen = 1000;
										}

										client.sendMessage(WhatsApp, Send, {
											caption: Caption,
											linkPreview: Preview
										}).then(response => {
											Wait = WhatsApp;
											Sending = (Sending + 1);
										}).catch(err => {
											return res.status(500).json({
												Status: "Fail",
												message: 'Bot-Mwsm : Message was not Sent'
											});
										});

										if ((Sending == Assembly.length) || (Assembly.length == (index + 1))) {

											db.get("SELECT * FROM target WHERE id='" + Debug('TARGET').id + "'", (err, TARGET) => {
												if (TARGET != undefined) {

													if (Retorno[0].Title == "xxx") {
														Retorno[0].Title = Debug('TARGET').id;
													}
													if (Retorno[0].Message == undefined) {
														Retorno[0].Message = "Null";
													}
													if (Retorno[0].Message == "False") {
														Retorno[0].Message = "Fail";
													}


													db.serialize(() => {
														db.run("UPDATE target SET end=?, status=?, target=?, title=? WHERE id=?", [DateTime(), 'Sent', WhatsApp.replace(/^55+/, '').replace(/\D/g, ''), Retorno[0].Title, uID], (err) => {

															if (err) throw err;
														});
														db.get("SELECT * FROM target WHERE id='" + Debug('TARGET').id + "'", (err, TARGET) => {
															isTARGET = [];
															if (TARGET != undefined) {
																Debug('TARGET', '*', 'ALL').some(function(TARGET, index) {
																	GetLog = {
																		"ID": TARGET.id,
																		"TITLE": TARGET.title,
																		"START": TARGET.start,
																		"END": TARGET.end,
																		"TARGET": TARGET.target,
																		"STATUS": TARGET.status,
																	};
																	isTARGET.push(GetLog);
																	if (Debug('TARGET', '*', 'ALL').length == (index + 1)) {
																		if ((Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
																			global.io.emit('setlog', isTARGET);
																		}
																	}
																});
															}
														});
													});
												}
											});

											return res.json({
												Status: "Success",
												message: 'Bot-Mwsm : Message Sent'
											});
										}
									}, ((Debug('MKAUTH').delay + index) * Ryzen));
								}, (index) * Debug('OPTIONS').interval);
							});
						}, Math.floor(Delay + Math.random() * 1000));
					}
				} else {
					if ((Debug('MKAUTH').module == 1 || Debug('MKAUTH').module == "true")) {
						if (Retorno[0].Message == "Fail" || Retorno[0].Message == false || (Retorno[0].Message == "Error") || (Retorno[0].Message == "Null") || (Retorno[0].Message == "Fatal") || (Retorno[0].Message == "False")) {
							if (Retorno[0].Message == "Fail") {
								res.json({
									Status: "Fail",
									message: Debug('CONSOLE').unavailable
								});
							}
							if (Retorno[0].Message == "Error") {
								res.json({
									Status: "Fail",
									message: Debug('CONSOLE').request
								});
							}
							if (Retorno[0].Message == "Null") {
								res.json({
									Status: "Fail",
									message: Debug('CONSOLE').missing
								});
							}

							if (Retorno[0].Message == "Fatal") {
								res.json({
									Status: "Fail",
									message: Debug('CONSOLE').mkfail
								});
							}

							if (Retorno[0].Message == "False") {
								res.json({
									Status: "Fail",
									message: Debug('CONSOLE').mkunselect
								});
							}



							if (Retorno[0].Message == false) {
								var SELECTOR = false;
								if ((Debug('MKAUTH').bar == 1 || Debug('MKAUTH').bar == "true")) {
									SELECTOR = true;
								}

								if ((Debug('MKAUTH').pix == 1 || Debug('MKAUTH').pix == "true")) {
									SELECTOR = true;
								}

								if ((Debug('MKAUTH').qrpix == 1 || Debug('MKAUTH').qrpix == "true")) {
									SELECTOR = true;
								}

								if ((Debug('MKAUTH').qrlink == 1 || Debug('MKAUTH').qrlink == "true")) {
									SELECTOR = true;
								}

								if ((Debug('MKAUTH').pdf == 1 || Debug('MKAUTH').pdf == "true")) {
									SELECTOR = true;
								}
								Retorno[0].Message = "Fail";
								if (SELECTOR) {
									res.json({
										Status: "Fail",
										message: Debug('CONSOLE').refused
									});
								} else {
									res.json({
										Status: "Fail",
										message: Debug('CONSOLE').mkunselect
									});
								}
							}

							db.get("SELECT * FROM target WHERE id='" + Debug('TARGET').id + "'", (err, TARGET) => {
								if (TARGET != undefined) {

									if (Retorno[0].Title == "xxx") {
										Retorno[0].Title = Debug('TARGET').id;
									}
									if (Retorno[0].Message == undefined) {
										Retorno[0].Message = "Null";
									}
									if (Retorno[0].Message == "False") {
										Retorno[0].Message = "Fail";
									}


									db.serialize(() => {
										db.run("UPDATE target SET end=?, status=?, target=?, title=? WHERE id=?", [DateTime(), Retorno[0].Message, WhatsApp.replace(/^55+/, '').replace(/\D/g, ''), Retorno[0].Title, uID], (err) => {

											if (err) throw err;
										});
										db.get("SELECT * FROM target WHERE id='" + Debug('TARGET').id + "'", (err, TARGET) => {
											isTARGET = [];
											if (TARGET != undefined) {
												Debug('TARGET', '*', 'ALL').some(function(TARGET, index) {
													GetLog = {
														"ID": TARGET.id,
														"TITLE": TARGET.title,
														"START": TARGET.start,
														"END": TARGET.end,
														"TARGET": TARGET.target,
														"STATUS": TARGET.status,
													};
													isTARGET.push(GetLog);
													if (Debug('TARGET', '*', 'ALL').length == (index + 1)) {
														if ((Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
															global.io.emit('setlog', isTARGET);
														}
													}
												});
											}
										});
									});
								}
							});
						} else {
							if ((Debug('TARGET', '*', 'ALL')).length >= 1) {

								db.get("SELECT * FROM target WHERE id='" + Debug('TARGET').id + "'", (err, TARGET) => {
									if (TARGET != undefined) {

										if (Retorno[0].Title == "xxx") {
											Retorno[0].Title = Debug('TARGET').id;
										}
										if (Retorno[0].Message == undefined) {
											Retorno[0].Message = "Null";
										}
										if (Retorno[0].Message == "False") {
											Retorno[0].Message = "Fail";
										}

										db.serialize(() => {
											db.run("UPDATE target SET end=?, status=?, target=?, title=? WHERE id=?", [DateTime(), Retorno[0].Message, WhatsApp.replace(/^55+/, '').replace(/\D/g, ''), Retorno[0].Title, uID], (err) => {

												if (err) throw err;
											});
											db.get("SELECT * FROM target WHERE id='" + Debug('TARGET').id + "'", (err, TARGET) => {
												isTARGET = [];
												if (TARGET != undefined) {
													Debug('TARGET', '*', 'ALL').some(function(TARGET, index) {
														GetLog = {
															"ID": TARGET.id,
															"TITLE": TARGET.title,
															"START": TARGET.start,
															"END": TARGET.end,
															"TARGET": TARGET.target,
															"STATUS": TARGET.status,
														};
														isTARGET.push(GetLog);
														if (Debug('TARGET', '*', 'ALL').length == (index + 1)) {
															if ((Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
																global.io.emit('setlog', isTARGET);
															}
														}
													});
												}
											});
										});
									}
								});

							} else {
								global.io.emit('getlog', true);

							}

							return res.json({
								Status: "Fail",
								message: Debug('CONSOLE').mkunselect
							});
						}
					} else {

						if ((Debug('MKAUTH').module == 0 || Debug('MKAUTH').module == "false")) {
							Retorno[0].Message = "Fail";
							res.json({
								Status: "Fail",
								message: Debug('CONSOLE').mkfail
							});

						} else {
							return res.json({
								Status: "Fail",
								message: Debug('CONSOLE').unnamed
							});
						}

						if ((Debug('TARGET', '*', 'ALL')).length >= 1) {
							db.get("SELECT * FROM target WHERE id='" + Debug('TARGET').id + "'", (err, TARGET) => {
								if (TARGET != undefined) {

									if (Retorno[0].Title == "xxx") {
										Retorno[0].Title = Debug('TARGET').id;
									}

									if (Retorno[0].Message == undefined) {
										Retorno[0].Message = "Null";
									}

									if (Retorno[0].Message == "False") {
										Retorno[0].Message = "Fail";
									}

									db.serialize(() => {
										db.run("UPDATE target SET end=?, status=?, target=?, title=? WHERE id=?", [DateTime(), Retorno[0].Message, WhatsApp.replace(/^55+/, '').replace(/\D/g, ''), Retorno[0].Title, uID], (err) => {

											if (err) throw err;
										});
										db.get("SELECT * FROM target WHERE id='" + Debug('TARGET').id + "'", (err, TARGET) => {
											isTARGET = [];
											if (TARGET != undefined) {
												Debug('TARGET', '*', 'ALL').some(function(TARGET, index) {
													GetLog = {
														"ID": TARGET.id,
														"TITLE": TARGET.title,
														"START": TARGET.start,
														"END": TARGET.end,
														"TARGET": TARGET.target,
														"STATUS": TARGET.status,
													};
													isTARGET.push(GetLog);
													if (Debug('TARGET', '*', 'ALL').length == (index + 1)) {
														if ((Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
															global.io.emit('setlog', isTARGET);
														}
													}
												});
											}
										});
									});
								}
							});

						} else {
							global.io.emit('getlog', true);

						}

					}
				}
			});
		});
	} else {
		console.log("Mensagem Agendada");
	}
});

// Html to PDF
app.get('/build', [
	body('uid').notEmpty()
], async (req, res) => {
	const errors = validationResult(req).formatWith(({
		uid
	}) => {
		return uid;
	});
	if (!errors.isEmpty()) {
		return res.status(422).json({
			status: false,
			message: errors.mapped()
		});
	}
	const GET = req.body.uid;
	const UID = GET.split('=')[1];
	const URL = ([GET]);
	URL.someAsync(async (Send) => {
		htmlPDF.setOptions({
			format: "A4",
			timeout: 5000
		});
		htmlPDF.setAutoCloseBrowser(false);
		const Buffer = await htmlPDF.create(Send);
		const Patch = `${__dirname}/${UID}.pdf`;
		await htmlPDF.writeFile(Buffer, Patch);
		return res.json({
			Return: "http://" + ip.address() + ":" + Debug('OPTIONS').access + "/" + UID + ".pdf"
		});
		await htmlPDF.closeBrowser();
	});
});

const Build = async (SET) => {
	const PDFGet = await axios.get("http://" + ip.address() + ":" + Debug('OPTIONS').access + "/build", {
		data: {
			uid: SET,
		}
	}).then(response => {
		return response.data;
	}).catch(err => {
		return false;
	});
	return await PDFGet['Return'];
};

// Send Image
app.post('/send-image', [
	body('to').notEmpty(),
	body('image').notEmpty(),
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

	const Caption = req.body.caption;
	const Mimetype = req.body.mimetype;
	const isWid = (req.body.to);
	const isDDI = isWid.substr(0, 2);
	const isDDD = isWid.substr(2, 2);
	const isCall = isWid.slice(-8);
	var WhatsApp = isWid + '@c.us';
	if ((isDDI == '55') && (parseInt(isDDD) <= 30)) {
		WhatsApp = isWid.substr(0, 4) + '9' + isCall + '@c.us';
	} else if ((isDDI == '55') && (parseInt(isDDD) > 30)) {
		WhatsApp = isWid.substr(0, 4) + isCall + '@c.us';
	}
	const Mensagem = new MessageMedia(Mimetype, (req.body.image), 'Media');
	client.sendMessage(WhatsApp, Mensagem, {
		caption: Caption,
		linkPreview: false
	}).then(response => {
		return res.json({
			Status: "Success",
			message: 'Bot-Mwsm : Message Sent'
		});
	}).catch(err => {
		return res.status(500).json({
			Status: "Fail",
			message: 'Bot-Mwsm : Message was not Sent'
		});
	});
});

// Send Document
app.post('/send-document', [
	body('to').notEmpty(),
	body('document').notEmpty(),
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
	const Caption = req.body.caption;
	const Mimetype = req.body.mimetype;
	const FileName = req.body.filename;

	const isWid = (req.body.to);
	const isDDI = isWid.substr(0, 2);
	const isDDD = isWid.substr(2, 2);
	const isCall = isWid.slice(-8);
	var WhatsApp = isWid + '@c.us';
	if ((isDDI == '55') && (parseInt(isDDD) <= 30)) {
		WhatsApp = isWid.substr(0, 4) + '9' + isCall + '@c.us';
	} else if ((isDDI == '55') && (parseInt(isDDD) > 30)) {
		WhatsApp = isWid.substr(0, 4) + isCall + '@c.us';
	}
	const Mensagem = new MessageMedia(Mimetype, (req.body.document), FileName);
	client.sendMessage(WhatsApp, Mensagem, {
		caption: Caption,
		linkPreview: false
	}).then(response => {
		return res.json({
			Status: "Success",
			message: 'Bot-Mwsm : Message Sent'
		});
	}).catch(err => {
		return res.status(500).json({
			Status: "Fail",
			message: 'Bot-Mwsm : Message was not Sent'
		});
	});
});



// WhatsApp Bot
client.on('message', async msg => {
	const nomeContato = msg._data.notifyName;
	let groupChat = await msg.getChat();

	if (msg.type.toLowerCase() == "e2e_notification") return null;
	if (msg.body == "") return null;
	if (msg.from.includes("@g.us")) return null;
	const NULLED = [undefined, "XXX", null, ""];

	if (msg.body.toUpperCase().includes("TOKEN") && NULLED.includes(Debug('OPTIONS').token)) {
		if (msg.body.includes(":") && (msg.body.split(":")[1].length == 7)) {
			db.run("UPDATE options SET token=?", [msg.body.split(":")[1]], (err) => {
				if (err) throw err;
				console.log('> Bot-Mwsm : ' + Debug('CONSOLE').saved);
				global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').saved);
				msg.reply(Debug('CONSOLE').saved);
			});
		} else {
			console.log('> Bot-Mwsm : ' + Debug('CONSOLE').wrong);
			global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').wrong);
			msg.reply(Debug('CONSOLE').wrong);
		}
	} else {
		db.serialize(() => {
			db.get("SELECT * FROM replies WHERE whats='" + msg.from.replaceAll('@c.us', '') + "'", (err, REPLIES) => {
				if (REPLIES == undefined) {
					db.run("INSERT INTO replies(whats,date,count) VALUES(?, ?, ?)", [msg.from.replaceAll('@c.us', ''), register, 1], (err) => {
						if (err) {
							console.log('> Bot-Mwsm : ' + err)
						}
						console.log('> Bot-Mwsm : ' + Debug('CONSOLE').inserted);
						global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').inserted);
						MsgBox = true;
					});

				} else {

					if (register.toString() > REPLIES.date) {
						db.run("UPDATE replies SET date=?, count=? WHERE whats=?", [register, 1, msg.from.replaceAll('@c.us', '')], (err) => {
							if (err) {
								console.log('> Bot-Mwsm : ' + err)
							}
							console.log('> Bot-Mwsm : ' + Debug('CONSOLE').updated);
							global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').updated);
							MsgBox = true;
						});
					} else {
						if (Debug('OPTIONS').count > REPLIES.count) {
							COUNT = REPLIES.count + 1;
							db.run("UPDATE replies SET count=? WHERE whats=?", [COUNT, msg.from.replaceAll('@c.us', '')], (err) => {
								if (err) throw err;
								console.log('> Bot-Mwsm : ' + Debug('CONSOLE').updated);
								global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').updated);
								MsgBox = true;
							});
						} else {
							console.log('> Bot-Mwsm : ' + Debug('CONSOLE').found);
							global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').found);
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
					if (MsgBox && (Debug('OPTIONS').onbot == 1 || Debug('OPTIONS').onbot == "true") && (msg.body != null || msg.body == "0" || msg.type == 'ptt' || msg.hasMedia)) {
						if ((Debug('OPTIONS').replyes == 1 || Debug('OPTIONS').replyes == "true")) {
							msg.reply(Debug('OPTIONS').response);
						} else {
							client.sendMessage(msg.from, Debug('OPTIONS').response);
						}
					}
				}
			});

		});
	}
});

client.on('call', async (call) => {
	if ((Debug('OPTIONS').reject == 1 || Debug('OPTIONS').reject == "true")) {
		setTimeout(function() {
			call.reject().then(() => {
				if ((Debug('OPTIONS').alert == 1 || Debug('OPTIONS').alert == "true")) {
					client.sendMessage(call.from.split(":")[0] + '@c.us', Debug('OPTIONS').call).then().catch(err => {
						console.log(err);
					});
				}
			}).catch(err => {
				console.log(err);
			});
		}, Math.floor(Debug('OPTIONS').sleep + Math.random() * 1000));
	}
});

client.initialize();
console.log("\nAPI is Ready!\n");
const Port = process.env.PORT || Debug('OPTIONS').access;
server.listen(Port, function() {
	console.log('Server Running on *' + ip.address() + ':' + Port);
});
