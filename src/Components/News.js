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
    const apikey = process.env.REACT_APP_CURRENTS_API_KEY;

    const url = `https://api.currentsapi.services/v1/latest-news?apiKey=${apikey}&category=${props.category}`;
    setLoading(true);

    try {
      const response = await fetch(url);
      props.setProgress(30);
      const parsedData = await response.json();
      props.setProgress(70);

      const safeArticles = Array.isArray(parsedData.news) ? parsedData.news : [];
      localStorage.setItem(`news_${props.category}`, JSON.stringify(safeArticles));
      setArticles(safeArticles);
      setTotalResults(safeArticles.length);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Currents API error:", error);
      setLoading(false);
    }
  };



  useEffect(() => {
    const cached = localStorage.getItem(`news_${props.category}`);
    if (cached) {
      setArticles(JSON.parse(cached));
      setLoading(false);
      setTotalResults(JSON.parse(cached).length);
      console.log("📦 Loaded from cache:", props.category);
    } else {
      updateNews(); // fetch from API if no cache
    }
  }, [props.category]);


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
          {articles
            .slice((page - 1) * props.pageSize, page * props.pageSize)
            .map((element) => (
              <div className="col-md-4" key={element.url || element.title}>
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
            disabled={page >= Math.ceil(articles.length / props.pageSize)}
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
