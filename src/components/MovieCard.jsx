import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, id }) => {
  if (!posterPath) return null;

  return (
    <div className="w-36 md:w-52 pr-4 transition-transform transform hover:scale-95 hover:z-10 duration-300 ease-in-out">
      <Link to={"/browse/" + id}>
        <img
          className="rounded-lg"
          src={IMG_CDN_URL + posterPath}
          alt="movie card"
        />
      </Link>
    </div>
  );
};

export default MovieCard;
