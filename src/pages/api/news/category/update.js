
import { getconnect } from "../../database/database";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Sadece POST istekleri kabul edilir" });
    }

    let connection;
    try {
        const { id, name, text, preview, seo_title, seo_text, seo_keyword, status } = req.body;
        connection = await getconnect();
        const fields = [];
        const values = [];

        if (name !== undefined) {
            fields.push("name = ?");
            values.push(name);
        }
        if (text !== undefined) {
            fields.push("text = ?");
            values.push(text);
        }
        if (preview !== undefined) {
            fields.push("preview = ?");
            values.push(preview);
        }
        if (seo_title !== undefined) {
            fields.push("seo_title = ?");
            values.push(seo_title);
        }
        if (seo_text !== undefined) {
            fields.push("seo_text = ?");
            values.push(seo_text);
        }
        if (seo_keyword !== undefined) {
            fields.push("seo_keyword = ?");
            values.push(seo_keyword);
        }
        if (status !== undefined) {
            fields.push("status = ?");
            values.push(status);
        }

        if (fields.length === 0) {
            return res.status(400).json({ message: "Güncellenecek hiçbir veri yok" });
        }

        values.push(id); // Son olarak ID'yi ekle
        const updateQuery = `UPDATE your_table_name SET ${fields.join(", ")} WHERE id = ?`;

        const [result] = await connection.execute(updateQuery, values);

        await connection.end();

        return res.status(200).json({
            message: "Başarıyla güncellendi",
            affectedRows: result.affectedRows,
        });

    } catch (error) {
        return res.status(500).json({ message: "Hata", error: error.message });

    } finally {
        if (connection) await connection.end();
    }
}
