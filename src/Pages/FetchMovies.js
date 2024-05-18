import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import NavBar from "../Components/NavBar";
import "./FetchMovies.css";

function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.trim() === "") {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=4617dbc&s=${search}`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [search]);

  return (
    <div className="fetchmovies">
      <NavBar />
      <div className="movie-section">
        <section className="content-wrapper">
          <div className="content-container">
            <h1 className="section-title">Search for Movies</h1>
            <Search search={search} setSearch={setSearch} />
            <div className="category-container">
              <button className="category-button">Movies</button>
              <button className="category-button">Watchlist</button>
            </div>
          </div>
        </section>

        <section>
          <MovieList movies={movies} />
        </section>
      </div>
    </div>
  );
}

function Search({ search, setSearch }) {
  return (
    <div className="search-container">
      <div className="search-input">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-text"
          placeholder="Search for the movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li className="listed">
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default SearchMovies;
