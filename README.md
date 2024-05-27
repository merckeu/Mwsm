# MkAuth WhatsApp Send Message v2 beta 32 (27/05/24)

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

 > ### ERROS ###
> Em Caso de Erros Habilite o Debbuger e Siga as Dicas do Guia de Utilização `Debugger` no Final da Pagina
>
> ** `Mwsm > Settings > Extras > Debugger`
>
No Caso do Erro Persistir Contate-nos no Forum do [mkauth](https://mk-auth.com.br/forum/topics/envio-de-mensagem-via-whatsapp-100-gratuito)

### Novidades V2.0.29++
| Versão     | Recurso                                                                              |
| ---------- | ------------------------------------------------------------------------------------ |
|  beta 29   | Função Log Inserida                                                                  |
|  beta 30   | Remoção do PixFail + Adesão do Call Reject ( Rejeição de Chamadas )                  |
|  beta 31   | Correção de Bug da Função Log                                                        |
|  beta 32   | Melhoria do tratamento de Erros da função Log                                   |

OBS: Função Log vai registrar somente os disparos via POST ou Simulador `settings > Options > Run` Simulator ON

### Compatibilidade [ MkAuth API ]
|                 | BAR | PIX | QR | QRL | PDF  |
| --------------------  | --- | --- | -- | --- | ---- |
|  Gerencianet     | ✅ | ✅  | ✅ | ✅ | ✅  | 
|  Iugu     | ✅ | ✅  | ✅ | ✅ | ✅  | 
|  Galaxpay     | ✅ | ✅  | ✅ | ✅ | ✅  | 
|  Santander     | ✅ | ❌  | ❌ | ❌ | ✅  | 

OBS: Compatibilidade Relatada por Usuarios Podendo Funcionar em Bancos/Gateways Ausentes Dessa Lista

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
<summary>Tutorial</summary>
<br>
<b>1 - </b>Habilite o Tunel Dev API do MKauth

** `Opções > Rede do Servidor > MkTunel > ( Ativar e Gravar )`

[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/dev.png)](#)


<b>2 - </b>Habilite o EndPoint (Titulos GET) do MkAuth

** `Provedor > Controle de Usuarios > API > ( Habilitar Endpoint titulo.api GET e Gravar )`

[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/endpoint.png)](#)

<b>3 - </b>Acesse seu servidor web através do IP:PORTA em uma nova aba do novegador

[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/terminal.png)](#)

<b>4 - </b>Aguarde a geração do QRCode

<b>5 - </b>Faça a leitura do QRCode com o WhatsApp

** `Whatsapp > Menu > Aparelhos Conectados > Conectar um Aparelho`

<b>6 - </b>Entre no whatsapp que acabou de conectar e pegue o token temporario para acessar as configurações

<b>OBS:</b> para criar um token fixo envie o comando como mensagem de outro celular para o numero conectado a API

  ```sh
Token:SENHA
```
<b>TOKEN</b> = *Comando* | <b>:</b> = *Divisor* | <b>SENHA</b> { altere para sua senha de 7 digitos }


<b>7- </b>Altere o valor conforme suas necessidades.

[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/settings.png)](#)

| Nome            | Default           | Função                                                          |
| --------------- | ----------------- | --------------------------------------------------------------- |
| `Break`         | `1 segundo`       | Tempo de disparo entre mensagens condicionadas com a TAG `##`.  |
| `Sleep`         | `30 segundos`     | Tempo de disparo entre mensagens com numeros diferentes.        |
| `Access`        | `8000`            | Porta de acesso do sistema/interface.                           |
| `Call`          |                   | Resposta após Receber uma Chamada.                              |
| `Wait`          | `1 segundo`       | Tempo para Rejeitar uma Chamada.                                |
| `Message      ` |                   | Resposta após Receber uma Mensagem.                             |
| `Auto-Response` | `on`              | Habilitar Resposta Automatica.                                  |
| `Replies`       | `on`              | Marcar conversas em resposta automaticas.                       |
| `Auto-Reject`   | `on`              | Habilitar Resposta de Chamadas Automatica.                      |
| `Alert`         | `on`              | Habilitar Mensagem de Resposta ao Rejeitar Chamadas.            |
| `Counter`       | `1`               | Quantidade de Auto-Respostas por usuario (renovado todo dia)    |



<b>8 - </b>Configure a API do MkAuth no Mwsm.
** `Mwsm > Settings > API`

| Campo     |  Dado                                                     |
| ----------|-------------------------------------------------------------|
| `TUNEL`   | Insira o URL encontrada em Tunel no passo 2 desse tutorial  |
| `CLIENT`  | Insira o Codigo encontrado em Client no passo 2 desse tutorial |
| `SECRET`  | Insira o Codigo encontrado em Secret no passo 2 desse tutorial |
| `DOMAIN`  | Insira o Dominio ou IP do seu mkauth                        |

[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/sync.png)](#)

| Nome           |  Função                                                         |
| -------------- |   --------------------------------------------------------------|
| `Delay`        | Tempo de espera para disparo de mensagens ordenadas.            |
| `MkAuth Link`  | Habilita a sincronia com a API do MkAuth.                       |
| `BAR`          | Envia codigo de barras.                                         |
| `PIX`          | Envia codigo pix copia e cola                                   |
| `QR`           | Envia imagem do Qrcode pix.                                     |
| `QRL`          | Envia link pix Para acessar QRCode e Copia e cola.              |
| `PDF`          | Envia Boleto em PDF                                             |

<b>OBS:</b> Por padrão o delay ideal é 2s porem se sua API disparar de forma desordenada considere elevar esse valor.

<b>9 - </b>Configure seu servidor no MKAuth seguindo as instruções do servidor Web

** `Opções > Servidor de SMS > Servidor`
[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/mkauth.png)](#)
</details>

### Utilização :
<details>
<summary>Tutorial</summary>
<br>
 
> Utilize o simulador do mkauth antes de colocar em produção : `settings > Options > Run`.
 
[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/msn.png)](#)
 
> Exemplo para teste no webadmin ( mkauth simulator )
> ```sh
> {"uid":"E5:BE:ED:DE:2E:EF","find":"415"}
> ```
> Exemplo de utilização no mkauth ( Insira exatamente assim, não edite )
> ```sh
> {"uid":"%logincliente%","find":"%numerotitulo%"}
> ```
> É possivel combinar a Utilização com a tag ## seguindo o exemplo abaixo:
> ```sh
> Mensagem1##https://via.placeholder.com/350x150.png##Mensagem3##{"uid":"%logincliente%","find":"%numerotitulo%"}##Mensagem5
> ```

### Exemplo De Mensagem Para Utilização no MkAuth
> ** `Opções > Servidor de SMS > Mensagens`
> 
> ```sh
> Olá %nomeresumido%, sua fatura %numerotitulo% vence no dia %vencimento%, para sua comodidade estamos enviado os dados para pagamento: ##{"uid":"%logincliente%","find":"%numerotitulo%"}##desconsidere esse aviso caso tenha feito o pagamento.
> ```

### Testando
<b>1 - </b>Envie uma mensagem pelo Sumulador `settings > Options > Run` ou MkAuth `Opções > Servidor de SMS > Mensagens`

<b>2 - </b>Verifique o Status do envio no Log `Mwsm > Log`.

[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/log.png)](#)
| Opção            |  Função                                                                              |
| -----------------|--------------------------------------------------------------------------------------|
| `ID`             | Idenificador de Registro                                                             |
| `TITLE`          | Balão Flutuante com numero do titulo (Boleto) ao selecionar um Registro              |
| `START`          | Inicio do Processamento                                                              |
| `FINISH`         | Conclusão do Processamento                                                           |
| `TARGET`         | Whatsapp Alvo do Disparo                                                             |
| `STATUS`         | Status do Envio                                                                      |

</details>

<details>
<summary>Debugger</summary>
<br>
 
> Para um melhor entendimento utilize esse guia como base na solução de possiveis erros.
> 
> ** `Settings > Extras > Debug ON`
>
> Todos os Resultados tem somente 2 retornos possiveis:<br>
> <b>True</b> = Positivo<br><b>False</b> = Negativo

### 1 - Teste a Conexão com API MkAuth
> ** `Settings > API > MkAuth Link` ( Desabilite e Habilite )

[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/auth.png)](#)
| Opção            |  Retorno                                                    |
| -----------------|-------------------------------------------------------------|
| `Authentication` | Autenticação com API do MkAuth via Token JWT                |
| `Communication`  | Comunicação Entre APP e API do MkAuth                   |


<br>

### 2 - Teste a Comunicação da API MkAuth

Utilize o Simulador MkAuth para analisar esses dados

** `Settings > Run > MkAuth Simulator ON`

Em um cenario em que a comunicação foi feita de forma correta receberemos o seguinte resultado

[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/success.png)](#)

> Na Primeira linha temos o comando de entrada de acesso a API do MkAuth.
> 
> Nas Demais Linhas Temos o Retorno Da API e por Fim o Resultado da Requisição.


| Opção        |  Retorno                                                |
| -------------|---------------------------------------------------------|
| `Payment`    | Status do Pagamento da Mensalidade Pesquisada           |
| `MkAuth`     | Modulos Disponiveis no Aplicativo                       |
| `Module`     | Função Integrada pela API                               |
| `Available`  | Disponibilidade pelo Gateway de Pagamento               |
| `Allowed`    | Permissão de Utilização Configurada em `Settings > API` |

Em um Cenario em que Ocorreu uma Falha na Requisição, o Debug ira Apontar a Falha e Onde Ocorreu

O Dado inserido no campo uid esta incorreto ( não existe no MkAUth )

[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/uid.png)](#)

O Dado inserido no campo find esta incorreto ( não faz parte do uid inserido )

[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/find.png)](#)


> É importante Levar em Consideração que os Dados Enviados Pelo MkAuth utilizando suas variaveis são enviados ao Aplicativo Seguindo o Mesmo Caminho que o `MkAUth Simulator`, se o Comando `{"uid":"%logincliente%","find":"%numerotitulo%"}` vindo do MkAuth Funcionar más o `{"uid":"Paulo.Santos","find":"144"}` inserido no Simulador não Funcionar é Possivel que vc Esteja Inserindo de Forma Errada, desse modo sugerimos que Dispare uma Mensagem via MkAuth e Copie a Primeira Linha do Debug para Disparar via Simulador.
>
> **OBS:**  `%numerotitulo%` é uma variavel **exclusiva** de SMS `Opções > Servidor de SMS > Mensagens` e não é possivel incluir como mensagem ( cartinha na lista de clientes ).

</details>

### Extras :

<details>
<summary>Tags</summary>
<br>

| Tag            | Efeito         | Exemplo                                                         |
| -------------- | -------------- | --------------------------------------------------------------- |
| `##`   | quebra balão   | Mensagem1`##`Mensagem2`##`Mensagem3                                     |
| `\n`   | quebra linha   | Linha1`\n`Linha2`\n`Linha3                                              |
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



