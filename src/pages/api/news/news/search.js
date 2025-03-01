import { getconnect } from "../../database/database";

export default async function handler(req, res) {
    let connection;

    try {
        const search = req.query.s ? `%${req.query.s}%` : null;
        if (!search) {
            return res.status(400).json({ message: "Arama terimi boş olamaz" });
        }
        connection = await getconnect();
        const [rows] = await connection.execute("SELECT * FROM post WHERE post_title LIKE ?", [search]);
        return res.status(200).json({ data: rows });
    } catch (error) {
        return res.status(500).json({ message: "Hata", error: error.message });

    } finally {
        if (connection) await connection.end();
    }
}
