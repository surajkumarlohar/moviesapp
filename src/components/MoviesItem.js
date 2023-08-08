import React, { Component } from 'react';
import { Link } from "react-router-dom";

class MoviesItem extends Component {
  handleClicks = (value) => {
    this.props.setShowName(value);
  }

  render() {
    const { name, imgUrl, summary, language, status } = this.props;

    return (
      <div className="my-3">
        <div className="card">
          {imgUrl && <img src={imgUrl} className="card-img-top" alt={name} />}
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text" dangerouslySetInnerHTML={{ __html: summary }}></p>
            <p className="card-text">
              <small className="text-body-secondary">
                Language: {language}, Status: {status}
              </small>
            </p>
            <Link 
              rel="noreferrer"
              to="/summary"
              onClick={() => this.handleClicks(name)} // Pass the name prop to the handleClick method
              className="btn btn-sm btn-dark button"
            >
              Show Details
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesItem;
