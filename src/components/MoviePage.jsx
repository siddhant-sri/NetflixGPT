import { useParams } from "react-router-dom";
import VideoBackground from "./VideoBackground";
import { API_OPTIONS, LOGO } from "../utils/constants";
import { useEffect, useState } from "react";

const MoviePage = () => {
  const { movieId } = useParams();
  console.log("useparams", movieId);

  const [movieDetails, setMovieDetails] = useState(null);

  const getMovieDetails = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US",
      API_OPTIONS
    );

    const json = await data.json();
    console.log("json", json);
    setMovieDetails(json);
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <div>
      {/* NAVBAR */}
      <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex flex-col md:flex-row justify-between">
        <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      </div>

      {/* Movie Title and Description */}
      <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute pt-36 px-12 text-white bg-gradient-to-r from-black">
        <h1 className="text-2xl md:text-6xl font-bold">
          {movieDetails?.original_title}
        </h1>
        <p className="hidden md:inline-block py-6 text-lg w-2/4">
          {movieDetails?.overview}
        </p>
        <div className="my-2 md:my-0 flex">
          {movieDetails?.genres.map((genre) => (
            <p
              key={genre?.id}
              className="hidden md:inline-block mx-2 bg-stone-800 bg-opacity-80 text-white p-2 px-4 text-md rounded-full"
            >
              {genre?.name}
            </p>
          ))}
        </div>
      </div>
      <VideoBackground movieId={movieId} />
    </div>
  );
};

export default MoviePage;
