import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useCallback } from 'react';
import './Row.css';

const Row = ({ title, id, fetchUrl }) => {
    const [movies, setMovies] = useState([]);

    const fetchMovieData = useCallback(async () => {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
    }, [fetchUrl]); //fetchUrl이 바뀌는게 아니면 함수를 초기화할 필요 없음,
    //고정된 fetchUrl을 받는 함수로 만들어져있어서 fetchUrl이 바뀌면 함수도 재생성되어야 함.
    //일반적으로 fetchUrl이 바뀌는 경우는 없지만 혹시나 나중에 수정될 수 있으니, 구조적으로 안전하니까, ... 등등의 이유로 넣어둠

    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);

    console.log(movies);

    return (
        <div>
            <h2>{title}</h2>
            <div className="slider">
                <div
                    className="slider_arrow-left"
                    onClick={() => {
                        document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                    }}
                >
                    <span className="arrow">{'<'}</span>
                </div>
                <div id={id} className="row_posters">
                    {movies.map((movie) => (
                        <img
                            key={movie.id}
                            className="row_poster"
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    ))}
                </div>
                <div
                    className="slider_arrow-right"
                    onClick={() => {
                        document.getElementById(id).scrollLeft += window.innerWidth - 80;
                    }}
                >
                    <span className="arrow">{'>'}</span>
                </div>
            </div>
        </div>
    );
};

export default Row;
