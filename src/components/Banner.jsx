import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios'; //axios라이브러리 이름이 아닌 우리가 만든 인스턴스 이름!!
//export default로 설정해줘서 어떤 이름으로 부르든 상관 없음
import request from '../api/request';
import './Banner.css';
const Banner = () => {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

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

    const truncate = (str, n) => {
        return str?.length > n ? str.substring(0, n) + '...' : str;
    };

    if (isClicked) {
        return (
            <>
                <Container>
                    <HomeContainer>
                        <Iframe
                            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&playlist=${movie.videos.results[0].key}`}
                            frameborder="0"
                            height="360"
                            width="100%"
                            allow="autoplay; fullscreen"
                        ></Iframe>
                    </HomeContainer>
                </Container>
                <button onClick={() => setIsClicked(false)}>X</button>
            </>
        );
    } else {
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
                        {movie?.videos?.results[0]?.key && (
                            <button onClick={() => setIsClicked(true)} className="banner_button_play">
                                play
                            </button>
                        )}
                    </div>
                    <p className="banner_description">{truncate(movie.overview, 100)}</p>
                    <div className="fade_bottom" />
                    {/* 이미지가 사라지는 효과를 주기 위해서, 근데 주게되면 밑에만 줘야되기 때문에 외부 태그에서 설정 */}
                </div>
            </header>
        );
    }
};

export default Banner;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.65;
    border: none;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0%;
        height: 100%;
        width: 100%;
    }
`;
