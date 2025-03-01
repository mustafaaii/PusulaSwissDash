import { getconnect } from "../database/database";



export default async function handler(req, res) {
    const {
        uid,
        user,
        email,
        phone,
        password
    } = req.body;



    try {
        const connection = await getconnect();
        const [rows] = await connection.execute('SELECT * FROM user');
        await connection.end();
        return res.status(200).json({ data: rows });
    } catch (error) {
        return res.status(500).json({ message: 'Hata', error: error.message });
    }
}

