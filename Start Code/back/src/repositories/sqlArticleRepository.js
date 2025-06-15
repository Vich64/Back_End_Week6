import { pool } from "../utils/database.js";

// Get all articles
export async function getAllArticles() {
    const query = "SELECT * FROM article";
    const [rows] = await pool.query(query);
    return rows;
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    const query = "SELECT * FROM article WHERE id = ?"; 
    const [rows] = await pool.query(query, [id]);
    return rows[0];
}

// Create a new article
export async function createArticle(article) {
    const query = `
        INSERT INTO article (title, content, journalistId, category)
        VALUES (?, ?, ?, ?)
    `;
    const { title, content, journalist, category } = article;
    const [result] = await pool.query(query, [title, content, journalist, category]);
    return { id: result.insertId, ...article };
}

// Update an article by ID
export async function updateArticle(id, updatedArticle) {
    const query = `
        UPDATE article
        SET title = ?, content = ?, journalistId = ?, category = ?
        WHERE id = ?
    `;
    const { title, content, journalist, category } = updatedArticle;
    const [result] = await pool.query(query, [title, content, journalist, category, id]);
    return result.affectedRows > 0; // returns true if update was successful
}

// Delete an article by ID
export async function deleteArticle(id) {
    const query = `DELETE FROM article WHERE id = ?`;
    const [result] = await pool.query(query, [id]);
    return result.affectedRows > 0; // returns true if delete was successful
}

export { getAllArticles as getArticles };