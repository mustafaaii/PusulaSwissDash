import { getconnect } from "../../database/database";
export default async function handler(req, res) {
    let connection;
    try {
        const { categories } = req.body;
        connection = await getconnect();
        if (categories) {
            for (let i = 0; i < categories.length; i++) {
                const { id } = categories[i];
                await connection.execute("UPDATE post_category SET `order` = ? WHERE id = ?", [i + 1, id]);
            }
        }
        await connection.end();
        return res.status(200).json({ message: "Sıralama başarıyla güncellendi" });
    } catch (error) {
        return res.status(500).json({ message: "Hata", error: error.message });
    } finally {
        if (connection) await connection.end();
    }
}
