import { ReactElement } from "react";
import { IMovie } from "../interfaces";
import MovieCard from "./MovieCard";
import "./MovieList.css";

interface IMovieListProps {
  movieList: IMovie[];
  handleDeleteMovie: (id: number) => void;
}

export default function MovieList({ movieList, handleDeleteMovie }: IMovieListProps): ReactElement {

  return (
    <section className="movie-list">
      {movieList.map((movie) => (
        <MovieCard movie={movie} key={movie.id} handleDeleteMovie={() => handleDeleteMovie(movie.id)} />
      ))}
    </section>
  )
}
