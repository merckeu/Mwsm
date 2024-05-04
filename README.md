# MkAuth WhatsApp Send Message v2 beta 16 (01/05/24)

![Mikrotik](https://mikrotik.com/img/mtv2/newlogo.svg)

 > ### Mantenha sua aplicação sempre atualizada ###
<details>
<summary>Upgrade v1 => v2</summary>
 <br> 
<details>
<summary>ProxMox</summary>
  
```sh
sudo apt-get install build-essential && cd ~ && cd /var/api/Mwsm && pm2 delete all && pm2 kill && npm remove pm2 -g && mkdir -p ~/.pm2/node_modules/ && cd ~ && rm -r /var/api/Mwsm && git clone https://github.com/MKCodec/Mwsm.git /var/api/Mwsm && cd /var/api/Mwsm && npm install --silent && npm i -g pm2 && pm2 update && pm2 flush && pm2 start mwsm.json && pm2 save && pm2 startup && pm2 log 0
```

</details>
<details>
<summary>MkAuth</summary>
  
```sh
cd ~ && cd /var/api/Mwsm && pm2 kill && pm2 delete all && npm remove pm2 -g || apt-get remove nodejs -y && rm -vrf ~/.pm2/node_modules /var/api/Mwsm && apt-get install -y ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils git curl build-essential && curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && apt-get install -y nodejs && cd ~ && mkdir -p /var/api/Mwsm && git clone https://github.com/MKCodec/Mwsm.git /var/api/Mwsm  && cd /var/api/Mwsm && npm i git+https://github.com/MKCodec/WhatsApp-API && npm install github:MKCodec/WhatsApp-API && npm install --silent && npm i -g pm2 && pm2 update && pm2 flush && pm2 start mwsm.json && pm2 save && pm2 startup && pm2 log 0
```
</details>
<br>
</details>
<details>
<summary>Update v2 => v2 Beta++</summary>
 
> ### Após rodar o comando reconfigure as opções no menu settings ###

```sh
cd ~ && cd /var/api/Mwsm && pm2 delete all && pm2 kill && git reset --hard HEAD~1 && git pull "https://github.com/MKCodec/Mwsm.git" --rebase --autostash && npm install --silent && npm run start:mwsm

```

</details>

### Novidades V2.0.16++
| Versão     | Recurso                                                                              |
| ---------- | ------------------------------------------------------------------------------------ |
|  beta 16   |  Integração 100% com API de Cobranças do MKauth                                      |


### Funcionalidade:
* Enviar mensagens de texto e/ou anexos via whatsapp para clientes cadastrados no mkauth

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
apt-get install git curl libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev libasound2 build-essential -y
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
npm install --silent && npm run start:mwsm
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


### Configuração :
<details>
<summary>Mkauth</summary>
<br>
<b>1 - </b>Configure seu servidor no MKAuth seguindo as instruções do servidor Web

** `Opções > Servidor de SMS > Servidor`
[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/mkauth.png)](#)


<b>2 - </b>Habilite a API do MKauth

** `Provedor > Controle de Usuarios > API`

Copie ambos os codigos ( client e secret ), habilite a opção `Endpoint titulo.api GET` e clique em `gravar`

<b>Obs:</b> a api do mkauth aceita conexões somente via https, certifique-se de possuir um dominio com certificado SSL.
<br>
<br>

</details>


<details>
<summary>WebAdmin</summary>

<b>1 - </b>Acesse seu servidor web através do IP:PORTA

[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/terminal.png)](#)

<b>2 - </b>Aguarde a geração do QRCode

<b>3 - </b>Faça a leitura do QRCode com o WhatsApp

** `Menu > Aparelhos Conectados > Conectar um Aparelho`

<b>4 - </b>Entre no whatsapp que acabou de conectar e pegue o token temporario para acessar as configurações

<b>OBS:</b> para criar um token fixo envie o comando como mensagem de outro celular para o numero conectado a API

  ```sh
Token:SENHA
```
<b>TOKEN</b> = *Comando* | <b>:</b> = *Divisor* | <b>SENHA</b> { altere para sua senha de 7 digitos }


<b>5 - </b>Altere o valor conforme suas necessidades.

[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/settings.png)](#)

| Nome           | Default           | Função                                                          |
| -------------- | ----------------- | --------------------------------------------------------------- |
| `Break`        | `1 segundo`       | Tempo de disparo entre mensagens condicionadas com a TAG `##`.  |
| `Sleep`        | `30 segundos`     | Tempo de disparo entre mensagens com numeros diferentes.        |
| `Access`       | `8000`            | Porta de acesso do sistema/interface.                           |
| `Pixfail`      |                   | Chave Pix Manual em caso de falha do mkauth.                    |
| `Response`     | `on`              | Resposta Automatica.                                            |
| `Replies`      | `on`              | Marcar conversas em resposta automaticas.                       |
| `Counter`      | `1`               | Quantidade de Auto-Respostas por usuario (renovado todo dia)    |



<b>6 - </b>Insiria os codigos extraidos do mkauth no Mwsm via webadmin ( Settings > API ).

<b>OBS:</b> Por padrão o delay ideal é 2s porem se sua API disparar de forma desordenada considere elevar esse valor.

[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/sync.png)](#)

| Nome           |  Função                                                         |
| -------------- |   --------------------------------------------------------------|
| `Delay`        | Tempo de espera para disparo de mensagens ordenadas.            |
| `MkAuth Link`  | Habilita a sincronia com a API do MkAuth.                       |
| `BAR`          | Envia codigo de barras.                                         |
| `PIX`          | Envia codigo pix copia e cola                                   |
| `QR`           | Envia imagem do Qrcode pix.                                     |
| `QRL`          | Envia link pix Para acessar QRCode e Copia e cola.              |
| `PDF`          | Envia Boleto em PDF                                             |


</details>

### Utilização :
<details>
<summary>API MkAuth</summary>
<br>
 
> Utilize o simulador do mkauth antes de colocar em produção : `settings > Options > Run`.
 
[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/msn.png)](#)
 
> Exemplo para teste no webadmin ( mkauth simulator )
> ```sh
> {"uid":"E5:BE:ED:DE:2E:EF","find":"415"}
> ```
> Exemplo de utilização no mkauth
> ```sh
> {"uid":"%logincliente%","find":"%numerotitulo%"}
> ```
> É possivel combinar a Utilização com a tag ## seguindo o exemplo abaixo:
> ```sh
> Mensagem1##https://via.placeholder.com/350x150.png##Mensagem3##{"uid":"%logincliente%","find":"%numerotitulo%"}##Mensagem5
> ```
 
</details>


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

### DOAÇÕES PIX :
Contribua com a sobrevivência desse projeto estimulando melhorias e atualizações.

![Pix](https://github.com/MKCodec/Mwsm/assets/143403919/24660f85-17d0-4de4-94e7-de85828a9265)


```sh
e9b9d669-4412-4dec-994c-310005904088
```

```sh
00020126580014BR.GOV.BCB.PIX0136e9b9d669-4412-4dec-994c-3100059040885204000053039865802BR5924CLEBER FERREIRA DE SOUZA6007CARUARU62070503***63045854
```



