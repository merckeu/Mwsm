#!/bin/bash
   echo "--- UPGRADING Mwsm ---"
   clear
   cd /var/api/Mwsm
   pm2 delete all
   pm2 flush
   if [[ $(npm view sqlite3 version -rs) == "5.1.7" ]]; then
       echo "SQLite Instaled"
   else
       npm install sqlite3 -g
   fi
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/icon.png -O /var/api/Mwsm/icon.png
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/index.html -O /var/api/Mwsm/index.html
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/jquery.js -O /var/api/Mwsm/jquery.js
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/mkauth.png -O /var/api/Mwsm/mkauth.png
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/mwsm.db -O /var/api/Mwsm/mwsm.db
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/mwsm.js -O /var/api/Mwsm/mwsm.js
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/mwsm.json -O /var/api/Mwsm/mwsm.json
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/node.png -O /var/api/Mwsm/node.png
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/nodemon.json -O /var/api/Mwsm/nodemon.json
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/package.json -O /var/api/Mwsm/package.json
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/package-lock.json -O /var/api/Mwsm/package-lock.json
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/script.js -O /var/api/Mwsm/script.js
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/socket.io.js -O /var/api/Mwsm/socket.io.js
   wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/style.css -O /var/api/Mwsm/style.css
   pm2 start mwsm.json && pm2 save && pm2 startup
   clear
   pm2 log 0
