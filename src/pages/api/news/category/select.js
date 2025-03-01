import { getconnect } from "../../database/database";



export default async function handler(req, res) {
    try {
        const connection = await getconnect();
        const [rows] = await connection.execute('SELECT * FROM post_category');
        await connection.end();
        return res.status(200).json({ data: rows });
    } catch (error) {
        return res.status(500).json({ message: 'Hata', error: error.message });
    }
}
