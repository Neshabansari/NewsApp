import React, { Component } from 'react'

export default class NewsItem extends Component {
 
  render() {
   let {title, description,imageUrl,newsUrl} = this.props;
    return (
      <div className="my-3">
            <div className="card" >
                <img src={!imageUrl?"https://ichef.bbci.co.uk/news/1024/branded_news/446c/live/7e72c7d0-9dce-11ef-8f96-81e1fa9aa97d.jpg":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{description}</p>
                  <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
      </div>
    )
  }
}
