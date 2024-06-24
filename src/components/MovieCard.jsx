import { Link } from "react-router-dom";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const MovieCard = ({ posterPath, id }) => {
  // to get youtube video key
  const [trailerKey, setTrailerkey] = useState(null);
  // console.log(id);

  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json?.results?.filter(
      (video) => video.type === "Trailer"
    );
    console.log("filterData", filterData);
    const trailer = filterData[0];
    console.log("trailer", trailer);
    setTrailerkey(trailer?.key);
  };

  useEffect(() => {
    getMovieVideo();
  }, []);

  if (!posterPath) return null;

  return (
    <div className="w-36 md:w-48 pr-4 transition-transform transform hover:scale-95 hover:z-10 duration-300 ease-in-out">
      <Link to={"https://www.youtube.com/watch?v=" + trailerKey}>
        <img
          className="rounded-sm"
          src={IMG_CDN_URL + posterPath}
          alt="movie card"
        />
      </Link>
    </div>
  );
};

export default MovieCard;
