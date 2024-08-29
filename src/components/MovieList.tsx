import { ReactElement } from "react";
import { IMovie } from "../interfaces";
import MovieCard from "./MovieCard";
import "./MovieList.css";

interface IMovieListProps {
  movieList: IMovie[];
}

export default function MovieList({ movieList }: IMovieListProps): ReactElement {
  return (
    <section className="movie-list">
      {movieList.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </section>
  )
}
