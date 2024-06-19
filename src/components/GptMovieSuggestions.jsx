import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  return (
    <>
      {movieNames ? (
        <div className="p-4 m-4 bg-black text-white bg-opacity-90">
          {movieNames?.map((movieName, index) => (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default GptMovieSuggestions;
