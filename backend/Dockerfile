# Use a imagem base do Node.js
FROM node:18


# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install --verbose

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Porta exposta pelo contêiner
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]
