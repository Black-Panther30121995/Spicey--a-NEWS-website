import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewsItem from "./NewsItem";

const News = () => {
  const [news, setNews] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPages, setPrevPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const CACHE_DURATION = 15 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    loadNewsData();
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const loadNewsData = () => {
    const cachedData = localStorage.getItem("newsData");
    const cachedTimestamp = localStorage.getItem("newsTimestamp");
    const now = new Date().getTime();

    if (cachedData && cachedTimestamp) {
      const parsedData = JSON.parse(cachedData);
      setNews(parsedData.articles);
      setNextPage(parsedData.nextPage);
      setPrevPages(parsedData.prevPages || []);
      setCurrentPage(parsedData.currentPage || 1);
      setIsLoading(false);

      if (now - cachedTimestamp < CACHE_DURATION) {
        console.log("Loading from valid cache");
        return;
      } else {
        console.log("Cache expired, attempting to fetch fresh data");
      }
    } else {
      console.log("No cache found, fetching fresh data");
    }

    fetchNews();
  };

  const saveToCache = (articles, nextPageValue, prevPagesValue, currentPageValue) => {
    const cacheData = {
      articles,
      nextPage: nextPageValue,
      prevPages: prevPagesValue,
      currentPage: currentPageValue,
    };
    localStorage.setItem("newsData", JSON.stringify(cacheData));
    localStorage.setItem("newsTimestamp", new Date().getTime().toString());
  };

  const fetchNews = async (pageToken = null, isNext = true) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = pageToken
        ? `http://localhost:5000/news?nextPage=${pageToken}`
        : `http://localhost:5000/news`;

      console.log("Fetching from:", url);
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched News Data:", JSON.stringify(data, null, 2));

      const uniqueNews = Array.from(
        new Map(data.articles.map((item) => [item.title, item])).values()
      );

      setNews(uniqueNews);
      setNextPage(data.nextPage || null);

      if (isNext) {
        setPrevPages((prev) => [...prev, pageToken]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setPrevPages((prev) => prev.slice(0, -1));
        setCurrentPage((prev) => prev - 1);
      }

      saveToCache(uniqueNews, data.nextPage || null, prevPages, currentPage);
    } catch (error) {
      console.error("Error fetching news:", error.message);
      const cachedData = localStorage.getItem("newsData");
      if (cachedData) {
        setError("Unable to fetch new news (API limit may be reached). Showing cached news.");
      } else {
        setError("Failed to fetch news and no cached data available.");
        setNews([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNewsDebounced = debounce(fetchNews, 1000);

  const handleReadMore = (article) => {
    navigate(`/article/${encodeURIComponent(article.title)}`, { state: article });
  };

  return (
    <div
      className="container my-3"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "2rem",
        borderRadius: "10px",
        minHeight: "80vh",
      }}
    >
      <h2
        className="text-center mb-4"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#2c3e50",
        }}
      >
        Spicey - Top Spicy News
      </h2>

      {error && (
        <p
          className="text-center text-warning mb-3"
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "1.1rem",
          }}
        >
          {error}
        </p>
      )}

      <div className="row">
        {isLoading ? (
          <p
            className="text-center"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "1.2rem",
              color: "#7f8c8d",
            }}
          >
            Loading news...
          </p>
        ) : news.length > 0 ? (
          news.map((article) => (
            <div className="col-md-4" key={article.link}>
              <NewsItem
                title={article.title || "No Title"}
                description={article.description || "No Description"}
                imageUrl={article.image_url || "https://images.wsj.net/im-69304896/social"}
                onReadMore={() => handleReadMore(article)}
              />
            </div>
          ))
        ) : (
          <p
            className="text-center"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "1.2rem",
              color: "#7f8c8d",
            }}
          >
            No news available
          </p>
        )}
      </div>

      {news.length > 0 && !isLoading && (
        <div className="d-flex flex-column align-items-center my-4">
          <p
            className="text-muted"
            style={{ fontFamily: "'Lora', serif", fontSize: "1rem" }}
          >
            Page {currentPage}
          </p>
          <div className="d-flex justify-content-between w-50">
            <button
              className="btn"
              disabled={prevPages.length === 0 || isLoading}
              onClick={() => fetchNewsDebounced(prevPages[prevPages.length - 2], false)}
              style={{
                backgroundColor: "#34495e",
                color: "#fff",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "500",
                padding: "0.75rem 1.5rem",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2c3e50")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#34495e")}
            >
              ← Previous Page
            </button>
            <button
              className="btn"
              disabled={!nextPage || isLoading}
              onClick={() => fetchNewsDebounced(nextPage, true)}
              style={{
                backgroundColor: "#34495e",
                color: "#fff",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "500",
                padding: "0.75rem 1.5rem",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2c3e50")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#34495e")}
            >
              Next Page →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;