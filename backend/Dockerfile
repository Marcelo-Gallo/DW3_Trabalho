# 1. Imagem Base
FROM node:18-alpine

# 2. Diretório de Trabalho
WORKDIR /usr/src/app

# 3. Copiar Dependências: Copia os arquivos de definição de pacotes.
COPY package.json package-lock.json ./

# 4. Instalar Dependências: Instala as bibliotecas (express, pg, jwt, etc.)
RUN npm install

# 5. Copiar Código da Aplicação: Copia o restante do código-fonte do back-end.
COPY . .

# 6. Expor a Porta: Informa ao Docker que a aplicação ouve na porta 40000.
EXPOSE 40000

# 7. Comando de Inicialização: Define o comando para rodar a aplicação quando o contêiner iniciar.
CMD [ "node", "app.js" ]