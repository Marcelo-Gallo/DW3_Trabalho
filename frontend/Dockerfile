# 1. Imagem Base
FROM node:18-alpine

# 2. Diretório de Trabalho
WORKDIR /usr/src/app

# 3. Copiar Dependências
COPY package.json package-lock.json ./

# 4. Instalar Dependências
RUN npm install

# 5. Copiar Código da Aplicação: Copia o restante do código-fonte do front-end.
COPY . .

# 6. Expor a Porta: O front-end vai rodar na porta 40100.
EXPOSE 40100

# 7. Comando de Inicialização:
CMD [ "node", "app.js" ]