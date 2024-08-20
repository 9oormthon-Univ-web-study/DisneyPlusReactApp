import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; //axios라이브러리 이름이 아닌 우리가 만든 인스턴스 이름!!
//export default로 설정해줘서 어떤 이름으로 부르든 상관 없음
import request from '../api/request';
import './Banner.css';
const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get(request.fetchNowPlaying);
        //result가 Array형태로 있기 때문에 인덱스로 접근
        const movieId = response.data.results[Math.floor(Math.random() * response.data.results.length)].id;
        //랜덤한 영화의 상세 정보 가져오기
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: 'videos' },
        });
        setMovie(movieDetail);
    };

    console.log(movie);
    return (
        <header
            className="banner"
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                backgroundPosition: 'top center',
                backgroundSize: 'cover',
            }}
        >
            <div className="banner_contents">
                <h1 className="banner_title">{movie.title || movie.name || movie.original_name}</h1>
                <div className="banner_buttons">
                    {movie?.videos?.results[0]?.key && <button className="banner_button play">play</button>}
                </div>
                <p className="banner_description">{movie.overview}</p>
                <div className="fade_bottom" />
                {/* 이미지가 사라지는 효과를 주기 위해서, 근데 주게되면 밑에만 줘야되기 때문에 외부 태그에서 설정 */}
            </div>
        </header>
    );
};

export default Banner;
