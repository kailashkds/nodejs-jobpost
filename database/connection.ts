require('dotenv').config()
import mysql from "mysql";
export const conn  = mysql.createPool({
    connectionLimit :  50,
    host            :  process.env.DATABASE_HOST,
    user            :  process.env.DATABASE_USER,
    password        :  process.env.DATABASE_PASSWORD,
    database        :  process.env.DB_DATABASE,
    multipleStatements: true
});
// exports = {c:pool};
