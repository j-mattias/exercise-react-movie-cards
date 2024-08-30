import { ReactElement } from "react";
import "./MovieCard.css";
import { IMovie } from "../interfaces";

interface IMovieCardProps {
  movie: IMovie;
  handleDeleteMovie: () => void;
}

export default function MovieCard({ movie, handleDeleteMovie }: IMovieCardProps): ReactElement {
  return (
    <div className="card-wrapper">
      <article className="card-movie" onClick={handleDeleteMovie}>
        <div className="card-info-wrapper">
          <h4 className="card-movie__title">{movie.title}</h4>
          <div className="misc-wrapper">
            <h4 className="card-movie__rating">{movie.rating}/5</h4>
            <h4 className="card-movie__genre">{movie.genre}</h4>
          </div>
        </div>
        <p className="card-movie__description">{movie.description}</p>
      </article>
      <p className="card-movie__delete">Delete</p>
    </div>
  );
}
