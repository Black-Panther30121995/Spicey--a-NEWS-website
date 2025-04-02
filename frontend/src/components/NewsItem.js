import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, onReadMore } = this.props;
    return (
      <div className="my-3">
        <div
          className="card shadow-sm border-0"
          style={{
            width: "20rem",
            borderRadius: "15px",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.05)";
          }}
        >
          <img
            src={imageUrl || "https://images.wsj.net/im-69304896/social"}
            className="card-img-top"
            alt="News"
            style={{
              height: "200px",
              objectFit: "cover",
              borderBottom: "1px solid #f0f0f0",
            }}
          />
          <div className="card-body" style={{ padding: "1.5rem" }}>
            <h5
              className="card-title"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#2c3e50",
                lineHeight: "1.4",
              }}
            >
              {title.length > 60 ? title.slice(0, 60) + "..." : title}
            </h5>
            <p
              className="card-text"
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "0.95rem",
                color: "#7f8c8d",
                lineHeight: "1.6",
              }}
            >
              {description.length > 100
                ? description.slice(0, 100) + "..."
                : description}
            </p>
            <button
              onClick={onReadMore}
              className="btn btn-sm"
              style={{
                backgroundColor: "#34495e",
                borderColor: "#34495e",
                color: "#fff",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "1px",
                padding: "0.5rem 1.25rem",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2c3e50")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#34495e")}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;