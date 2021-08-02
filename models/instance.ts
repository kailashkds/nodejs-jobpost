import {Sequelize} from 'sequelize'
import { dbConfig } from '../database/connection';

const db = 'job_app'
const username = 'root'
const password = ''

export const sequelize = new Sequelize(dbConfig['DB'], dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
    });

sequelize.authenticate()