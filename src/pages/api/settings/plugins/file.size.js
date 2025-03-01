export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "URL eksik" });
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).json({ error: `Hata: ${response.statusText}` });
        }

        const blob = await response.blob();
        res.setHeader("Content-Type", blob.type);
        res.setHeader("Content-Disposition", `attachment; filename="resim.jpg"`);
        const buffer = await blob.arrayBuffer();
        res.send(Buffer.from(buffer));
    } catch (error) {
        res.status(200).json({ error: error.message });
    }
}
