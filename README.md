# mela-api
rest api de mela beauty

## Diagrama entidad - relacion
https://dbdiagram.io/d/61df3f844c9a8944ec914444


## Guía de instalación
---
Paso a paso de cómo instalar la herramienta digital

La guía de instalación debe contener de manera específica:
- [NPM](https://www.npmjs.com/) - Instalar Gestor de librerias
    npm init -y
    npm i typescript ts-node nodemon -D
    npx typescript --init
    npx tsc --init
    npm i express
    npm i @types/express -D
    npm i typeorm reflect-metadata
    npm i pg
    bcryptjs
    @types/bcryptjs -D
    jsonwebtoken
    @types/jsonwebtoken -D

 
## Configuracion de Base de Datos

- ormconfig.json archivo de conexion de la base de datos

## Crear Migracion

se crea el archivo inicial

    npx ts-node ./node_modules/typeorm/cli.js migration:generate -n CreateDataBase

se ejecuta las migraciones
    npx ts-node ./node_modules/typeorm/cli.js migration:run

se crea una migracion 

    npx typeorm migration:create -n CreateUsersTable

Ejecutar migacion 
    npm run typeorm migration:run


