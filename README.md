# MkAuth WhatsApp Send Message - v2.0 Beta 2

[![Mikrotik](https://mikrotik.com/img/mtv2/newlogo.svg)](https://mikrotik.com/)

 >>>> Utilize o comando Upgrade para atualizar/corrigir versões (v1/v2) ja instaladas <<<<

### Novidades v2.0 Beta 2:
* Integração do Banco de Dados SQLite
* Interface Web com Controle de Funções
  

### Funcionalidade:
* Enviar mensagens de texto via whatsapp para clientes cadastrados no mkauth

### Requisitos :
* Servidor Linux

### Instalação :
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
npm install 
```

<b>6 - </b>Configure a auto-inicialização
```sh
pm2 start mwsm.json && pm2 save && pm2 startup && pm2 log 0
```


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
| `replyes`      |                   | Marcar conversas em resposta automaticas.                       |
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
<summary>Update e/ou Upgrade</summary>
<br>
  
```sh
clear
cd ~ && rm -r /var/api/Mwsm
pm2 delete all
sudo apt-get remove nodejs -y && curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && apt-get install -y nodejs
git clone https://github.com/MKCodec/Mwsm.git /var/api/Mwsm && cd /var/api/Mwsm
npm install && pm2 start mwsm.json && pm2 save && pm2 startup && pm2 log 0

```

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



