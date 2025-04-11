import { pool } from "../db/db.js";
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

await client.connect();

export const getAllUsers = async () => {
    try {
        const result = await client.query('select * from user1')
        return result.rows
    } catch (error) {
        console.log(error, "xatolik");
    }
}


export const getById = async (id) => {
    try {
        const result = await client.query('select * from user1 where id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.log(error, "Xatolik");
    }
};

export const updateUser = async (id, userData) => {
    try {
        const { name, email } = userData;
        const result = await client.query(
            'update user1 set name = $1, email = $2 where id = $3 returning *',
            [name, email, id]
        );
        return result.rows[0];
    } catch (error) {
        console.log(error, "Xatolik");
    }
};
export const deleteUser = async (id) => {
    try {
        const result = await client.query('delete from user1 where id = $1 returning *', [id]);
        return result.rows[0];
    } catch (error) {
        console.log(error, "Xatolik");
    }
};
