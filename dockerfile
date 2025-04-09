# Usa una imagen base oficial de Node.js
FROM node:22-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto en el que tu aplicación se ejecutará
EXPOSE 8081

# Comando para iniciar la aplicación
CMD ["npm", "start"]