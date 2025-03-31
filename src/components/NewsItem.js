import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div className="my-3">
        <div className="card shadow-lg" style={{ width: "18rem", borderRadius: "10px" }}>
          <img
            src={imageUrl ? imageUrl : "https://images.wsj.net/im-69304896/social"}
            className="card-img-top"
            alt="News"
            style={{ height: "180px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title.length > 60 ? title.slice(0, 60) + "..." : title}</h5>
            <p className="card-text">{description.length > 100 ? description.slice(0, 100) + "..." : description}</p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
