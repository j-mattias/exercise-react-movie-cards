import { ReactElement } from "react";
import "./MovieCard.css";
import { IMovie } from "../interfaces";

interface IMovieCardProps {
  movie: IMovie;
}

export default function MovieCard({ movie }: IMovieCardProps): ReactElement {
  return (
    <article className="card-movie" onClick={(e) => console.log("Hi", e.target)}>
      <div className="card-wrapper">
        <h4 className="card-movie__title">{movie.title}</h4>
        <div className="misc-wrapper">
          <h4 className="card-movie__rating">{movie.rating}/5</h4>
          <h4 className="card-movie__genre">{movie.genre}</h4>
        </div>
      </div>
      <p className="card-movie__description">{movie.description}</p>
    </article>
  );
}
