



import { getconnect } from "../../database/database";

export default async function handler(req, res) {
    let connection;
    try {
        const page = req.query.p ? parseInt(req.query.p, 10) || 1 : 1;
        const limit = req.query.l ? parseInt(req.query.l, 10) || 10 : 10;
        const order = req.query.o && req.query.o.toUpperCase() === "ASC" ? "ASC" : "DESC";

        let search = req.query.s ? `%${decodeURIComponent(req.query.s)}%` : null;
        const offset = (page - 1) * limit;

        connection = await getconnect();

        let sqlQuery = `SELECT * FROM plugins_imsakiye_city`;
        let countQuery = `SELECT COUNT(*) as total FROM plugins_imsakiye_city`;
        let queryParams = [];

        if (search !== "%undefined%") {
            sqlQuery += ` WHERE city LIKE ?`;
            countQuery += ` WHERE city LIKE ?`;
            queryParams.push(search);
        }

        sqlQuery += ` ORDER BY creation_date ${order} LIMIT ? OFFSET ?`;
        queryParams.push(limit, offset);
        const [rows] = await connection.execute(sqlQuery, queryParams);
        const [[totalRow]] = await connection.execute(countQuery, search ? [search] : []);
        const totalPosts = totalRow.total;
        const totalPages = Math.ceil(totalPosts / limit);


        return res.status(200).json({
            data: rows,
            totalPosts,
            totalPages,
            currentPage: page,
        });

    } catch (error) {
        return res.status(500).json({ message: "Hata", error: error.message });

    } finally {
        if (connection) await connection.end();
    }
}