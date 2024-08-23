import React, { useEffect, useState, useRef } from 'react';
import axios from '../api/axios';
import { useCallback } from 'react';
import './Row.css';
import MovieModal from './MovieModal/MovieModal';

const Row = ({ title, id, fetchUrl }) => {
    const [movies, setMovies] = useState([]);
    const rowRef = useRef(null); // useRef로 row_posters 요소를 참조
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelect, setMovieSelect] = useState({});

    const fetchMovieData = useCallback(async () => {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
    }, [fetchUrl]);

    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);

    const handleScrollLeft = () => {
        rowRef.current.scrollLeft -= rowRef.current.innerWidth;
    };

    const handleScrollRight = () => {
        rowRef.current.scrollLeft += rowRef.current.innerWidth;
    };

    console.log(movies);

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelect(movie);
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="slider">
                <div className="slider_arrow-left" onClick={handleScrollLeft}>
                    <span className="arrow">{'<'}</span>
                </div>
                <div id={id} className="row_posters" ref={rowRef}>
                    {movies.map((movie) => (
                        <img
                            key={movie.id}
                            className="row_poster"
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                            alt={movie.title || movie.original_name}
                            onClick={() => handleClick(movie)}
                        />
                    ))}
                </div>
                <div className="slider_arrow-right" onClick={handleScrollRight}>
                    <span className="arrow">{'>'}</span>
                </div>
            </div>

            {modalOpen && <MovieModal {...movieSelect} setModalOpen={setModalOpen} />}
        </div>
    );
};

export default Row;
