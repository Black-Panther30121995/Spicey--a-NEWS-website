import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor()
  {
    super();
    this.state= {
      articles:[],
      loading:false
    };
    console.log("Hello, I am a constructor from News")
  }

  async componentDidMount()
  {
    let url="https://newsapi.org/v2/everything?domains=wsj.com&apiKey=12bc9611016b4c38b573ffc718ae6faa";
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles});
  }

  render() {
    return (
      <div className="container my-3">
        <h2>Spicey - Top Spicy News</h2>
        <div className="row">
          {this.state.articles.map((ele)=>{
            return  <div className="col-md-4" key={ele.url}>
            <NewsItem title={ele.title?ele.title:""} description={ele.description?ele.description:""} imageUrl={ele.urlToImage} newsUrl={ele.url} />
          </div>
          })}
          
        </div>
      </div>
    );
  }
}

export default News;
