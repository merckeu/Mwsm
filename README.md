# MkAuth WhatsApp Send Message

[![Mikrotik](https://mikrotik.com/img/mtv2/newlogo.svg)](https://mikrotik.com/)


### Funcionalidade:
* Enviar mensagens de texto via whatsapp para clientes cadastrados no mkauth

### Requisitos :
* Servidor Linux CT ProxMox ou Direto no MkAuth

### Instalação :
<details>
<summary>Container Individual ProxMox</summary>
<br>
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
<b>5 - </b>Instale o npm
```sh
npm install
```

<b>6 - </b>Configure a auto-inicialização
```sh
npm install pm2 -g && pm2 start mwsm.js --name Bot-Mwsm --watch && pm2 save && pm2 startup
```
</details>


<details>
<summary>Integrado ao MkAuth 24.01</summary>
<br>

Video : https://www.youtube.com/watch?v=mJ0DGPGd7Ps

<b>1 - </b>Atualize o sistema
```sh
sudo apt update
```

<b>2 - </b>Instale as dependencias necessarias
```sh
sudo apt install git curl
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
<b>6 - </b>Instale o npm
```sh
sudo npm install
```

<b>7 - </b>Configure a auto-inicialização
```sh
sudo npm install pm2 -g && pm2 start mwsm.js --name Bot-Mwsm --watch && pm2 save && pm2 startup
```

</details>


### Configuração :

<details>
<summary>Servidor Web</summary>
<br>
  
<b>1 - </b>Acesse o arquivo de configuração do servidor via prompt
```sh
sudo nano /var/api/Mwsm/mwsm.js
```
Altere o valor conforme suas necessidades.

| Nome           | Valor          | Função                                                          |
| -------------- | -------------- | --------------------------------------------------------------- |
| `interval`     | `1000` =  1s   | Tempo de disparo entre mensagens condicionadas com a TAG `##`.  |
| `sendwait`     | `30000` = 30s  | Tempo de disparo entre mensagens de modo geral.                 |
| `access`       | `8000`         | Porta de acesso do sistema/interface.                           |


<b>2 - </b>Acesse seu servidor web através do IP:PORTA
[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/node.png)](#)

<b>3 - </b>Aguarde a geração do QRCode

<b>4 - </b>Faça a leitura do QRCode com o WhatsApp

** `Menu > Aparelhos Conectados > Conectar um Aparelho`

</details>

<details>
<summary>Mkauth</summary>
<br>
<b>1 - </b>Configure seu servidor no MKAuth seguindo as instruções do servidor Web

** `Opções > Servidor de SMS > Servidor`
[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/mkauth.png)](#)
</details>

### Extras :

<details>
<summary>Tags</summary>
<br>

| Tag            | Efeito         | Exemplo                                                         |
| -------------- | -------------- | --------------------------------------------------------------- |
| `\n` ou `##`   | quebra balão   | Mensagem1`##`Mensagem2`##`Mensagem3                             |
| `*`            | negrito        | `*`Mensagem`*`                                                  |

</details>

<details>
<summary>Update</summary>
<br>
  
```sh
sudo wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/mwsm.js -O /var/api/Mwsm/mwsm.js
```
</details>

<details>
<summary>Utilização</summary>
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



