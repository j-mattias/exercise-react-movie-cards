import { ReactElement, useRef, useState } from "react";
import "./AddMovie.css";
import { IMovie } from "../interfaces";

const GENRES: string[] = ["Drama", "Fantasy", "Action", "Sci-fi", "Comedy", "Romance"];
const DEFAULT_RATING = 3;

interface IAddMovieProps {
  movieList: IMovie[] | null;
  handleAddMovie: (newItem: IMovie) => void;
}

export default function AddMovie({ movieList, handleAddMovie }: IAddMovieProps): ReactElement {
  const [rating, setRating] = useState<number>(DEFAULT_RATING);
  const [entryMissing, setEntryMissing] = useState<boolean>(false);

  // Used for clearing the form when clicking clear button
  const formRef = useRef<HTMLFormElement>(null);

  // Helper function to set movie id
  const findMaxId = (movieList: IMovie[]) => {
    if (movieList) {
      return Math.max(...movieList.map((movie) => movie.id));
    }
    return 1;
  };

  const addMovie: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // Assert target to be a HTMLFormElement and capture form values in a FormData object
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);

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
    handleAddMovie(movie);

    // Reset the form inputs
    target.reset();
    setRating(DEFAULT_RATING);
    console.log("saved movie: ", movie);
  };

  // Reset the form when hitting clear
  const clearForm: React.MouseEventHandler<HTMLButtonElement> = () => {
    setRating(DEFAULT_RATING);
    formRef.current?.reset();
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
              <button className="clear-desc" onClick={clearForm} type="button">
                Clear
              </button>
              <button className="add-movie" type="submit">
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
