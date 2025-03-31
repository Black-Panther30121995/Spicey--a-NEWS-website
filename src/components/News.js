import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 13; // 13 articles per page
  const [totalPages, setTotalPages] = useState(0); // Dynamic total pages

  // Function to fetch news with a varied query to get unique articles
  const fetchNews = async (queryVariation) => {
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=India+${queryVariation}&sortBy=publishedAt&token=cf490afb4ad0d98a32bed1e70f6aa7cf&max=10`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.articles || [];
    } catch (error) {
      console.error(`Error fetching news with variation ${queryVariation}:`, error);
      return [];
    }
  };

  // Fetch multiple sets of articles
  useEffect(() => {
    const fetchAllNews = async () => {
      let allArticles = [];
      
      // Fetch 3 sets of 10 articles with different query variations
      const variations = ["politics", "education", "tech"];
      for (let variation of variations) {
        const articles = await fetchNews(variation);
        allArticles = [...allArticles, ...articles];
        // Add delay to avoid hitting rate limits (adjust as needed)
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      // Remove duplicates based on article URL
      const uniqueArticles = Array.from(
        new Map(allArticles.map((article) => [article.url, article])).values()
      );
      
      console.log("Total Unique Articles:", uniqueArticles.length);
      setNews(uniqueArticles);
      setTotalPages(Math.ceil(uniqueArticles.length / articlesPerPage)); // Dynamic total pages
      localStorage.setItem("news", JSON.stringify(uniqueArticles));
    };

    const cachedNews = localStorage.getItem("news");
    if (cachedNews) {
      const cachedArticles = JSON.parse(cachedNews);
      setNews(cachedArticles);
      setTotalPages(Math.ceil(cachedArticles.length / articlesPerPage));
    } else {
      fetchAllNews();
    }
  }, []);

  // Calculate articles for the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="container my-3">
      <h2 className="text-center">Spicey - Top Spicy News</h2>
      <div className="row">
        {currentArticles.map((article) => (
          <div className="col-md-4" key={article.url}>
            <NewsItem
              title={article.title || "No Title"}
              description={article.description || "No Description"}
              imageUrl={
                article.image ||
                "https://images.wsj.net/im-69304896/social"
              }
              newsUrl={article.url}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between my-3">
        <button
          className="btn btn-dark"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ← Previous
        </button>
        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-dark"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default News;