# Usa una imagen base de Node.js
FROM node:23-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install --production

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 8081

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]