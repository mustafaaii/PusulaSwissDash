import { getconnect } from "../../database/database";

export default async function handler(req, res) {
    try {
        const id = req.query.id;
        const connection = await getconnect();

        // JOIN ile plugins_imsakiye_city tablosundan şehir adını al
        const [rows] = await connection.execute(`
            SELECT 
                c.*, 
                city.city AS city_name 
            FROM plugins_imsakiye_content c
            JOIN plugins_imsakiye_city city ON c.city = city.id
            WHERE c.city = ?`,
            [id]
        );

        await connection.end();
        return res.status(200).json({ data: rows });

    } catch (error) {
        return res.status(500).json({ message: 'Hata', error: error.message });
    }
}
