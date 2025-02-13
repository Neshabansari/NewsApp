import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor() {
    super();
    console.log("Hello, I am a constructor from News components");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3cf76a9343304b09b84856dfa4227946&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true }); // Show loading while fetching data
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false, // Loading done
    });
  }

  handlePrevClick = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3cf76a9343304b09b84856dfa4227946&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true }); // Show loading while fetching data
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false, // Loading done
    });
  };

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3cf76a9343304b09b84856dfa4227946&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

            this.setState({ loading: true }); // Show loading while fetching data
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({ loading: false });

            this.setState({
              page: this.state.page + 1,
              articles: parsedData.articles,
              loading: false, // Loading done
            })
          }
        };

  render() {
    const { articles, page, totalResults, loading } = this.state;

    return (
      <div className="container my-3">
        <h2 className="text-center">NewsMonkey - Top Headlines</h2>
        {this.state.loading && <Spinner />}   {/*if loading is true then only show the Spinner component */}

        {/* Show loading message */}
        {loading && <h3 className="text-center">Loading...</h3>}

        <div className="row">
          {!loading &&
            articles.map((article) => (
              <div className="col-md-4" key={article.url}>
                <NewsItem
                  title={article.title ? article.title : "No Title"}
                  description={article.description ? article.description : "No Description"}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                />
              </div>
            ))}
        </div>

        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={page >= Math.ceil(totalResults / this.props.pageSize)}
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
