import { ReactElement, useRef, useState } from "react";
import "./AddMovie.css";
import { IMovie } from "../interfaces";
import MovieList from "./MovieList";

const GENRES: string[] = ["Drama", "Fantasy", "Action", "Sci-fi", "Comedy", "Romance"];

export default function AddMovie(): ReactElement {
  const [movieList, setMovieList] = useState<IMovie[] | null>(null);
  const [rating, setRating] = useState<number>(3);
  const [entryMissing, setEntryMissing] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  // Helper function to set movie id
  const findMaxId = (movieList: IMovie[]) => {
    if (movieList) {
      return Math.max(...movieList.map((movie) => movie.id));
    }
    return 1;
  };

  // React.FormEvent<HTMLFormElement>
  const addMovie: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // Assert target to be a HTMLFormElement and capture form values in a FormData object
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    // console.log(formData);

    // If there are empty fields, early return and display error message
    for (const value of formData.values()) {
      let assertValue = value as string;
      if (!assertValue.trim()) {
        setEntryMissing(true);
        return;
      }
    }
    setEntryMissing(false);

    // Store the form data in a normal object
    const movie: IMovie = {
      title: formData.get("title") as string,
      rating: parseInt(formData.get("rating") as string),
      genre: formData.get("genre") as string,
      description: formData.get("description") as string,
      id: movieList ? findMaxId(movieList) + 1 : 1,
    };

    // Add movie to movieList
    movieList ? setMovieList([...movieList, movie]) : setMovieList([movie]);

    // Reset the form inputs
    target.reset();
    console.log("saved movie: ", movie);
  };

  return (
    <>
      {/* Display error if fields were empty on submit */}
      {entryMissing && <div className="alert">Please fill out all fields</div>}
      
      <form className="form-movie" onSubmit={addMovie} ref={formRef}>
        <div className="input-wrapper">
          <label htmlFor="movie-title">Title</label>
          <input
            className="form-movie__title"
            id="movie-title"
            name="title"
            placeholder="Movie title"
            type="text"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="movie-rating">Rating</label>
          <div className="range-wrapper">
            <span>{rating}</span>
            <input
              className="form-movie__rating"
              id="movie-rating"
              max="5"
              min="1"
              name="rating"
              onChange={(e) => setRating(parseInt(e.target.value))}
              type="range"
            />
            <span>5</span>
          </div>
        </div>
        <div className="input-wrapper">
          <label htmlFor="movie-genre">Genre</label>
          <select name="genre" id="movie-genre">
            {/* <option value="" selected disabled hidden>--Select--</option> */}
            {GENRES.map((genre, i) => (
              <option value={genre} key={i}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="input-wrapper">
          <label htmlFor="movie-desc">Description</label>
          <div className="desc-wrapper">
            <textarea name="description" id="movie-desc"></textarea>
            <div className="button-wrapper">
              <button className="clear-desc" onClick={() => formRef.current!.reset()} type="button">
                Clear
              </button>
              <button className="add-movie" type="submit">
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
      {movieList && <MovieList movieList={movieList} />}
    </>
  );
}
