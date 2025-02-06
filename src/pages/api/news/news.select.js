import { getconnect } from "../../library/db";

export default async function handler(req, res) {
    try {
        const connection = await getconnect();
        const [rows] = await connection.execute('SELECT * FROM city');
        await connection.end();
        if (rows.length > 0) {
            return res.status(200).json({ data: rows, status: true });
        } else {
            return res.status(200).json({ data: [], status: false, message: 'Adres bulunamadı' });
        }
    } catch {
        return res.status(200).json({ data: [], status: false, message: 'Sunucu hatası' });
    }
}
