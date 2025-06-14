import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesByJournalistId } from "../services/api";

export default function JournalistArticles() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles();
  }, [id]);

  const fetchArticles = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getArticlesByJournalistId(id);
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Articles by Journalist</h2>
      <div className="article-list">
        {articles.map((article) => (
          <div key={article.id} className="article-card" onClick={() => navigate(`/articles/${article.id}`)}>
            <div className="article-title">{article.title}</div>
            <div className="article-author">By {article.journalistName}</div>
            <div className="article-snippet">{article.content?.slice(0, 100)}...</div>
          </div>
        ))}
      </div>
    </div>
  );
}