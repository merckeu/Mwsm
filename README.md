# MkAuth WhatsApp Send Message

[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/Mwsm.png)](#)

# BUILD: 2.0.39 / UPDATE: 23/12/2024 21:24
| Release    | Recurso                                                                              | Update                | Patch                  |
| ---------- | ------------------------------------------------------------------------------------ | --------------------- | ---------------------- | 
|  2.0.39    | Correção de Erros de atualização no MkAuth                                           | 20/12/2024 21:51 ✅   |                        |
|  2.0.39    | Correção do sistema de agendamento                                                   |                       |  22/12/2024 17:25 ✅   |
|  2.0.39    | Ajuste no sistema de agendamento                                                     |                       |  23/12/2024 21:24 ✅   |

### ATENÇÃO DESENVOLVEDORES
> Para continuar utilizando nossa ferramenta em seus projetos adicione a chave auth conforme exemplo
> 
<details>
 
<summary>Exemplo</summary>

 ```sh
<?php
$Whatsapp = "819xxxxxxxx"; // Telefone Com DDD
$Mensagem = "Mensagem De Teste";
$Token = "xxxxxxx"; //Token Mwsm de 7 Digitos
$IP = "192.168.3.250:8000"; //IP-Porta do Mwsm

    $Data = http_build_query([
    'to' => '55'.$Whatsapp,
    'msg' => $Mensagem,
    'pass' => $Token,
	'auth' => 'true'
    ]);

    $CURL = curl_init();
    curl_setopt($CURL, CURLOPT_URL, "http://".$IP."/send-message");
    curl_setopt($CURL, CURLOPT_POST, true);
    curl_setopt($CURL, CURLOPT_POSTFIELDS, $Data);
    curl_setopt($CURL, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($CURL, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($CURL, CURLOPT_HEADER, false);
$Response = curl_exec($CURL);
curl_close($CURL);
print($Response);
?>
```

</details>

# SOBRE
* O Mwsm é uma API que integra um sistema de notificações automatizadas por whatsapp ao MkAuth.,

# COMPATIBILIDADE
|                 | BAR | PIX | QR | QRL | PDF  |
| --------------------  | --- | --- | -- | --- | ---- |
|  Gerencianet     | ✅ | ✅  | ✅ | ✅ | ✅  | 
|  Iugu     | ✅ | ✅  | ✅ | ✅ | ✅  | 
|  Galaxpay     | ✅ | ✅  | ✅ | ✅ | ✅  | 
|  Santander     | ✅ | ❌  | ❌ | ❌ | ✅  | 

 > **OBS:** Compatibilidade Relatada por Usuarios Podendo Funcionar em Bancos/Gateways Ausentes Dessa Lista

# REQUISITOS
* Servidor Linux ( Container ubuntu ) Proxmox ou Mkauth

# INSTALAÇÃO

<details>
<summary>Proxmox</summary>
<br> 
<b>OBS:</b> é necessario instalar uma distribuição linux no proxmox antes de inserir os codigos abaixo
	
> No final da Pagina na Guia Videos tem um Tutorial de como fazer isso.
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

<b>6 - </b>Acesse seu MkAuth via Putty e Atualize a API.
```sh
wget https://raw.githubusercontent.com/MKCodec/MkAuth-API/main/cliente.api -O /opt/mk-auth/api/cliente.api && wget https://raw.githubusercontent.com/MKCodec/MkAuth-API/main/titulo.api -O /opt/mk-auth/api/titulo.api
```
</details>

<details>
<summary>Mkauth</summary>
<br>
  
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

<b>4 - </b>Atualize o NPM
```sh
sudo npm install -g npm@latest node-gyp@latest
```

<b>5 - </b>Atualize a API do MkAuth
```sh
wget https://raw.githubusercontent.com/MKCodec/MkAuth-API/main/cliente.api -O /opt/mk-auth/api/cliente.api && wget https://raw.githubusercontent.com/MKCodec/MkAuth-API/main/titulo.api -O /opt/mk-auth/api/titulo.api
```

<b>6 - </b>Crie o diretório de instalação do Mwsm
```sh
sudo mkdir -p /var/api/Mwsm
```

<b>7 - </b>Instale o Mwsm
```sh
sudo git clone https://github.com/MKCodec/Mwsm.git /var/api/Mwsm && cd /var/api/Mwsm
```

<b>8 - </b>Instale as dependencias do Mwsn
```sh
sudo npm install --silent
```

<b>9 - </b>Inicialize o Mwsn
```sh
sudo npm run start:mwsm
```

</details>

# REINSTALAÇÃO
<details>
<summary>ProxMox</summary>
  
```sh
sudo apt-get install build-essential && cd ~ && cd /var/api/Mwsm && pm2 delete all && pm2 kill && npm remove pm2 -g && mkdir -p ~/.pm2/node_modules/ && cd ~ && rm -r /var/api/Mwsm && git clone https://github.com/MKCodec/Mwsm.git /var/api/Mwsm && cd /var/api/Mwsm && npm install --silent && npm i -g pm2 && pm2 update && pm2 flush && pm2 start mwsm.json && pm2 save && pm2 startup && pm2 log 0
```

</details>
<details>
<summary>MkAuth</summary>
  
```sh
cd ~ && cd /var/api/Mwsm && pm2 kill && pm2 delete all && npm remove pm2 -g || apt-get remove nodejs -y && rm -vrf ~/.pm2/node_modules /var/api/Mwsm && apt-get install -y ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils git curl build-essential && curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && apt-get install -y nodejs && cd ~ && mkdir -p /var/api/Mwsm && git clone https://github.com/MKCodec/Mwsm.git /var/api/Mwsm  && cd /var/api/Mwsm && npm i git+https://github.com/MKCodec/WhatsApp-API --silent && npm i git+https://github.com/MKCodec/Url2PDF --silent && npm install --silent && npm i -g pm2 && pm2 update && pm2 flush && pm2 start mwsm.json && pm2 save && pm2 startup && pm2 log 0
```
</details>
</details>

# ATUALIZAÇÃO
* <b>1º - </b>Acesse seu MkAuth via Putty e insira o Codigo Abaixo no Prompt de Comando.
 > Sempre que o Mkauth ou Mwsm for atualizado deve-se repetir esse Procedimento.

```sh
wget https://raw.githubusercontent.com/MKCodec/MkAuth-API/main/cliente.api -O /opt/mk-auth/api/cliente.api && wget https://raw.githubusercontent.com/MKCodec/MkAuth-API/main/titulo.api -O /opt/mk-auth/api/titulo.api
```

* <b>2º - </b>Insira um dos codigos no prompt de comando onde o mwsm esta instalado.
 
> **Update :** Utilize quando a sua versão instalada for inferior ao do Release [ Requer Reconfiguração ] 
>
> **Patch :** Utilize quando a sua versão instalada for igual ao do Release
 
<b>OBS: </b> Lembre-se de sempre atualizar o navegador (F5) quando realizar uma atualização Manual.
   
<details>
<summary>Update</summary>
 <br>

```sh
cd ~ && cd /var/api/Mwsm && pm2 flush && pm2 delete all && pm2 kill && git reset --hard HEAD~1 && git pull "https://github.com/MKCodec/Mwsm.git" --rebase --autostash && npm install --silent && npm cache clean --force && npm run start:mwsm
```
</details>
<details>
<summary>Patch</summary>
<br>
 
**Atualização Manual:**
 ```sh
wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/mwsm.js -O /var/api/Mwsm/mwsm.js
wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/script.js -O /var/api/Mwsm/script.js
wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/style.css -O /var/api/Mwsm/style.css
wget https://raw.githubusercontent.com/MKCodec/Mwsm/main/index.html -O /var/api/Mwsm/index.html
cd ~ && cd /var/api/Mwsm && pm2 log 0
```

**Atualização Automatica:**

* Habilite a função no webadmin do mwsm. 

**`Extras > Update`**

 > as atualizações serão instaladas entre 00:00 e 05:00am e conterão somente correções de bugs que não interferem no funcionamento da API, atualizações criticas que requerem reconfiguração serão feitas somente de forma manual.
</details>


# CONFIGURAÇÃO

<details>
<summary>Tutorial</summary>
<br>
<b>1 - </b>Habilite o Tunel Dev API do MKauth

** `Opções > Rede do Servidor > MkTunel > ( Ativar e Gravar )`

[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/dev.png)](#)


<b>2 - </b>Habilite o EndPoint (Titulos GET) e (Cliente GET) do MkAuth

** `Provedor > Controle de Usuarios > API > ( Habilitar Endpoints titulo.api GET, cliente.api GET e Gravar )`

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
| `Auto-Reject`   | `on`              | Habilitar Rejeição de Chamadas Automatica.                      |
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
| `VERSION` | Alterne entre v1 ou v2 caso ocorra falhas no PDF do Boleto  |
| `MODE`    | Escolha o tipo de conexão, Tunel MkAuth ou via Dominio      |

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
</details>

# GERENCIAMENTO
> Escolha qual vai ser seu gerenciador de mensagens, o Mkauth ou o Mwsm.

<details>
<summary>MkAuth</summary>
 <br>
 
 <b>1 - </b>Configure seu servidor no MKAuth seguindo as instruções do servidor Web
 
> **Senha :** Insira o `Token Fixo` de Acesso ao Aplicativo no Campo Senha no MkAuth
<br>

* MkAuth até Versão 24.02
  
 ** `Opções > Servidor de SMS > Servidor`
 
[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/mkauth.png)](#)

* MkAuth Versão 24.03 ou Superior
 
** `Opções > Servidor de WhatsApp > Servidor`
 
[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/whatsapp.png)](#)
</details>

<details>
<summary>Mwsm</summary>
<br>
 
 ** `Settings > API > Tela 2`

> Os disparos das cobranças serão feitos conforme configurados na API ( Hora, Dia, Turno ) .
  
<b>OBS:</b> Definia como o sistema de disparos vai se comportar
 
[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/autobot.png)](#)

| Nome            |  Função                                                         |
| --------------  |   --------------------------------------------------------------|
| `Messages`| Mensagens Recebidas pelo cliente  |
| `Sun` a `Sat`   | Dias permitidos para Disparo das Mensagens. ( Domingo a Sabado )          |
| `Morn` a `Night`| Turnos Permitos Para Disparos das Mensagens. ( manha, tarde, noite )  |
| `Auto Messages` | Habilita a API como Gerente de Disparos                                   |
| `Select Message` | Seleciona Qual mensagem será editada                                   |
| `Variant` | Seleciona Qual variação de mensagem será editada                                   |
| `Schedule` | Intervalo de Cobrança entre 5 dias antes até 40 dias do vencimento                                   |

<b>OBS:</b> Ao Habilitar a opção `Auto Messages` a aplicação vai para de responder requisições vindas do MkAuth.
<br>
> Por Padrão a montagem da fila de agendamento é construida diariamente entre 00:00 e 02:59.
<br>

* Evite problemas com bloqueios do algoritimo do whatsapp configurando variações de mensagens.

`Settings > Extras > Anti-Spam`

* Defina como o sistema anti-spam vai ser ativado
  
 
[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/spam.png)](#)
<br>
| Nome            |  Função                                                         |
| --------------  |   --------------------------------------------------------------|
| `Order`| Envia as variações conforme sua ordem 1-2-3  |
| `Random`| Envia as variações de forma aleatoria        |
<br>

* Alterne entre as Variações para configurar cada mensagem
 
`Settings > API > Tela 2 > 1-2-3`

[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/spam2.png)](#)


* Habilite a sincronização de Titulos entre MkAuth e Mwsm

`Settings > Extras > Sync`
> Por padrão o Mwsm vai monitorar pagamentos baseados nas cobranças ja enviadas pela API, para refinar esse monitoramento Habilite a sincronização.

[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/resync.png)](#)


* Defina uma faixa de horario para ativação da lista de agendamento.

`Settings > Extras > Shif`

> Por padrão a lista de agendamento funciona entre 8:00 e 22:00 respeitando a configuração do turno.
   
[![MkAuth](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/shifts.png)](#)
<br>
| Nome            |  Função                                                         |
| --------------  |   --------------------------------------------------------------|
| `7:00 > 10:00`| Hora Base para inicio da lista de Agendamento  |
| `20:00 > 22:00`| Hora Base para fim da lista de Agendamento        |
</details>


# UTILIZAÇÃO
<details>
<summary>Funções</summary>
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
> ** `Opções > Servidor de SMS > Mensagens` ou `Opções > Servidor de WhatsApp > Mensagens > Interação 01` 
> 
> ```sh
> Olá %nomeresumido%, sua fatura %numerotitulo% vence no dia %vencimento%, para sua comodidade estamos enviado os dados para pagamento: ##{"uid":"%logincliente%","find":"%numerotitulo%"}##desconsidere esse aviso caso tenha feito o pagamento.
> ```

### Como Enviar Mensagens Via Mikrotik
> As mensagens via Mikrotik podem ser enviadas via Script com o comando Abaixo:
> 
> ```sh
> /tool fetch "http://IP-API/mikrotik/TOKEN/DDI+DDD+NUMERO/MENSAGEM"
> ```
>
> **OBS:** Subistitua os Espaços por `%20` ao Inserir uma Mensage no Toll Fetch
> 
> **Ex:** Para `/tool fetch "http://192.168.3.250:8000/mikrotik/1234567/5511988888888/Mensagem de Teste"` :
> 
> ```sh
> /tool fetch "http://192.168.3.250:8000/mikrotik/1234567/5511988888888/Mensagem%20de%20Teste"
> ```

### Como Limpar o Log De Mensagem
> Para Limpar o Log de Mensagens Registradas no API siga os Passos Abaixo:
> 
> `Settings > Extras > Eraser` e Clique em Reset
[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/reset.png)](#)

### Como Rennviar uma Mensagens com Falhas no Log
> `Settings > API > Tela 3`
> 
> Selecione o Mes, Status e Clique em Carregar
> 
> Clique sobre o Titulo, ao passar o Cursor sobre cada um vai aparecer o nome do cliente

[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/resent.png)](#)
| Opção            |  Função                                                                              |
| -----------------|--------------------------------------------------------------------------------------|
| `Month`           | Mês de Referencia Entre 1 e 12                                                         |
| `Status`          | Status da Assinatura ( ALL = Todos, DUE = Atrasados, Open = Abertos, Pay = Pagos )              |
| `Reload`          | Recarregar Lista com Parametros escolhidos                                                            |

### Como Enviar Notificações ( Confirmação de Pagamentos, Etc. )
> `Settings > API > Tela 2 > Agenda` ( Botão Antes do Clear )
> 
* Ative a opção conforme necessidade
* Funciona somente com a opção `Auto Messages` ativada

[![Node](https://raw.githubusercontent.com/MKCodec/Mwsm/main/img/paycon.png)](#)
| Opção            |  Função                                                                              |
| -----------------|--------------------------------------------------------------------------------------|
| `Payment Received`           | Envia ao cliente uma notificação de pagamento recebido                                                        |
| `Locked User`          | Envia ao cliente uma notificação sobre suspensão do serviço             |
| `Unlocked User`          | Envia ao cliente uma notificação quando uma suspensão é desfeita                                                            |
| `Maintenance`          | Envia ao cliente uma notificação sobre manutenção de serviço                                                           |
| `Unistall Device`          | Envia ao cliente uma notificação sobre recolhimento de equipamentos                                                            |
> as opções desativadas serão liberadas em patchs de atualização conforme forem liberadas

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

<details>
<summary>Tags e Hotkeys</summary>
<br>

| Tag            | Efeito         | Exemplo                                                         | MkAuth | Mwsm |
| -------------- | -------------- | --------------------------------------------------------------- |--------|------|
| `##`   | quebra balão   | Mensagem1`##`Mensagem2`##`Mensagem3                                     |✅|✅|
| `\n`   | quebra linha   | Linha1`\n`Linha2`\n`Linha3                                              |✅|✅|
| `*`    | negrito        | `*`Mensagem`*`                                                          |✅|✅|

| Hotkeys          | Mensagem           | Função                                                   | MkAuth | Mwsm |
| ---------------- | ----------- | --------------------------------------------------------------- |--------|------|
| `%nomeresumido%` | `Todas`     | Primeiro nome do cliente.  |✅|✅
| `%metodo%`       | `Pagamento` | Forma de pagamento da fatura.        |❌|✅
| `%pagamento%`    | `Pagamento` | Data/Hora da confirmação do pagamento.                           |❌|✅
| `%valorpago%`    | `Pagamento` | Valor recebido.                              |❌|✅
| `%vencimento%`   | `Todas`     | Data de vencimento da fatura.                                |✅|✅
| `%logincliente%` | `Cobranças` | Usuario do cliente.                             |✅|✅
| `%numerotitulo%` | `Todas`     | Numero de referencia da fatura.                                  |✅|✅

</details>

# ERROS
> Em Caso de Erros Habilite o Debbuger e Siga as Dicas do Guia de Utilização `Debugger` no Final da Pagina
>
> ** `Mwsm > Settings > Extras > Debugger`
>
No Caso do Erro Persistir Contate-nos no Forum do [mkauth](https://mk-auth.com.br/forum/topics/envio-de-mensagem-via-whatsapp-100-gratuito)

# DOAÇÕES PIX :
Contribua com a gratuidade, sobrevivência e manutenção desse projeto estimulando melhorias e atualizações.

QRCode

![Pix](https://github.com/MKCodec/Mwsm/assets/143403919/24660f85-17d0-4de4-94e7-de85828a9265)

Chave Aleatoria
```sh
e9b9d669-4412-4dec-994c-310005904088
```

Copia e Cola
```sh
00020126580014BR.GOV.BCB.PIX0136e9b9d669-4412-4dec-994c-3100059040885204000053039865802BR5924CLEBER FERREIRA DE SOUZA6007CARUARU62070503***63045854
```

# VIDEOS
> Confira nossa lista de video-tutoriais.

<details>
<summary>MkAuth</summary>
<br>
<details>
<summary>Instalando o Mwsm</summary>

[<img src="https://img.youtube.com/vi/q3z7p15CQIk/maxresdefault.jpg" width="50%">](https://youtu.be/q3z7p15CQIk)

</details>
<details>
<summary>Atualizando o Mwsm</summary>

[<img src="https://img.youtube.com/vi/LD2aKLgEst8/maxresdefault.jpg" width="50%">](https://youtu.be/LD2aKLgEst8)

</details>

<details>
<summary>Reinstalando o Mwsm</summary>

[<img src="https://img.youtube.com/vi/XDpRwiAz7is/maxresdefault.jpg" width="50%">](https://youtu.be/XDpRwiAz7is)

</details>
<br>
</details>

<details>
<summary>ProxMox</summary>
<br>
<details>
<summary>Criando um CT Ubuntu</summary>

[<img src="https://img.youtube.com/vi/ND-heMzZvXE/maxresdefault.jpg" width="50%">](https://youtu.be/ND-heMzZvXE)

</details>

<details>
<summary>Instalando o Mwsm</summary>

[<img src="https://img.youtube.com/vi/dI55jmYEg5s/maxresdefault.jpg" width="50%">](https://youtu.be/dI55jmYEg5s)

</details>

</details>
