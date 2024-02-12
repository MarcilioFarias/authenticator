import {Sequelize}  from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.MARIADB_DB as string,
    process.env.MARIADB_USER as string,
    process.env.MARIADB_PASSWORD as string,
    {
        dialect: 'mariadb',
        port: parseInt( process.env.MARIADB_PORT as string)
    }
);


