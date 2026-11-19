FROM node:22-alpine

WORKDIR /app

# Primero solo los package*.json para aprovechar la caché de capas
COPY package*.json ./
RUN npm install

# El código fuente llega por volumen (ver compose.yaml), pero se copia
# también para que la imagen funcione sin volumen
COPY . .

EXPOSE 5173

# --host 0.0.0.0 es imprescindible: si no, Vite solo escucha dentro del contenedor
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
