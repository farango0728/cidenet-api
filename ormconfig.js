"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    synchronize: true,
    logging: false,
    entities: ['src/app/models/*.ts'],
    migrations: ['src/database/migrations/*.ts'],
    cli: {
        entitiesDir: 'src/app/models',
        migrationsDir: 'src/database/migrations',
    },
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
};
