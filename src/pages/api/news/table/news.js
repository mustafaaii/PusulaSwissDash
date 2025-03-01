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

        let sqlQuery = `SELECT * FROM post`;
        let countQuery = `SELECT COUNT(*) as total FROM post`;
        let queryParams = [];

        if (search !== "%undefined%") {
            sqlQuery += ` WHERE post_title LIKE ?`;
            countQuery += ` WHERE post_title LIKE ?`;
            queryParams.push(search);
        }

        sqlQuery += ` ORDER BY creation_date ${order} LIMIT ? OFFSET ?`;
        queryParams.push(limit, offset);

        const [rows] = await connection.execute(sqlQuery, queryParams);
        const [[totalRow]] = await connection.execute(countQuery, search ? [search] : []);

        const totalPosts = totalRow.total;
        const totalPages = Math.ceil(totalPosts / limit);

        const postIds = rows.map(post => post.id);
        let monthlyViewsData = {};

        if (postIds.length > 0) {
            const [monthlyData] = await connection.execute(
                `SELECT post_id, MONTH(visiting_date) AS month, COUNT(*) AS total_views
                 FROM post_visit 
                 WHERE post_id IN (${postIds.map(() => "?").join(",")}) 
                 AND visiting_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 11 MONTH) AND LAST_DAY(CURDATE())
                 GROUP BY post_id, month 
                 ORDER BY month ASC`,
                postIds
            );

            const monthsMap = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
            postIds.forEach(post_id => {
                monthlyViewsData[post_id] = monthsMap.map((month, index) => {
                    const found = monthlyData.find(item => String(item.post_id) === String(post_id) && item.month === index + 1);
                    return { label: month, value: found ? found.total_views : 0 };
                });
            });
        }


        return res.status(200).json({
            data: rows.map(post => ({
                ...post,
                monthly_views: monthlyViewsData[post.id] || []
            })),
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
