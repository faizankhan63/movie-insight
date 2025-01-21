import React, { useState } from "react";
import style from "./card-style.module.scss";
import demmoPicture from "../../assets/3d-render-theater-sign-red-curtain_252008-1610.avif";

const getShortLanguage = (lang) => {
  const languageMapping = {
    English: "Eng",
    Spanish: "Esp",
    French: "Fr",
    German: "Ger",
    Italian: "It",
    Hindi: "Hin",
    Polish: "Pol",
    Sindarin: "Sin",
    Quenya: "Que",
    Japanese: "Jpn",
  };

  return languageMapping[lang] || lang;
};

const CardComponent = ({ movie, onClick }) => {
  var youtubeThumbnail = require("youtube-thumbnail");

  var thumbnail = youtubeThumbnail(movie?.youtube_link);

  return (
    <div className={style.card} onClick={onClick}>
      <div className={style.content}>
        <div className={style.imageContainer}>
          <img
            className={style.movieImage}
            src={
              movie?.youtube_link?.length ? thumbnail?.high?.url : demmoPicture
            }
            alt={movie.title}
          />
        </div>
        <h2 className={style.movieTitle}>{movie.title}</h2>
        <div className={style.flexContainer}>
          <p className={style.movieYear}>Year:</p>
          <p className={style.movieYear}>{movie.year}</p>
        </div>
        <div className={style.flexContainer}>
          <p className={style.movieGenre}>Genre:</p>
          <p className={style.movieGenre}>{movie.genre.join(", ")}</p>
        </div>
        <div className={style.flexContainer}>
          <p className={style.movieCountry}>Country:</p>
          <p className={style.movieCountry}>{movie.country.join(", ")}</p>
        </div>
        <div className={style.flexContainer}>
          <p className={style.movieRating}>IMDb Rating:</p>
          <p className={style.movieRating}>{movie.imdb_rating}</p>
        </div>
        <div className={style.flexContainer}>
          <p className={style.movieNominations}>Oscar Nominations:</p>
          <p className={style.movieNominations}>{movie.oscar_nominations}</p>
        </div>
        <div className={style.flexContainer}>
          <p className={style.movieWins}>Oscar Wins:</p>
          <p className={style.movieWins}>{movie.oscar_winning}</p>
        </div>

        <div className={style.flexContainer}>
          <p className={style.movieCast}>Cast:</p>
          <p className={style.movieCast}>{movie.cast.join(", ")}</p>
        </div>
        <div className={style.movieLanguage}>
          {movie.language.map((lang, index) => {
            const shortLang = getShortLanguage(lang);
            return (
              <span key={index} className={style.languageTag}>
                {shortLang}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
