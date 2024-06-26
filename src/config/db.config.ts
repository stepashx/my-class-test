import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DB_URL,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: false
        }
    },
});
