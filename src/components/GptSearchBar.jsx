import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
// import openai from "../utils/openai";
import groq from "../utils/groqCloud";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    // console.log(searchText.current.value);
    setLoading(true);

    // Make an API call to GPT API and get movie results

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query :" +
      searchText.current.value +
      ". only give me names of 5 movies, comma separated like the example given ahead. Only this way no other text in response. Example Results : Gadar, Koi mil gya , Sholay, Don, Golmaal";

    const gptResults = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: gptQuery,
        },
      ],
      model: "llama3-8b-8192",
    });

    if (!gptResults.choices) {
      // TODO : Write error handling
    }

    // console.log("gpt response", gptResults?.choices[0]?.message?.content);

    // "Sholay, Golmaal, Hera Pheri, Hum Aapke Hain Koun..!, Mughal-e-Azam"

    const gptMovies = gptResults?.choices[0]?.message?.content.split(",");

    // ['Sholay', ' Golmaal', ' Hera Pheri', ' Hum Aapke Hain Koun..!', ' Mughal-e-Azam']

    // For each movie i will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // console.log("promiseARRay", promiseArray);
    // [Promise, Promise, Promise, Promise, Promise,]

    const tmdbResults = await Promise.all(promiseArray);
    // console.log("resolved promise", tmdbResults);

    setLoading(false);

    dispatch(
      addGptMoviesResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex flex-col items-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="col-span-9 p-4 m-4"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
      {loading ? (
        <div className="text-white bg-black bg-opacity-70 text-lg md:text-3xl font-bold p-3 mt-3">
          Getting Your Search Results...
        </div>
      ) : null}
    </div>
  );
};

export default GptSearchBar;
