# =============================
# STAGE 1 : Build
# =============================
FROM node:20-slim AS builder

WORKDIR /app

# Configuration du cache npm et de la mémoire
ENV NPM_CONFIG_CACHE=/app/.npm
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV CI=true
ENV NODE_ENV=production

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances avec cache npm
RUN npm install --legacy-peer-deps --prefer-offline --no-audit --no-fund --production && \
    npm cache clean --force

# Copie du code source
COPY . .

# Build de l'application React avec optimisation de la mémoire
RUN npm run build

# Nettoyage des fichiers inutiles
RUN rm -rf node_modules && \
    rm -rf src && \
    rm -rf public && \
    rm -rf .git && \
    rm -rf .env* && \
    rm -rf .npm

# =============================
# STAGE 2 : Production
# =============================
FROM nginx:alpine

# Copie de la configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers buildés
COPY --from=builder /app/build /usr/share/nginx/html

# Exposition du port
EXPOSE 80

# Démarrage de nginx
CMD ["nginx", "-g", "daemon off;"] 