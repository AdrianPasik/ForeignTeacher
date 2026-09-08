FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ForeignTeacher/browser /usr/share/nginx/html
EXPOSE 8040
CMD ["nginx", "-g", "daemon off;"]