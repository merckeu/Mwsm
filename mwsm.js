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
function Debug(Select, Search = '*', Mode = 'single', Find = undefined) {
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
		case "direct":
			Select = link.prepare('SELECT ' + Search.toLowerCase() + ' FROM ' + Select.toLowerCase() + ' WHERE title = ?').get(Find);
			break;
	}
	return Select;
}

//Manipulation DataBase
const Dataset = async (Table, Column, Value, Mode) => {
	switch (Mode.toLowerCase()) {
		case "update":
			Select = await link.prepare('UPDATE ' + Table.toLowerCase() + ' SET ' + Column.toLowerCase() + ' = ? WHERE id = ?').run(Value, '1');
			if (Select) {
				Select = true;
			} else {
				Select = false;
			}
			break;
		case "insert":
			Select = await link.prepare('INSERT INTO ' + Table.toLowerCase() + ' (' + Column.toLowerCase() + ') VALUES (?)').run(Value);
			if (Select) {
				Select = link.prepare('SELECT * FROM ' + Table.toLowerCase() + ' ORDER BY ID DESC').get().id;
			} else {
				Select = false
			}
			break;
		case "delete":
			Select = await link.prepare('DELETE FROM ' + Table.toLowerCase() + ' WHERE id = ?').run(Value);
			if (Select) {
				Select = true;
			} else {
				Select = false;
			}
			break;
		case "flush":
			const Flush = (link.prepare('SELECT * FROM ' + Value.toLowerCase()).all()).length;
			Select = await link.prepare('UPDATE ' + Table.toLowerCase() + ' SET ' + Column.toLowerCase() + ' = ? WHERE NAME = ?').run(Flush.toString(), Value.toLowerCase());
			if (Select) {
				Select = true;
			} else {
				Select = false;
			}
			break;
	}
	return await Select;
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

function ArrayPosition(...criteria) {
	return (a, b) => {
		for (let i = 0; i < criteria.length; i++) {
			const curCriteriaComparatorValue = criteria[i](a, b)
			if (curCriteriaComparatorValue !== 0) {
				return curCriteriaComparatorValue
			}
		}
		return 0
	}
}

const GetUpdate = async (GET, SET) => {
	var Status;
	var Conclusion = true;
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
	(isUpdate.version).someAsync(async (Return) => {
		if ((Return.release == Package.version)) {
			var isDateTime = Debug('RELEASE').mwsm;
			if (isDateTime == "undefined" || isDateTime == null) {
				isDateTime = "0000-00-00 00:00:00";
			}
			for (let i = 1; i < (isUpdate.version).length; i++) {
				if ((isUpdate.version)[i].patch >= Return.patch) {
					if (((isUpdate.version)[i].patch) > (isDateTime)) {
						await global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isfound);
						console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isfound);
						await global.io.emit('upgrade', false);
						if (SET && (Debug('RELEASE').isupdate == 1 || Debug('RELEASE').isupdate == "true")) {
							const Register = await Dataset('RELEASE', 'MWSM', ((isUpdate.version)[i].patch), 'UPDATE');
							if (Register) {
								await global.io.emit('upgrade', true);
								console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isupfiles);
								console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isupdated);
								await global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isupdated);
								await wget("https://raw.githubusercontent.com/MKCodec/Mwsm/main/script.js", "/var/api/Mwsm/script.js");
								await wget("https://raw.githubusercontent.com/MKCodec/Mwsm/main/style.css", "/var/api/Mwsm/style.css");
								await wget("https://raw.githubusercontent.com/MKCodec/Mwsm/main/index.html", "/var/api/Mwsm/index.html");
								await wget("https://raw.githubusercontent.com/MKCodec/Mwsm/main/mwsm.js", "/var/api/Mwsm/mwsm.js");
								await global.io.emit('update', true);
							} else {
								await global.io.emit('upgrade', false);
							}
							Status = true;
						} else {
							if (Conclusion && ((isUpdate.version)[i].patch) == (Debug('RELEASE').mwsm)) {
								Conclusion = false;
								if (SET == false) {
									await global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isalready);
									await console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isalready);
								}
								await global.io.emit('upgrade', true);
								Status = false;
							} else {
								var isUpgrade = true;
								if ((isDateTime == "0000-00-00 00:00:00") && (Return.patch != "0000-00-00 00:00:00")) {
									var isDate = (new Date()).toISOString();
									const RegEx = new Set(".");
									for (let Return of isDate) {
										if (RegEx.has(Return)) {
											isDate = isDate.replace(Return, '%');
										}
									}
									isDate = isDate.split("%")[0].replace('T', ' ');
									if ((isDate > (isUpdate.version)[i].patch)) {
										const Register = await Dataset('RELEASE', 'MWSM', ((isUpdate.version)[i].patch), 'UPDATE');
										if (Register) {
											isUpgrade = false;
										} else {
											isUpgrade = true;
										}
									}
								}
								if (isUpgrade) {
									if (Conclusion) {
										Conclusion = false;
										Status = true;
										await global.io.emit('upgrade', false);
										if (SET == false) {
											await global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isneeds);
											await console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isneeds);
										}

									}
								} else {
									if (Conclusion) {
										Conclusion = false;
										if (SET == false) {
											await global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isalready);
											console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isalready);
										}
										await global.io.emit('upgrade', true);
										Status = false;
									}

								}

							}

						}
					} else {

						if (Conclusion) {
							Conclusion = false;
							if (SET == false) {
								await global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isalready);
								console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isalready);
							}
							await global.io.emit('upgrade', true);
							Status = false;
						}
					}
				} else if (Return.release != '0.0.0' && Conclusion) {
					Conclusion = false;
					Status = true;
					await global.io.emit('upgrade', false);
					if (SET == false) {
						await global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isneeds);
						console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').isneeds);
					}
				}
			}
		}
	});
	return Status;
}

cron.schedule('*/2 00-05 * * *', async () => {
	await GetUpdate(WServer, true);
}, {
	scheduled: true,
	timezone: "America/Sao_Paulo"
});

app.use(express.json({
	limit: '500mb'
}));
app.use(express.urlencoded({
	limit: '500mb',
	extended: true
}));
app.use(express.text({
	limit: '500mb'
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


Date.prototype.addHours = function(h) {
	this.setHours(this.getHours() + h);
	return this;
}

Date.prototype.addMinutes = function(m) {
	this.setHours(this.getMinutes() + m);
	return this;
}


Date.prototype.addDays = function(days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

function isWeek(Sysdate) {
	var CountDown = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][Sysdate.getDay()];
	switch (CountDown) {
		case 'sunday':
			inDay = Debug('SCHEDULER').sunday;
			break;
		case 'monday':
			inDay = Debug('SCHEDULER').monday;
			break;
		case 'tuesday':
			inDay = Debug('SCHEDULER').tuesday;
			break;
		case 'wednesday':
			inDay = Debug('SCHEDULER').wednesday;
			break;
		case 'thursday':
			inDay = Debug('SCHEDULER').thursday;
			break;
		case 'friday':
			inDay = Debug('SCHEDULER').friday;
			break;
		case 'saturday':
			inDay = Debug('SCHEDULER').saturday;
			break;
	}
	if ((inDay == 1 || inDay == "true")) {
		return true;
	} else {
		return false;
	}
}

const MkClient = async (FIND) => {
	var Server = Debug('MKAUTH').client_link;

	if (Server == "tunel") {
		Server = Debug('MKAUTH').tunel;
	} else if (Server == "domain") {
		Server = Debug('MKAUTH').domain;
	}
	const Authentication = await axios.get('https://' + Server + '/api/', {
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
		const MkSync = await axios.get('https://' + Server + '/api/cliente/show/' + FIND, {
			headers: {
				'Authorization': 'Bearer ' + Authentication
			}
		}).then(response => {
			if ((typeof response.data !== "object") && ((response.data).slice(-1) != '}')) {
				return JSON.parse((response.data).substring(0, (response.data).length - 1));
			} else {
				return response.data;
			}
		}).catch(err => {
			return false;
		});
		if (await MkSync.mensagem == undefined && await MkSync.error == undefined) {
			if (await MkSync.celular != undefined) {
				return (await MkSync.celular).replace(/[^0-9\\.]+/g, '');
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
};



//Search MkAUth API
const MkAuth = async (UID, FIND, EXT = 'titulos', TYPE = 'titulo', MODE = true) => {
	var SEARCH, LIST, STATUS, PUSH = [],
		JSON = [],
		Json = undefined,
		JDebug = undefined
	var Server = Debug('MKAUTH').client_link;

	if (Server == "tunel") {
		Server = Debug('MKAUTH').tunel;
	} else if (Server == "domain") {
		Server = Debug('MKAUTH').domain;
	}

	const Authentication = await axios.get('https://' + Server + '/api/', {
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
		const MkSync = await axios.get('https://' + Server + '/api/' + TYPE + '/' + EXT + '/' + UID, {
			headers: {
				'Authorization': 'Bearer ' + Authentication
			}
		}).then(response => {
			if ((typeof response.data !== "object") && ((response.data).slice(-1) != '}')) {
				return JSON.parse((response.data).substring(0, (response.data).length - 1));
			} else {
				return response.data;
			}
		}).catch(err => {
			return false;
		});

		if (MkSync.mensagem == undefined) {
			if (MODE) {
				SEARCH = MkSync.titulos;
			} else {
				SEARCH = MkSync;
			}
			(SEARCH).someAsync(async (Send) => {
				if (EXT == 'titulos') {
					if ((Send.titulo == FIND.replace(/^0+/, '') || parseInt(Send.titulo) == parseInt(FIND)) || Send.linhadig == FIND) {
						var Bolix = '';
						if (Send.linhadig == undefined || Send.linhadig == null) {
							Send.linhadig = '';
							Json_Bar = "false";
						} else {
							//Bolix = "http://" + Debug('MKAUTH').domain + "/boleto/boleto.hhvm?titulo=" + Send.uuid;
							Bolix = "http://" + Debug('MKAUTH').domain + "/boleto/boleto.hhvm?titulo=" + Send.titulo + "&contrato=" + Send.login;
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
								"Name": Send.nome,
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
						switch (Send.status) {
							case 'aberto':
								Send.status = 'open';
								break;
							case 'pago':
								Send.status = 'paid';
								break;
							case 'vencido':
								Send.status = 'due';
								break;
						}
						Json = {
							"Order": (new Date(Send.datavenc)).getDate(),
							"Identifier": Send.titulo,
							"Client": Send.nome,
							"Reward": Send.datavenc,
							"Payment": Send.status,
							"Connect": Send.login
						};
						PUSH.push(Json);
						Json = (PUSH).sort(function(a, b) {
							var Nome = a.Client.localeCompare(b.Client);
							var Ordem = parseFloat(a.Order) - parseFloat(b.Order);
							return Ordem || Nome;
						});

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
						"Client": Json.Name,
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
					Terminal(JDebug);
				} else {
					(Json).some(function(Send, index) {
						isJson = {
							"Order": (index + 1),
							"Identifier": Send.Identifier,
							"Client": Send.Client,
							"Reward": Send.Reward,
							"Payment": Send.Payment,
							"Connect": Send.Connect
						};
						JSON.push(isJson);
						Json = JSON;
					});
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
					Terminal(JDebug);
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
	//const Master = await MkAuth('7', 'vencido', 'listagem');
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

// WhatsApp-web.js Functions
const client = new Client({
	authStrategy: new LocalAuth({
		clientId: Debug('OPTIONS').appname
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
});
io.on('connection', function(socket) {
	socket.emit('Version', Package.version);
	socket.emit('Reset', true);
	if (Session || (Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
		console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').authenticated);
		console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').ready);
		socket.emit('qr', Debug('RESOURCES').authenticated);
		socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').authenticated);
		socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').ready);
		socket.emit('qr', Debug('RESOURCES').ready);
		Session = true;
	} else {
		socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').connection);
		console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').connection);
		socket.emit('qr', Debug('RESOURCES').connection);
	}

	client.on('qr', (qr) => {
		if (!Session) {
			qrcode.toDataURL(qr, (err, url) => {
				try {
					socket.emit('qr', url);
				} catch (err) {
					console.log('> ' + Debug('OPTIONS').appname + ' : ' + err);
					socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + err);
				} finally {
					socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').received);
					console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').received);
				}
			});
		}
	});

	client.on('ready', async () => {
		await GetUpdate(WServer, false);
		if ((Debug('OPTIONS').auth == 0 || Debug('OPTIONS').auth == "false")) {
			db.run("UPDATE options SET auth=?", [true], (err) => {
				if (err) {
					console.log('> ' + Debug('OPTIONS').appname + ' : ' + err)
				}
			});
		}
		socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').ready);
		console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').ready);
		socket.emit('qr', Debug('RESOURCES').ready);
		Session = true;
		if (!Permission) {
			Permission = true;
			await socket.emit('Reset', false);
			await client.sendMessage(client.info.wid["_serialized"], "*Mwsm Token:*\n" + Password[1]);
		}
	});

	client.on('authenticated', (data) => {
		socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').authenticated);
		console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').authenticated);
		socket.emit('qr', Debug('RESOURCES').authenticated);
	});


	client.on('auth_failure', () => {
		socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').auth_failure);
		console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').auth_failure);
		socket.emit('qr', Debug('RESOURCES').auth_failure);
		db.run("UPDATE options SET auth=?", [false], (err) => {
			if (err) {
				console.log('> ' + Debug('OPTIONS').appname + ' : ' + err)
			}
			socket.emit('Reset', true);
			Session = false;
		});

	});


	client.on('disconnected', (reason) => {
		socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').disconnected);
		console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').disconnected);
		socket.emit('qr', Debug('RESOURCES').disconnected);
		db.run("UPDATE options SET auth=?, token=?", [false, null], (err) => {
			if (err) {
				console.log('> ' + Debug('OPTIONS').appname + ' : ' + err)
			}
			socket.emit('Reset', true);
			Session = false;
		});
		delay(3000).then(async function() {
			try {
				await client.destroy();
			} catch (err) {
				console.log('> ' + Debug('OPTIONS').appname + ' : ' + err);
				socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + err);
			} finally {
				socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').connection);
				console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').connection);
				socket.emit('qr', Debug('RESOURCES').connection);
				socket.emit('Reset', true);
				delay(2000).then(async function() {
					exec('pm2 restart ' + Debug('OPTIONS').appname + ' --update-env');
				});
			}
		});
	});


	client.on('loading_screen', (percent, message) => {
		console.log('> ' + Debug('OPTIONS').appname + ' : Loading application', percent + '%');
		socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : Connecting Application ' + percent + '%');
		if (percent >= "100") {
			socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').authenticated);
			console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').authenticated);
			socket.emit('qr', Debug('RESOURCES').authenticated);
		} else {
			WwbUpgrade();
			socket.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').connection);
			console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').connection);
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
			console.log('> ' + Debug('OPTIONS').appname + ' : ' + err)
		}
		global.io.emit('qr', Debug('RESOURCES').connection);
	});
	const Reset = req.body.reset;
	if (Reset == "true") {
		res.json({
			Status: "Success"
		});
		global.io.emit('getlog', true);
		exec('pm2 restart ' + Debug('OPTIONS').appname + ' --update-env');
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
		client.logout()
		global.io.emit('getlog', true);
		delay(3000).then(async function() {
			try {
				global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').disconnected);
				console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').disconnected);
				global.io.emit('qr', Debug('RESOURCES').disconnected);
				db.run("UPDATE options SET auth=?, token=?", [false, null], (err) => {
					if (err) {
						console.log('> ' + Debug('OPTIONS').appname + ' : ' + err)
					}
					global.io.emit('Reset', true);
					Session = false;
				});
				await client.destroy();
			} catch (err) {
				console.log('> ' + Debug('OPTIONS').appname + ' : ' + err);
				global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + err);
			} finally {
				global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').connection);
				console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').connection);
				global.io.emit('qr', Debug('RESOURCES').connection);
				global.io.emit('Reset', true);
				delay(2000).then(async function() {
					exec('pm2 restart ' + Debug('OPTIONS').appname + ' --update-env');
				});
			}
		});
	} else {
		res.json({
			Status: "Fail",
			Return: Debug('CONSOLE').wrong
		});
		console.log("OFF");
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


// MkAuth Set Message
app.post('/send-mkauth', (req, res) => {
	const User = req.body.user;
	const Client = req.body.client;
	const Code = req.body.code;
	const Status = req.body.status;
	const Payment = req.body.payment;
	const Contact = req.body.contact;
	const Reward = req.body.reward;
	const Push = req.body.push;
	const Token = req.body.token;
	var Process;
	var Pulse = DateTime();
	switch (Payment) {
		case 'paid':
			Message = Debug('MESSAGE').pay;
			if (Status.toLowerCase() != "finished") {
				Process = "Finished";
			}
			break;
		case 'due':
			Message = Debug('MESSAGE').later;
			if (Status.toLowerCase() == "pending" || Status.toLowerCase() == "fail") {
				Process = "Sent";
			} else if (Status.toLowerCase() == "sent") {
				Process = "Resent";
			}
			break;
		case 'open':
			if ((Reward.split(" ")[0]) == (DateTime()).split(" ")[0]) {
				Message = Debug('MESSAGE').day;
			} else {
				Message = Debug('MESSAGE').before;
			}
			Process = "Sent";
			break;
	}

	Mensagem = Message.replaceAll('%nomeresumido%', Client.split(" ")[0]).replaceAll('%vencimento%', new Date(Reward).toLocaleString("pt-br").split(",")[0]).replaceAll('%logincliente%', User).replaceAll('%numerotitulo%', Code).replaceAll('%pagamento%', new Date(Pulse).toLocaleString("pt-br").split(",")[0]+" as "+(Pulse.split(" ")[1]).split(":")[0]+":"+(Pulse.split(" ")[1]).split(":")[1]);
	if ([Debug('OPTIONS').token, Password[1]].includes(Token)) {
		const data = {
			to: '55' + Contact,
			msg: Mensagem,
			pass: Token
		};
		axios.post("http://" + ip.address() + ":" + Debug('OPTIONS').access + "/send-message", data).then((response) => {
			try {
				Debug("STORANGE", "*", "DIRECT", Code).title;
			} catch (e) {
				Dataset('STORANGE', 'TITLE', Code, 'INSERT');
			}
			if ((Debug("STORANGE", "*", "DIRECT", Code).title) == Code) {
				db.run("UPDATE storange SET push=?, status=? WHERE title=?", [Pulse, Process, Code], (err) => {
					if (err) throw err;
				});
			}
			res.json({
				Status: response.data.Status,
				Return: response.data.message,
				RPush: Pulse,
				RStatus: Process,
				RCode: Code
			});
		}).catch((err) => {
			res.status(500).json({
				Status: "Fail",
				Return: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').error
			});
		});
	} else {
		res.status(500).json({
			Status: "Fail",
			Return: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').error
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
					Return: Debug('RELEASE').isupdate
				});
			}
			res.json({
				Status: "Success",
				Return: UP
			});
		});
	}
});


// API Protect
app.post('/protected', (req, res) => {
	const Protect = req.body.protect;
	if (Debug('OPTIONS').protect != Protect) {
		db.run("UPDATE options SET protect=?", [Protect], (err) => {
			if (err) {
				res.json({
					Status: "Fail",
					Return: Debug('OPTIONS').protect
				});
			}
			res.json({
				Status: "Success",
				Return: Protect
			});
		});
	}
});




// Token
app.post('/token', async (req, res) => {
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
		global.io.emit('iserver', Debug('MKAUTH').client_link);
		global.io.emit('debugger', Debug('OPTIONS').debugger);
		global.io.emit('uptodate', Debug('RELEASE').isupdate);
		global.io.emit('protected', Debug('OPTIONS').protect);
		global.io.emit('ismonth', (DateTime().split('-')[1]));
		global.io.emit('issearch', 'all');

		global.io.emit('bfive', Debug('SCHEDULER').bfive);
		global.io.emit('inday', Debug('SCHEDULER').inday);
		global.io.emit('lfive', Debug('SCHEDULER').lfive);
		global.io.emit('lten', Debug('SCHEDULER').lten);
		global.io.emit('lfifteen', Debug('SCHEDULER').lfifteen);
		global.io.emit('ltwenty', Debug('SCHEDULER').ltwenty);
		global.io.emit('ltwentyfive', Debug('SCHEDULER').ltwentyfive);
		global.io.emit('lthirty', Debug('SCHEDULER').lthirty);
		global.io.emit('lthirtyfive', Debug('SCHEDULER').lthirtyfive);
		global.io.emit('lforty', Debug('SCHEDULER').lforty);

		global.io.emit('sunday', Debug('SCHEDULER').sunday);
		global.io.emit('monday', Debug('SCHEDULER').monday);
		global.io.emit('tuesday', Debug('SCHEDULER').tuesday);
		global.io.emit('wednesday', Debug('SCHEDULER').wednesday);
		global.io.emit('thursday', Debug('SCHEDULER').thursday);
		global.io.emit('friday', Debug('SCHEDULER').friday);
		global.io.emit('saturday', Debug('SCHEDULER').saturday);
		global.io.emit('morning', Debug('SCHEDULER').morning);
		global.io.emit('afternoon', Debug('SCHEDULER').afternoon);
		global.io.emit('night', Debug('SCHEDULER').night);

		global.io.emit('OnPay', Debug('SCHEDULER').onpay);
		global.io.emit('OnLock', Debug('SCHEDULER').onlock);
		global.io.emit('OnUnlock', Debug('SCHEDULER').onunlock);
		global.io.emit('OnMaintenance', Debug('SCHEDULER').onmaintenance);
		global.io.emit('OnUnistall', Debug('SCHEDULER').onunistall);

		global.io.emit('before', Debug('MESSAGE').before);
		global.io.emit('day', Debug('MESSAGE').day);
		global.io.emit('later', Debug('MESSAGE').later);
		global.io.emit('pay', Debug('MESSAGE').pay);
		global.io.emit('lock', Debug('MESSAGE').lock);
		global.io.emit('unlock', Debug('MESSAGE').unlock);
		global.io.emit('maintenance', Debug('MESSAGE').maintenance);
		global.io.emit('unistall', Debug('MESSAGE').unistall);


		if ((Debug('TARGET', '*', 'ALL')).length >= 1) {
			var isTARGET = [];
			Debug('TARGET', '*', 'ALL').some(function(TARGET, index) {
				if (TARGET.status == 'pending') {
					Dataset('TARGET', '*', TARGET.id, 'DELETE');
					Dataset('SQLITE_SEQUENCE', 'SEQ', 'TARGET', 'FLUSH');
				} else {
					GetLog = {
						"ID": TARGET.id,
						"TITLE": TARGET.title,
						"NAME": TARGET.client,
						"START": TARGET.start,
						"END": TARGET.end,
						"TARGET": TARGET.target,
						"STATUS": TARGET.status,
					};
					isTARGET.push(GetLog);
					if (Debug('TARGET', '*', 'ALL').length <= (index + 1)) {
						if ((Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
							global.io.emit('getlog', true);
							global.io.emit('setlog', isTARGET);

						}
					}
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

// Set Scheduler Mkauth
app.post('/scheduler', (req, res) => {
	const define = (req.body.define).toLowerCase();
	const enable = req.body.enable;
	db.run("UPDATE scheduler SET " + define + "=?", [enable], (err) => {
		if (err) {
			res.json({
				Status: "Fail",
				Return: Debug('SCHEDULER').define
			});
		}
		res.json({
			Status: "Success",
			Return: enable
		});
	});
});



// Get Clients Mkauth
app.post('/clients_mkauth', async (req, res) => {
	const Month = req.body.month;
	const Payment = req.body.payment;

	const Master = await MkAuth(Month, Payment, 'listagem');
	var hasTARGET = [];
	var PUSH, STATUS;

	if (await Master.Status == "Error") {
		return res.json({
			Status: "Fail",
			Return: Debug('CONSOLE').request
		});
	} else {
		(await Master).someAsync(async (TARGET) => {
			var Contact = await MkClient(TARGET.Connect);
			if (await Contact) {
				TARGET.Contact = await Contact;
			} else {
				TARGET.Contact = "00000000000";
			}
			try {
				TARGET.status = Debug("STORANGE", "*", "DIRECT", TARGET.Identifier).status;
			} catch (e) {
				TARGET.status = undefined;
			}

			try {
				TARGET.push = Debug("STORANGE", "*", "DIRECT", TARGET.Identifier).push;
			} catch (e) {
				TARGET.push = undefined;
			}
			GetClients = {
				"ORDER": TARGET.Order,
				"TITLE": TARGET.Identifier,
				"USER": TARGET.Connect,
				"CLIENT": TARGET.Client,
				"CONTACT": TARGET.Contact,
				"REWARD": TARGET.Reward,
				"PUSH": TARGET.push,
				"PAYMENT": TARGET.Payment,
				"STATUS": TARGET.status
			};
			hasTARGET.push(GetClients);
			if (Master.length == hasTARGET.length) {
				if ((Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
					global.io.emit('getclients', hasTARGET);
					return res.json({
						Status: "Success",
						Return: Debug('CONSOLE').successfully
					});

				}
			}

		});

	}
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

// Save Mkauth Messages
app.post('/message_mkauth', (req, res) => {
	const define = req.body.database
	const message = req.body.message
	const token = req.body.token
	if ([Debug('OPTIONS').token, Password[1]].includes(token)) {
		if (server != "" && message != "") {
			db.run("UPDATE message SET " + define + "=?", [message], (err) => {
				if (err) {
					res.json({
						Status: "Fail",
						Return: Debug('CONSOLE').datafail
					});
				}
				res.json({
					Status: "Success",
					Return: Debug('CONSOLE').datasave
				});
			});
		} else {
			res.json({
				Status: "Fail"
			});

		}
	} else {
		res.json({
			Status: "Fail"
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
				console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').settings);
				global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').settings);
				res.json({
					Status: "Success",
					Return: Debug('CONSOLE').settings,
					Port: Access
				});
				session = false;
				if (Reboot) {
					global.io.emit('Reset', true);
					exec('pm2 restart ' + Debug('OPTIONS').appname + ' --update-env');

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

// Send From Mikrotik
app.get('/mikrotik/:pass/:to/:msg', async (req, res) => {
	const {
		to,
		msg,
		pass
	} = req.params;

	var isHid;
	if ((Debug('OPTIONS').protect == 1 || Debug('OPTIONS').protect == "true")) {
		isHid = (pass);
	} else {
		if ((Debug('OPTIONS').token == "" || Debug('OPTIONS').protect == undefined)) {
			isHid = Password[1];
		} else {
			isHid = (Debug('OPTIONS').token);
		}
	}
	const isWid = (to);
	const isDDI = isWid.substr(0, 2);
	const isDDD = isWid.substr(2, 2);
	const isCall = isWid.slice(-8);
	var WhatsApp = isWid + '@c.us';
	if ((isDDI == '55') && (parseInt(isDDD) <= 30)) {
		WhatsApp = isWid.substr(0, 4) + '9' + isCall + '@c.us';
	} else if ((isDDI == '55') && (parseInt(isDDD) > 30)) {
		WhatsApp = isWid.substr(0, 4) + isCall + '@c.us';
	}
	const Mensagem = (msg);

	if ([Debug('OPTIONS').token, Password[1]].includes(isHid)) {
		setTimeout(function() {
			client.sendMessage(WhatsApp, Mensagem).then(response => {
				return res.json({
					Status: "Success",
					message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').success
				});
			}).catch(err => {
				return res.status(500).json({
					Status: "Fail",
					message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').error
				});
			});

		}, Math.floor(Debug('OPTIONS').interval + Math.random() * 1000));
	} else {
		return res.status(500).json({
			Status: "Fail",
			message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').error
		});
	}

});


// Force Message
app.post('/force-message', [
	body('p').notEmpty(),
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

	var isHid;
	if ((Debug('OPTIONS').protect == 1 || Debug('OPTIONS').protect == "true")) {
		if (req.body.pass != undefined) {
			isHid = req.body.pass;
		} else if (req.body.p != undefined) {
			isHid = req.body.p;
		} else {
			isHid = '';
		}
	} else {
		if ((Debug('OPTIONS').token == "" || Debug('OPTIONS').protect == undefined)) {
			isHid = Password[1];
		} else {
			isHid = (Debug('OPTIONS').token);
		}
	}
	const isWid = (req.body.to).replace(/[^0-9\\.]+/g, '');
	const isDDI = isWid.substr(0, 2);
	const isDDD = isWid.substr(2, 2);
	const isCall = isWid.slice(-8);
	var WhatsApp = isWid + '@c.us';
	if ((isDDI == '55') && (parseInt(isDDD) <= 30)) {
		WhatsApp = isWid.substr(0, 4) + '9' + isCall + '@c.us';
	} else if ((isDDI == '55') && (parseInt(isDDD) > 30)) {
		WhatsApp = isWid.substr(0, 4) + isCall + '@c.us';
	}
	const Mensagem = (req.body.msg).replaceAll("\\n", "\r\n").split("##");

	const Reconstructor = new Promise((resolve, reject) => {
		if (Mensagem.some(Rows => Debug('ATTACHMENTS', 'SUFFIXES', 'MULTIPLE').some(Row => Rows.includes(Row)))) {
			var Array = {};
			Mensagem.some(function(Send, index) {
				if (Debug('ATTACHMENTS', 'SUFFIXES', 'MULTIPLE').some(Row => Send.includes(Row))) {
					const Cloud = async () => {
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

				if ([Debug('OPTIONS').token, Password[1]].includes(isHid)) {
					client.sendMessage(WhatsApp, Send, {
						caption: Caption,
						linkPreview: Preview
					}).then(response => {
						Wait = WhatsApp;
						Sending = (Sending + 1);
					}).catch(err => {
						return res.status(500).json({
							Status: "Fail",
							message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').error
						});
					});
				} else {
					return res.status(500).json({
						Status: "Fail",
						message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').error
					});
				}

				if (Sending >= Assembly.length) {
					return res.status(201).json({
						Status: "Success",
						message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').success
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
	const Server = req.body.server;
	var iServer;

	if (Server == "tunel") {
		iServer = Tunel;
	} else if (Server == "domain") {
		iServer = Domain;
	}

	var ConnAuth, ResAuth;
	if ([Debug('OPTIONS').token, Password[1]].includes(Token)) {
		const Authentication = await axios.get('https://' + iServer + '/api/', {
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
		ResAuth = false;
		if (Authentication) {
			ConnAuth = true;
			const MkSync = await axios.get('https://' + iServer + '/api/titulo/listar/limite=1&pagina=1', {
				headers: {
					'Authorization': 'Bearer ' + Authentication
				}
			}).then(response => {
				return response.data;
			}).catch(err => {
				return false;
			});
			if ((MkSync.error == undefined)) {
				ResAuth = true;
				db.run("UPDATE mkauth SET client_id=?, client_secret=?, domain=?, tunel=?, module=?, client_link=?", [User, Pass, Domain, Tunel, Module, Server], (err) => {
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
		Terminal(JDebug);
	} else {
		res.json({
			Status: "Fail",
			Return: Debug('CONSOLE').wrong
		});

	}
});

// Send Image
app.post('/send-image', [
	body('pass').notEmpty(),
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

	const hasCaption = req.body.caption;
	const hasMimetype = req.body.mimetype;
	var isHid;
	if ((Debug('OPTIONS').protect == 1 || Debug('OPTIONS').protect == "true")) {
		if (req.body.pass != undefined) {
			isHid = req.body.pass;
		} else if (req.body.p != undefined) {
			isHid = req.body.p;
		} else {
			isHid = '';
		}
	} else {
		if ((Debug('OPTIONS').token == "" || Debug('OPTIONS').protect == undefined)) {
			isHid = Password[1];
		} else {
			isHid = (Debug('OPTIONS').token);
		}
	}
	const isWid = (req.body.to).replace(/[^0-9\\.]+/g, '');
	const isDDI = isWid.substr(0, 2);
	const isDDD = isWid.substr(2, 2);
	const isCall = isWid.slice(-8);
	var WhatsApp = isWid + '@c.us';
	if ((isDDI == '55') && (parseInt(isDDD) <= 30)) {
		WhatsApp = isWid.substr(0, 4) + '9' + isCall + '@c.us';
	} else if ((isDDI == '55') && (parseInt(isDDD) > 30)) {
		WhatsApp = isWid.substr(0, 4) + isCall + '@c.us';
	}
	const Mensagem = new MessageMedia(hasMimetype, (req.body.image), 'Media');

	if ([Debug('OPTIONS').token, Password[1]].includes(isHid)) {
		client.sendMessage(WhatsApp, Mensagem, {
			caption: hasCaption,
			linkPreview: false
		}).then(response => {
			return res.json({
				Status: "Success",
				message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').success
			});
		}).catch(err => {
			return res.status(500).json({
				Status: "Fail",
				message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').error
			});
		});
	} else {
		return res.status(500).json({
			Status: "Fail",
			message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').error
		});
	}
});

// Send Document
app.post('/send-document', [
	body('pass').notEmpty(),
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
	const hasCaption = req.body.caption;
	const hasMimetype = req.body.mimetype;
	const hasFileName = req.body.filename;
	var isHid;
	if ((Debug('OPTIONS').protect == 1 || Debug('OPTIONS').protect == "true")) {
		if (req.body.pass != undefined) {
			isHid = req.body.pass;
		} else if (req.body.p != undefined) {
			isHid = req.body.p;
		} else {
			isHid = '';
		}
	} else {
		if ((Debug('OPTIONS').token == "" || Debug('OPTIONS').protect == undefined)) {
			isHid = Password[1];
		} else {
			isHid = (Debug('OPTIONS').token);
		}
	}
	const isWid = (req.body.to).replace(/[^0-9\\.]+/g, '');
	const isDDI = isWid.substr(0, 2);
	const isDDD = isWid.substr(2, 2);
	const isCall = isWid.slice(-8);
	var WhatsApp = isWid + '@c.us';
	if ((isDDI == '55') && (parseInt(isDDD) <= 30)) {
		WhatsApp = isWid.substr(0, 4) + '9' + isCall + '@c.us';
	} else if ((isDDI == '55') && (parseInt(isDDD) > 30)) {
		WhatsApp = isWid.substr(0, 4) + isCall + '@c.us';
	}
	const Mensagem = new MessageMedia(hasMimetype, (req.body.document), hasFileName);

	if ([Debug('OPTIONS').token, Password[1]].includes(isHid)) {
		client.sendMessage(WhatsApp, Mensagem, {
			caption: hasCaption,
			linkPreview: false
		}).then(response => {
			return res.json({
				Status: "Success",
				message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').success
			});
		}).catch(err => {
			return res.status(500).json({
				Status: "Fail",
				message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').error
			});
		});
	} else {
		return res.status(500).json({
			Status: "Fail",
			message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').error
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
	var isHid;
	if ((Debug('OPTIONS').protect == 1 || Debug('OPTIONS').protect == "true")) {
		if (req.body.pass != undefined) {
			isHid = req.body.pass;
		} else if (req.body.p != undefined) {
			isHid = req.body.p;
		} else {
			isHid = '';
		}
	} else {
		if ((Debug('OPTIONS').token == "" || Debug('OPTIONS').protect == undefined)) {
			isHid = Password[1];
		} else {
			isHid = (Debug('OPTIONS').token);
		}
	}
	const isWid = (req.body.to).replace(/[^0-9\\.]+/g, '');
	const isDDI = isWid.substr(0, 2);
	const isDDD = isWid.substr(2, 2);
	const isCall = isWid.slice(-8);
	var WhatsApp = isWid + '@c.us';
	if ((isDDI == '55') && (parseInt(isDDD) <= 30)) {
		WhatsApp = isWid.substr(0, 4) + '9' + isCall + '@c.us';
	} else if ((isDDI == '55') && (parseInt(isDDD) > 30)) {
		WhatsApp = isWid.substr(0, 4) + isCall + '@c.us';
	}
	const Mensagem = (req.body.msg).replaceAll("\\n", "\r\n").split("##");
	if (Debug('OPTIONS').schedule <= Debug('OPTIONS').limiter) {
		var FUNCTION = [Debug('MKAUTH').bar, Debug('MKAUTH').pix, Debug('MKAUTH').qrpix, Debug('MKAUTH').qrlink, Debug('MKAUTH').pdf];
		const uID = await Dataset('TARGET', 'START', DateTime(), 'INSERT');
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
			Radeon['Name'] = 'Mwsm';
			if (Mensagem.some(Row => testJSON(Row)) && (FUNCTION.includes('true') || FUNCTION.includes('1')) && (Debug('MKAUTH').module == 1 || Debug('MKAUTH').module == "true")) {

				Mensagem.some(function(Send, index) {
					if (testJSON(Send) && (FUNCTION.includes('true') || FUNCTION.includes('1'))) {
						var Json = Send.toString().replace('"', '').split(',');
						isUid = Json[0].replace(/[{\}\\"]/g, '');
						if (isUid.split(':').length == 2) {
							isUid = isUid.split(':')[1];
						} else {
							isUid = (isUid).replace(isUid.split(':')[0], '');
							isUid = isUid.replace(/^:+/, '');
						}
						isFind = Json[1].replace(/[^0-9]/g, '');
						Json = {
							uid: isUid,
							find: isFind
						};
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
								Radeon['Name'] = Synchronization.Name;
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
							var Json = Send.toString().replace('"', '').split(',');
							isUid = Json[0].replace(/[{\}\\"]/g, '');
							if (isUid.split(':').length == 2) {
								isUid = isUid.split(':')[1];
							} else {
								isUid = (isUid).replace(isUid.split(':')[0], '');
								isUid = isUid.replace(/^:+/, '');
							}
							isFind = Json[1].replace(/[^0-9]/g, '');
							Json = {
								uid: isUid,
								find: isFind
							};
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
						Terminal(JDebug);
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
				var isArray = {};
				(Mensagem).someAsync(async (Send) => {
					if (Debug('ATTACHMENTS', 'SUFFIXES', 'MULTIPLE').some(Row => Send.includes(Row))) {
						const isCloud = async (Url) => {
							let isMimetype;
							const isAttachment = await axios.get(Url, {
								responseType: 'arraybuffer'
							}).then(response => {
								isMimetype = response.headers['content-type'];
								return response.data.toString('base64');
							});
							return await new MessageMedia(isMimetype, isAttachment, 'Media');
						};

						await isCloud(Send).then(Return => {
							isArray[Send] = Return;
							resolve(isArray);
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
									if (Retorno[1][Send] != undefined) {
										if (Retorno[1].hasOwnProperty(Send)) {
											Assembly.push(Retorno[1][Send]);
										}

									}
								} else {
									Assembly.push(Send);
								}
							} else {
								if (Retorno[1][Send] != undefined) {
									if (Retorno[1].hasOwnProperty(Send)) {
										Assembly.push(Retorno[1][Send]);
									}
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
						db.get("SELECT * FROM target WHERE id='" + uID + "'", (err, TARGET) => {
							if (TARGET != undefined) {
								if (Retorno[0].Title == "xxx") {
									Retorno[0].Title = uID;
								}
								if (Retorno[0].Message == undefined) {
									Retorno[0].Message = "Null";
								}
								if (Retorno[0].Message == "False") {
									Retorno[0].Message = "Fail";
								}

								db.serialize(() => {
									db.run("UPDATE target SET end=?, status=?, target=?, title=?, client=? WHERE id=?", [DateTime(), Retorno[0].Message, WhatsApp.replace(/^55+/, '').replace(/\D/g, ''), Retorno[0].Title, Retorno[0].Name, uID], (err) => {
										if (err) throw err;
									});
									db.get("SELECT * FROM target WHERE id='" + uID + "'", (err, TARGET) => {
										isTARGET = [];
										if (TARGET != undefined) {
											Debug('TARGET', '*', 'ALL').some(function(TARGET, index) {
												if (TARGET.status == 'pending') {
													Dataset('TARGET', '*', TARGET.id, 'DELETE');
													Dataset('SQLITE_SEQUENCE', 'SEQ', 'TARGET', 'FLUSH');
												} else {
													GetLog = {
														"ID": TARGET.id,
														"TITLE": TARGET.title,
														"NAME": TARGET.client,
														"START": TARGET.start,
														"END": TARGET.end,
														"TARGET": TARGET.target,
														"STATUS": TARGET.status,
													};
													isTARGET.push(GetLog);
													if (Debug('TARGET', '*', 'ALL').length <= (index + 1)) {
														if ((Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
															global.io.emit('setlog', isTARGET);
														}
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


										if ([Debug('OPTIONS').token, Password[1]].includes(isHid)) {
											client.sendMessage(WhatsApp, Send, {
												caption: Caption,
												linkPreview: Preview
											}).then(response => {
												Wait = WhatsApp;
												Sending = (Sending + 1);
											}).catch(err => {
												return res.status(500).json({
													Status: "Fail",
													message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').error
												});
											});

										} else {
											return res.status(500).json({
												Status: "Fail",
												message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').error
											});
										}

										if ((Sending == Assembly.length) || (Assembly.length == (index + 1))) {

											db.get("SELECT * FROM target WHERE id='" + uID + "'", (err, TARGET) => {
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
														db.run("UPDATE target SET end=?, status=?, target=?, title=?, client=? WHERE id=?", [DateTime(), 'Sent', WhatsApp.replace(/^55+/, '').replace(/\D/g, ''), Retorno[0].Title, Retorno[0].Name, uID], (err) => {

															if (err) throw err;
														});
														db.get("SELECT * FROM target WHERE id='" + uID + "'", (err, TARGET) => {
															isTARGET = [];
															if (TARGET != undefined) {
																Debug('TARGET', '*', 'ALL').some(function(TARGET, index) {
																	if (TARGET.status == 'pending') {
																		Dataset('TARGET', '*', TARGET.id, 'DELETE');
																		Dataset('SQLITE_SEQUENCE', 'SEQ', 'TARGET', 'FLUSH');
																	} else {
																		GetLog = {
																			"ID": TARGET.id,
																			"TITLE": TARGET.title,
																			"NAME": TARGET.client,
																			"START": TARGET.start,
																			"END": TARGET.end,
																			"TARGET": TARGET.target,
																			"STATUS": TARGET.status,
																		};
																		isTARGET.push(GetLog);
																		if (Debug('TARGET', '*', 'ALL').length <= (index + 1)) {
																			if ((Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
																				global.io.emit('setlog', isTARGET);
																			}
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
												message: Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').success
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
										db.get("SELECT * FROM target WHERE id='" + uID + "'", (err, TARGET) => {
											isTARGET = [];
											if (TARGET != undefined) {
												Debug('TARGET', '*', 'ALL').some(function(TARGET, index) {
													if (TARGET.status == 'pending') {
														Dataset('TARGET', '*', TARGET.id, 'DELETE');
														Dataset('SQLITE_SEQUENCE', 'SEQ', 'TARGET', 'FLUSH');
													} else {
														GetLog = {
															"ID": TARGET.id,
															"TITLE": TARGET.title,
															"NAME": TARGET.client,
															"START": TARGET.start,
															"END": TARGET.end,
															"TARGET": TARGET.target,
															"STATUS": TARGET.status,
														};
														isTARGET.push(GetLog);
														if (Debug('TARGET', '*', 'ALL').length <= (index + 1)) {
															if ((Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
																global.io.emit('setlog', isTARGET);
															}
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

								db.get("SELECT * FROM target WHERE id='" + uID + "'", (err, TARGET) => {
									if (TARGET != undefined) {

										if (Retorno[0].Title == "xxx") {
											Retorno[0].Title = uID;
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
											db.get("SELECT * FROM target WHERE id='" + uID + "'", (err, TARGET) => {
												isTARGET = [];
												if (TARGET != undefined) {
													Debug('TARGET', '*', 'ALL').some(function(TARGET, index) {
														if (TARGET.status == 'pending') {
															Dataset('TARGET', '*', TARGET.id, 'DELETE');
															Dataset('SQLITE_SEQUENCE', 'SEQ', 'TARGET', 'FLUSH');
														} else {
															GetLog = {
																"ID": TARGET.id,
																"TITLE": TARGET.title,
																"NAME": TARGET.client,
																"START": TARGET.start,
																"END": TARGET.end,
																"TARGET": TARGET.target,
																"STATUS": TARGET.status,
															};
															isTARGET.push(GetLog);
															if (Debug('TARGET', '*', 'ALL').length <= (index + 1)) {
																if ((Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
																	global.io.emit('setlog', isTARGET);
																}
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
							db.get("SELECT * FROM target WHERE id='" + uID + "'", (err, TARGET) => {
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
										db.get("SELECT * FROM target WHERE id='" + uID + "'", (err, TARGET) => {
											isTARGET = [];
											if (TARGET != undefined) {
												Debug('TARGET', '*', 'ALL').some(function(TARGET, index) {
													if (TARGET.status == 'pending') {
														Dataset('TARGET', '*', TARGET.id, 'DELETE');
														Dataset('SQLITE_SEQUENCE', 'SEQ', 'TARGET', 'FLUSH');
													} else {
														GetLog = {
															"ID": TARGET.id,
															"TITLE": TARGET.title,
															"NAME": TARGET.client,
															"START": TARGET.start,
															"END": TARGET.end,
															"TARGET": TARGET.target,
															"STATUS": TARGET.status,
														};
														isTARGET.push(GetLog);
														if (Debug('TARGET', '*', 'ALL').length <= (index + 1)) {
															if ((Debug('OPTIONS').auth == 1 || Debug('OPTIONS').auth == "true")) {
																global.io.emit('setlog', isTARGET);
															}
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


// WhatsApp Bot
client.on('message', async msg => {
	const nomeContato = msg._data.notifyName;
	let groupChat = await msg.getChat();

	if (msg.type.toLowerCase() == "e2e_notification") return null;
	if (msg.body == "") return null;
	if (msg.from.includes("@g.us")) return null;
	const NULLED = [undefined, "XXX", null, ""];
	var isWid = msg.from;
	const RegEx = new Set("!@#:$%^&*()_");
	for (let Return of isWid) {
		if (RegEx.has(Return)) {
			isWid = isWid.replace(Return, '%');
		}
	}
	isWid = isWid.split("%")[0];
	const isDDI = isWid.substr(0, 2);
	const isDDD = isWid.substr(2, 2);
	const isCall = isWid.slice(-8);
	var WhatsApp = isWid + '@c.us';
	if ((isDDI == '55') && (parseInt(isDDD) <= 30)) {
		WhatsApp = isWid.substr(0, 4) + '9' + isCall + '@c.us';
	} else if ((isDDI == '55') && (parseInt(isDDD) > 30)) {
		WhatsApp = isWid.substr(0, 4) + isCall + '@c.us';
	}
	const isWhatsApp = WhatsApp.split("@")[0];
	if (msg.body.toUpperCase().includes("TOKEN") && NULLED.includes(Debug('OPTIONS').token)) {
		if (msg.body.includes(":") && (msg.body.split(":")[1].length == 7)) {
			db.run("UPDATE options SET token=?", [msg.body.split(":")[1]], (err) => {
				if (err) throw err;
				console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').saved);
				global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').saved);
				msg.reply(Debug('CONSOLE').saved);
			});
		} else {
			console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').wrong);
			global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').wrong);
			msg.reply(Debug('CONSOLE').wrong);
		}
	} else {
		db.serialize(() => {
			db.get("SELECT * FROM replies WHERE whats='" + isWhatsApp + "'", (err, REPLIES) => {
				if (REPLIES == undefined) {
					db.run("INSERT INTO replies(whats,date,count) VALUES(?, ?, ?)", [isWhatsApp, register, 1], (err) => {
						if (err) {
							console.log('> ' + Debug('OPTIONS').appname + ' : ' + err)
						}
						console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').inserted);
						global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').inserted);
						MsgBox = true;
					});

				} else {

					if (register.toString() > REPLIES.date) {
						db.run("UPDATE replies SET date=?, count=? WHERE whats=?", [register, 1, isWhatsApp], (err) => {
							if (err) {
								console.log('> ' + Debug('OPTIONS').appname + ' : ' + err)
							}
							console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').updated);
							global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').updated);
							MsgBox = true;
						});
					} else {
						if (Debug('OPTIONS').count > REPLIES.count) {
							COUNT = REPLIES.count + 1;
							db.run("UPDATE replies SET count=? WHERE whats=?", [COUNT, isWhatsApp], (err) => {
								if (err) throw err;
								console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').updated);
								global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').updated);
								MsgBox = true;
							});
						} else {
							console.log('> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').found);
							global.io.emit('message', '> ' + Debug('OPTIONS').appname + ' : ' + Debug('CONSOLE').found);
							MsgBox = false;

						}
					}
				}
			});

			db.get("SELECT * FROM replies WHERE whats='" + msg.from.replaceAll('@c.us', '') + "'", (err, REPLIES) => {
				if (err) {
					console.log('> ' + Debug('OPTIONS').appname + ' : ' + err)
				}
				if (REPLIES != undefined) {
					if (MsgBox && (Debug('OPTIONS').onbot == 1 || Debug('OPTIONS').onbot == "true") && (msg.body != null || msg.body == "0" || msg.type == 'ptt' || msg.hasMedia)) {
						if ((Debug('OPTIONS').replyes == 1 || Debug('OPTIONS').replyes == "true")) {
							msg.reply(Debug('OPTIONS').response);
						} else {
							const Mensagem = (Debug('OPTIONS').response).replaceAll("\\n", "\r\n").split("##");
							Mensagem.some(function(Send, index) {
								setTimeout(function() {
									client.sendMessage(WhatsApp, Send).then().catch(err => {
										console.log(err);
									});

								}, Math.floor(Delay + Math.random() * 1000));

							});

						}
					}
				}
			});

		});
	}
});

client.on('call', async (call) => {
	var isWid = call.from;
	const RegEx = new Set("!@#:$%^&*()_");
	for (let Return of isWid) {
		if (RegEx.has(Return)) {
			isWid = isWid.replace(Return, '%');
		}
	}
	isWid = isWid.split("%")[0];
	const isDDI = isWid.substr(0, 2);
	const isDDD = isWid.substr(2, 2);
	const isCall = isWid.slice(-8);
	var WhatsApp = isWid + '@c.us';
	if ((isDDI == '55') && (parseInt(isDDD) <= 30)) {
		WhatsApp = isWid.substr(0, 4) + '9' + isCall + '@c.us';
	} else if ((isDDI == '55') && (parseInt(isDDD) > 30)) {
		WhatsApp = isWid.substr(0, 4) + isCall + '@c.us';
	}
	const Mensagem = (Debug('OPTIONS').call).replaceAll("\\n", "\r\n").split("##");

	if ((Debug('OPTIONS').reject == 1 || Debug('OPTIONS').reject == "true")) {
		setTimeout(function() {
			call.reject().then(() => {
				if ((Debug('OPTIONS').alert == 1 || Debug('OPTIONS').alert == "true")) {

					Mensagem.some(function(Send, index) {
						setTimeout(function() {
							client.sendMessage(WhatsApp, Send).then().catch(err => {
								console.log(err);
							});

						}, Math.floor(Delay + Math.random() * 1000));
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
