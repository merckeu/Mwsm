# MkAuth WhatsApp Send Message

[![Mikrotik](https://mikrotik.com/img/mtv2/newlogo.svg)](https://mikrotik.com/)


### Funcionalidade:
* Enviar mensagens de texto via whatsapp para clientes cadastrados no mkauth

### Requisitos :
* Servidor Linux [ Testado no ProxMox - Ubuntu 23.04 ]
  
### Instalação no Linux via ProxMox

1 - Atualize seu sistema
```sh
apt update
```
```sh
apt upgrade -y
```

2 - Instale as dependencias necessarias
```sh
apt-get install git curl libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev libasound2 -y
```

3 - Instale o node
```sh
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && apt-get install -y nodejs
```

4 - Instale o Mwsm
```sh
git clone https://github.com/MKCodec/Mwsm.git /var/api/Mwsm && cd /var/api/Mwsm
```
5 - Instale o npm
```sh
npm install
```

6 - Configure a auto-inicialização
```sh
npm install pm2 -g && pm2 start mwsm.js --name Bot-Mwsm --watch && pm2 save && pm2 startup
```

### Configurando o Servidor
1 - Acesse seu servidor web através do IP:8000
[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/node.png)](#)

2 - Aguarde a geração do QRCode

3 - Faça a leitura do QRCode com o WhatsApp

** `Menu > Aparelhos Conectados > Conectar um Aparelho`

4 - Configure seu servidor no MKAuth seguindo as instruções do servidor Web

** `Opções > Servidor de SMS > Servidor`
[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/mkauth.png)](#)

### Finalizado
Se tudo tiver ocorrido como o esperado, seu servidor mkauth ja estara conseguindo disparar mensagens para seus clientes bastando somente configurar as mensagens automaticas e marcar a opção receber SMS na gua financeiro de cada cliente
