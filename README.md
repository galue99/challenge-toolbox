## Challenge ToolBox


# Full Stack Challenge

Este proyecto es una aplicación full stack que consta de un backend desarrollado con Node.js y Express, y un frontend desarrollado con React y Redux. La aplicación consume datos de una API externa, los formatea y los muestra en una tabla.

## Requisitos

- Docker
- Docker Compose

## Instalación y Ejecución

Para construir y ejecutar las aplicaciones utilizando Docker y Docker Compose, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/galue99/challenge-toolbox.git
   cd <repo-directory>
   ```
2. Ejecuta el siguiente comando para construir y levantar las imágenes de Docker:

   ```bash
   docker-compose up --build
   ```

Esto iniciará tanto el backend como el frontend en contenedores separados. El backend estará disponible en `http://localhost:9000` y el frontend en `http://localhost:3000`.


### Dockerfiles

#### Dockerfile para API (backend)

```dockerfile
# API Dockerfile
FROM node:14

WORKDIR /app

COPY ./api/package*.json ./
RUN npm install

COPY ./api .

EXPOSE 9000

CMD ["npm", "start"]
```

#### Dockerfile para Frontend

```dockerfile
# Frontend Dockerfile
FROM node:16

WORKDIR /app

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend .

EXPOSE 3000

CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3'

services:
   api:
      build: ./api
      ports:
         - "9000:9000"
      environment:
         - API_KEY=Bearer aSuperSecretKey
         - API_URL=https://echo-serv.tbxnet.com/v1/secret/
         - PORT=9000
   frontend:
      build: ./frontend
      ports:
         - "3000:3000"
      environment:
         - REACT_APP_API_URL=http://localhost:9000
```

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

- `/api`: Contiene el backend desarrollado con Node.js y Express.
- `/frontend`: Contiene el frontend desarrollado con React y Redux.
- `docker-compose.yml`: Configuración de Docker Compose para levantar ambos servicios.
- `README.md`: Documentación del proyecto.



```plaintext
.
|-- api
|   |-- Dockerfile
|   |-- app.js
|   |-- controllers
|   |   -- fileController.js
|   |-- index.js
|   |-- package-lock.json
|   |-- package.json
|   |-- services
|   |   -- fileService.js
|   |-- setup.js
|   |-- test
|       -- api.test.js
|
|-- frontend
|   |-- Dockerfile
|   |-- README.md
|   |-- __mocks__
|   |   -- axios.js
|   |-- babel.config.js
|   |-- jest.config.js
|   |-- package-lock.json
|   |-- package.json
|   |-- public
|   |   |-- favicon.ico
|   |   |-- index.html
|   |   |-- logo192.png
|   |   |-- logo512.png
|   |   |-- manifest.json
|   |   `-- robots.txt
|   `-- src
|       |-- App.css
|       |-- App.js
|       |-- __tests__
|       |   `-- TableFile
|       |       `-- TableFile.test.js
|       |-- components
|       |   |-- FileFilter.js
|       |   |-- Loading.js
|       |   `-- TableFile.js
|       |-- index.css
|       |-- index.js
|       |-- logo.svg
|       |-- reducers.js
|       |-- redux
|       |   |-- actions
|       |   |   `-- filesActions.js
|       |   |-- reducers
|       |   |   `-- filesReducer.js
|       |   `-- store.js
|       |-- reportWebVitals.js
|       `-- setupTests.js
|
|-- README.md
|-- docker-compose.yml
`
```

Para más detalles sobre cómo funciona cada parte del proyecto, consulta la estructura de cada Dockerfile en sus respectivos directorios.
