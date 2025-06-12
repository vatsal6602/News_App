import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import NewsItems from './NewsItems';
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://gnews.io/api/v4/top-headlines?lang=en&topic=${props.category}&token=${process.env.REACT_APP_GNEWS_API_KEY}&max=${props.pageSize}&page=${page}`;
    setLoading(true);
    const data = await fetch(url);
    props.setProgress(30);
    const parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalArticles || 0);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, [page, props.category]);

  const prevPg = () => {
    if (page > 1) setPage(page - 1);
  };

  const nxtPg = () => {
    if (page + 1 <= Math.ceil(totalResults / props.pageSize)) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Headlines</h2>
        {loading && <Loading />}
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItems
                title={element.title ? element.title.slice(0, 50) : ""}
                description={element.description ? element.description.slice(0, 50) : ""}
                imgUrl={element.image}
                newsUrl={element.url}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={prevPg}
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={page >= Math.ceil(totalResults / props.pageSize)}
            onClick={nxtPg}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ GNews doesn't use 'country', so we remove that.
News.defaultProps = {
  pageSize: 12,
  category: 'nation', // can be 'world', 'business', etc.
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
