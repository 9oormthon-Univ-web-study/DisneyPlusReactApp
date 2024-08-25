import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useParams } from 'react-router-dom';

const Detail = () => {
    let { movieId } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`/movie/${movieId}`); //영화가 아닌 작품 클릭하면 404
            console.log('여기?', response);
            setMovie(response.data);
        }
        fetchData();
    }, [movieId]);

    if (!movie) {
        return null;
    } else {
        return (
            <section>
                <img
                    className="modal_poster-img"
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt="img"
                />
            </section>
        );
    }
};

export default Detail;
