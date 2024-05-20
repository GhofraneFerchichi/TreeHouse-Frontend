FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build
# Étape 2 : Utiliser l'image nginx pour servir l'application Angular
FROM nginx:latest   
COPY --from=build /app/dist/Angular-Pi /usr/share/nginx/html
EXPOSE 8077