import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Article = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state || {};

  return (
    <div
      className="container my-5"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "2rem",
        borderRadius: "10px",
        minHeight: "80vh",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        className="btn mb-3"
        style={{
          backgroundColor: "#34495e",
          color: "#fff",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: "500",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2c3e50")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#34495e")}
      >
        ← Back to News
      </button>

      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#2c3e50",
          marginBottom: "1.5rem",
        }}
      >
        {article.title || "No Title"}
      </h1>

      {article.image_url && (
        <img
          src={article.image_url || "https://images.wsj.net/im-69304896/social"}
          alt={article.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "2rem",
          }}
        />
      )}

      <p
        style={{
          fontFamily: "'Lora', serif",
          fontSize: "1.1rem",
          color: "#2c3e50",
          lineHeight: "1.8",
          whiteSpace: "pre-wrap",
        }}
      >
        {article.content
          ? article.content
          : "Full content is not available for this article. Please visit the original source for more details."}
      </p>

      {article.link && (
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-3"
          style={{
            backgroundColor: "#34495e",
            color: "#fff",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "500",
            padding: "0.5rem 1.25rem",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#2c3e50")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#34495e")}
        >
          Visit Original Source
        </a>
      )}
    </div>
  );
};

export default Article;