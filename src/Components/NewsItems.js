import React from 'react';

const NewsItems = (props) => {
  let { title, description, imgUrl, newsUrl } = props;
  return (
    <div>
      <div className="card h-100 shadow-sm">
        <img
          src={imgUrl || "https://static01.nyt.com/images/2022/03/22/arts/22latenight/22latenight-facebookJumbo.png"}
          className="card-img-top"
          alt="news"
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            {title ? title.slice(0, 60) + (title.length > 60 ? "..." : "") : "No Title"}
          </h5>
          <p className="card-text" style={{ flexGrow: 1 }}>
            {description ? description.slice(0, 100) + (description.length > 100 ? "..." : "") : "No description available."}
          </p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-auto">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItems;
