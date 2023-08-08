import React, { useEffect, useState } from "react";
import MoviesItem from './MoviesItem';


function Movies(props) {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    props.setProgress(10);
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => setShows(data))
      .catch(error => console.error('Error fetching data:', error));
      props.setProgress(100);
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
        {shows.map((show, index) => (
          <div className="col-md-4" key={index}>
          <MoviesItem setShowName={props.setShowName} name={show.show.name} summary={show.show.summary.slice(0, 200)} imgUrl={show.show.image ? show.show.image.medium : "blank"} language={show.show.language} status={show.show.status}/>
        </div>
        ))}
        </div>
      </div>
    </>
  );
}

export default Movies;
