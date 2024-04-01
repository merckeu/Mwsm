# MkAuth WhatsApp Send Message - v2.0 Beta 4 (30/03/2024)

[![Mikrotik](https://mikrotik.com/img/mtv2/newlogo.svg)](https://mikrotik.com/)

 > ### Mantenha sua aplicação sempre atualizada ###
<details>
<summary>Upgrade v1 => v2</summary>
 <br> 
<details>
<summary>ProxMox</summary>
  
```sh
cd ~ && cd /var/api/Mwsm && pm2 delete all && pm2 kill && npm remove pm2 -g && mkdir -p ~/.pm2/node_modules/ && cd ~ && rm -r /var/api/Mwsm
git clone https://github.com/MKCodec/Mwsm.git /var/api/Mwsm && cd /var/api/Mwsm
npm install --silent && npm i -g pm2 && pm2 update && pm2 flush && pm2 start mwsm.json && pm2 save && pm2 startup && pm2 log 0
```

</details>
<details>
<summary>MkAuth</summary>
  
```sh
sudo apt-get install build-essential
```
```sh
cd ~ && cd /var/api/Mwsm
```
```sh
sudo pm2 delete all && pm2 kill && npm remove pm2 -g
```
```sh
sudo mkdir -p ~/.pm2/node_modules/
```
```sh
cd ~ && rm -r /var/api/Mwsm
```
```sh
sudo git clone https://github.com/MKCodec/Mwsm.git /var/api/Mwsm && cd /var/api/Mwsm
```
```sh
sudo npm install --silent
```
```sh
sudo npm i -g pm2 && pm2 update && pm2 flush && pm2 start mwsm.json && pm2 save && pm2 startup && pm2 log 0
```
</details>
<br>
</details>
<details>
<summary>Update v2 => v2 Beta++</summary>
 
> ### Após rodar o comando reconfigure as opções no menu settings ###

```sh
wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/index.html -O /var/api/Mwsm/index.html
wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/mwsm.db -O /var/api/Mwsm/mwsm.db
wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/mwsm.js -O /var/api/Mwsm/mwsm.js
wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/style.css -O /var/api/Mwsm/style.css
wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/script.js -O /var/api/Mwsm/script.js
wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/package.json -O /var/api/Mwsm/package.json
cd /var/api/Mwsm && sudo pm2 restart Bot-Mwsm --update-env

```

</details>

### Novidades V2

| Versão     | Recurso                                                                              |
| ---------- | ------------------------------------------------------------------------------------ |
|  beta 1    |  Integração do Banco de Dados SQLite |
|  beta 2    |  Interface Web com Controle de Funções |
|  beta 3    |  Correção da função Reply que não estava funcionando |
|  beta 4    |  Adcionado proteção por token randomico para alteração das funções do menu settings |

> ### ATENÇÃO:
> O token será enviado para o mesmo whatsapp utilizado na leitura do qrcode da api
  

### Funcionalidade:
* Enviar mensagens de texto via whatsapp para clientes cadastrados no mkauth

### Requisitos :
* Servidor Linux ( Container ubuntu ) Proxmox ou Mkauth

### Instalação :
<details>
<summary>Proxmox</summary>
  <b>OBS:</b> é necessario instalar uma distribuição linux no proxmox antes de inserir os codigos abaixo
<br><br>
  
<b>1 - </b>Atualize seu sistema
```sh
apt update
```
```sh
apt upgrade -y
```

<b>2 - </b>Instale as dependencias necessarias
```sh
apt-get install git curl libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev libasound2 -y
```

<b>3 - </b>Instale o node
```sh
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && apt-get install -y nodejs
```

<b>4 - </b>Instale o Mwsm
```sh
git clone https://github.com/MKCodec/Mwsm.git /var/api/Mwsm && cd /var/api/Mwsm
```
<b>5 - </b>Instale as dependencias do Mwsn
```sh
npm install && npm run start:mwsm
```

</details>

<details>
<summary>Mkauth</summary>
<br><br>
  
<b>1 - </b>Atualize seu sistema
```sh
sudo apt update
```

<b>2 - </b>Instale as dependencias necessarias
```sh
sudo apt install git curl build-essential
```
```sh
sudo apt-get install ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
```

<b>3 - </b>Instale o node
```sh
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && apt-get install -y nodejs
```
<b>4 - </b>Crie o diretório de instalação do Mwsm
```sh
sudo mkdir -p /var/api/Mwsm
```

<b>5 - </b>Instale o Mwsm
```sh
sudo git clone https://github.com/MKCodec/Mwsm.git /var/api/Mwsm && cd /var/api/Mwsm
```

<b>6 - </b>Instale as dependencias do Mwsn
```sh
sudo npm install --silent
```

<b>7 - </b>Inicialize o Mwsn
```sh
sudo npm run start:mwsm
```

</details>


### Utilização & Configuração :
<br>

<b>1 - </b>Acesse seu servidor web através do IP:PORTA
[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/node.png)](#)

<b>2 - </b>Aguarde a geração do QRCode

<b>3 - </b>Faça a leitura do QRCode com o WhatsApp

** `Menu > Aparelhos Conectados > Conectar um Aparelho`

[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/Options.png)](#)

Altere o valor conforme suas necessidades.

| Nome           | Valor             | Função                                                          |
| -------------- | ----------------- | --------------------------------------------------------------- |
| `interval`     | `1000` =  1s      | Tempo de disparo entre mensagens condicionadas com a TAG `##`.  |
| `sendwait`     | `30000` = 30s     | Tempo de disparo entre mensagens de modo geral.                 |
| `access`       | `8000`            | Porta de acesso do sistema/interface.                           |
| `pixfail`      |                   | Chave Pix Manual em caso de falha do mkauth.                    |
| `response`     |                   | Resposta Automatica.                                            |
| `replies`      |                   | Marcar conversas em resposta automaticas.                       |
| `count`        | `1`               | Quantidade de Auto-Respostas por usuario (renovado todo dia)    |


<br>
<b>4 - </b>Configure seu servidor no MKAuth seguindo as instruções do servidor Web

** `Opções > Servidor de SMS > Servidor`
[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/mkauth.png)](#)

### Extras :

<details>
<summary>Tags</summary>
<br>

| Tag            | Efeito         | Exemplo                                                         |
| -------------- | -------------- | --------------------------------------------------------------- |
| `##`   | quebra balão   | Mensagem1`##`Mensagem2`##`Mensagem3                                     |
| `\n`   | quebra linha   | Linha1`\n`Linha2`\n`Linha3                                     |
| `*`    | negrito        | `*`Mensagem`*`                                                          |

</details>

<details>
<summary>Teste</summary>
<br>
Para testar utilize o comando abaixo no Prompt

`DDDNUMERO` : Troque pelo numero com DDD

`MENSAGEM` : Troque pela sua mensagem

`IPDOSERVIDOR` : Troque pelo ip do servidor

`PORTA` : Troque pela porta do servidor

```sh
sudo curl -d "to=55DDDNUMERO&msg=MENSAGEM" --header "application/x-www-form-urlencoded" -X POST http://IPDOSERVIDOR:PORTA/send-message
```
</details>

### DOAÇÕES PIX :
Contribua com a sobrevivência desse projeto estimulando melhorias e atualizações.

![Pix](https://github.com/MKCodec/Mwsm/assets/143403919/24660f85-17d0-4de4-94e7-de85828a9265)


```sh
e9b9d669-4412-4dec-994c-310005904088
```

```sh
00020126580014BR.GOV.BCB.PIX0136e9b9d669-4412-4dec-994c-3100059040885204000053039865802BR5924CLEBER FERREIRA DE SOUZA6007CARUARU62070503***63045854
```



