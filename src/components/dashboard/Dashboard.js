import React, { useEffect, useState } from "react";
import moviesData from "../../utils/movies.json";
import CardComponent from "../card/cardComponent";
import style from "./dashboard-style.module.scss";
import GroupedBarChart from "../bar-chart/bar-chart";

const Dashboard = () => {
  const [movies, setMovies] = useState(moviesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const handleNavigate = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleGenreSelection = (genre) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((g) => g !== genre)
        : [...prevSelected, genre]
    );
  };

  const filteredMovies = movies
    .filter((movie) => {
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());

      const matchesGenres =
        selectedGenres.length > 0
          ? movie.genre.some((genre) => selectedGenres.includes(genre))
          : true; // Show all if no genres selected

      return matchesTitle && matchesGenres;
    })
    .filter(
      (movie, index, self) =>
        index === self.findIndex((m) => m.title === movie.title)
    );

  const allGenres = Array.from(new Set(movies.flatMap((movie) => movie.genre)));

  return (
    <>
      <div className={style.mainWrapper}>
        <div className={style.container}>
          <h1 className="text-white font-bold text-4xl text-center">
            BOX OFFICE DASHBOARD
          </h1>
          <div className={style.searchBarDiv}>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={style.inputField}
            />
            <div className={style.genreTagsContainer}>
              <div className={style.genreTagsDiv}>
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => toggleGenreSelection(genre)}
                    className={`${style.genreTag} ${
                      selectedGenres.includes(genre) ? style.activeTag : ""
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
              <div>
                <button
                  onClick={() => setSelectedGenres([])}
                  className={`${
                    selectedGenres?.length
                      ? style.clearGenresButton
                      : style.clearGenresButtonHidden
                  }`}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className={style.cardContainer}>
            {filteredMovies?.map((movie) => (
              <CardComponent
                key={movie.id}
                movie={movie}
                onClick={() => handleNavigate(movie?.youtube_link)}
              />
            ))}
          </div>
          <div style={{ width: "100%", height: "100%" }}>
            <GroupedBarChart data={filteredMovies} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
