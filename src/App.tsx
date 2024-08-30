import { ReactElement, useState } from "react";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";
import { IMovie } from "./interfaces";

export function App(): ReactElement {
  const [movieList, setMovieList] = useState<IMovie[] | null>(null);

  const handleAddMovie = (newItem: IMovie) => {
    setMovieList((m) => {
      // If there's a list to spread append newItem, else begin new list
      const list = m ? [...m, newItem] : [newItem];
      return list;
    });
  };

  const handleDeleteMovie = (id: number) => {
    if (movieList) {
      const newList = movieList.filter((m) => m.id !== id);

      // Make sure list is null if final entry was deleted
      newList.length > 0 ? setMovieList(newList) : setMovieList(null);
    }
  };

  return (
    <>
      <h1>Add Movies</h1>
      <AddMovie movieList={movieList} handleAddMovie={handleAddMovie} />
      {movieList && <MovieList movieList={movieList} handleDeleteMovie={handleDeleteMovie} />}
    </>
  );
}
