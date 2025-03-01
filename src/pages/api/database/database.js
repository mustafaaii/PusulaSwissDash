import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pusula_sw',
    port: 3307
};

export async function getconnect() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch (error) {
        console.error('Veritabanı bağlantı hatası:', error);
        throw new Error('Veritabanı bağlantısı sağlanamadı');
    }
}