const GetUpdate = async (GET, SET) => {
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
			for (let i = 1; i < (isUpdate.version).length; i++) {
				if ((isUpdate.version)[i].patch >= Return.patch) {
					if (((isUpdate.version)[i].patch) > (isDateTime)) {
						await global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').isfound);
						console.log('> Bot-Mwsm : ' + Debug('CONSOLE').isfound);
						if (SET && (Debug('RELEASE').isupdate == 1 || Debug('RELEASE').isupdate == "true")) {
							const Register = await Insert('RELEASE', 'MWSM', ((isUpdate.version)[i].patch), true);
							if (Register) {
								await global.io.emit('upgrade', true);
								console.log('> Bot-Mwsm : ' + Debug('CONSOLE').isupfiles);
								console.log('> Bot-Mwsm : ' + Debug('CONSOLE').isupdated);
								await global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').isupdated);
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
									await global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').isalready);
									await console.log('> Bot-Mwsm : ' + Debug('CONSOLE').isalready);
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
										const Register = await Insert('RELEASE', 'MWSM', ((isUpdate.version)[i].patch), true);
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
											await global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').isneeds);
											await console.log('> Bot-Mwsm : ' + Debug('CONSOLE').isneeds);
										}

									}
								} else {
									if (Conclusion) {
										Conclusion = false;
										if (SET == false) {
											await global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').isalready);
											console.log('> Bot-Mwsm : ' + Debug('CONSOLE').isalready);
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
								await global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').isalready);
								console.log('> Bot-Mwsm : ' + Debug('CONSOLE').isalready);
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
						await global.io.emit('message', '> Bot-Mwsm : ' + Debug('CONSOLE').isneeds);
						console.log('> Bot-Mwsm : ' + Debug('CONSOLE').isneeds);
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
	limit: '200mb'
}));
app.use(express.urlencoded({
	limit: '200mb',
	extended: true
}));
app.use(express.text({
	limit: '200mb'
}));
