import React, { useEffect } from 'react';
import axios from '../../api/axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Search.css';

const Search = () => {
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();
    const searchTerm = query.get('q');

    useEffect(() => {
        if (searchTerm) {
            fetchSearchMovie(searchTerm);
        }
    }, [searchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        try {
            const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
            setSearchResult(request.data.results);
            console.log(searchTerm);
            console.log(searchResult);
        } catch (error) {
            console.error(error);
        }
    };

    if (searchResult.length > 0) {
        return (
            <section className="search-container">
                {searchResult.map((movie) => {
                    if (movie.backdrop_path !== null && movie.media_type !== 'person') {
                        const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
                        return (
                            <div className="movie" key={movie.id}>
                                <div
                                    className="movie_column-poster"
                                    onClick={() => {
                                        navigate(`/${movie.id}`); //detail 페이지의 path가 ":movieId"기 때문에
                                    }}
                                >
                                    <img src={movieImgUrl} alt="movie" className="movie_poster" />
                                </div>
                            </div>
                        );
                    }
                })}
            </section>
        );
    } else {
        return (
            <section className="no-results">
                <div className="no-results_text">
                    <p>찾고자 하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.</p>
                </div>
            </section>
        );
    }
};

export default Search;
