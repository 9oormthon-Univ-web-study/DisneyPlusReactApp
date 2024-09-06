import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useCallback } from 'react';
import './Row.css';
import MovieModal from './MovieModal/MovieModal';
import styled from 'styled-components';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

//swiper 모듈과 관련한 css import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

const Row = ({ title, id, fetchUrl }) => {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelect, setMovieSelect] = useState({});

    const fetchMovieData = useCallback(async () => {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
    }, [fetchUrl]);

    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelect(movie);
    };

    return (
        <Container>
            <h2>{title}</h2>
            <Swiper
                //Swiper에서 사용할 모듈 지정(설치)
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                loop={true} // 한 쪽 끝까지 가서 다음으로 넘기면 처음으로(반대쪽 끝으로) 돌아오게
                navigation // arrow 사용 유무
                pagination={{ clickable: true }} // 스크롤의 페이지 보이게 할 지
                breakpoints={{
                    // 반응형으로 width에 따라 슬라이드의 개수 다르게 설정
                    1378: {
                        slidesPerView: 6, //한번에 보이는 슬라이드 개수
                        slidesPerGroup: 6,
                    },
                    998: {
                        slidesPerView: 5, //한번에 보이는 슬라이드 개수
                        slidesPerGroup: 5,
                    },
                    625: {
                        slidesPerView: 4, //한번에 보이는 슬라이드 개수
                        slidesPerGroup: 4,
                    },
                    0: {
                        slidesPerView: 3, //한번에 보이는 슬라이드 개수
                        slidesPerGroup: 3,
                    },
                }}
            >
                <Content id={id}>
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Wrap>
                                <img
                                    key={movie.id}
                                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                    alt={movie.title || movie.original_name}
                                    onClick={() => handleClick(movie)}
                                />
                            </Wrap>
                        </SwiperSlide>
                    ))}
                </Content>
            </Swiper>
            {
                modalOpen && (
                    <MovieModal {...movieSelect} setModalOpen={setModalOpen} />
                ) /* 호출 위치에 따라 z-index가 안 맞아 수정 */
            }
        </Container>
    );
};

export default Row;

const Container = styled.div`
    padding: 0 0 26px;
`;

const Content = styled.div``;

const Wrap = styled.div`
    width: 95%;
    //height: 95%;
    padding-top: 56.25%; //현재 부모 요소의 height값이 지정된 게 없어서 padding-top에 의해 16:9비율에 맞춰 높이가 설정되고 있음
    border-radius: 10px;
    box-shadow: rgb(0 0 0/69%) 0px 26px 30px -10px, rgb(0 0 0/73%) 0px 16px 10px -10px;
    cursor: pointer;
    overflow: hidden;
    position: relative; //img를 Wrap에 맞춰서 설정하기 위해서
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    border: 3px solid rgba(249, 249, 249, 0.1);

    // 왜 굳이 absolute, inset:0px을 주면서까지 위치를 직접 지정하냐?
    // => 상위 요소에 height값이 직접 지정되어 있지 않고 padding-top에 의존해 크기를 지정하고 있기 때문에
    // 요소가 예상치 못한 곳에서 렌더링 되면 깨질 수 있음
    img {
        inset: 0px;
        display: block;
        height: 100%;
        object-fit: cover;
        opacity: 1;
        position: absolute;
        width: 100%;
        transition: opacity 500ms ease-in-out;
        z-index: 1;
    }
    &:hover {
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        transform: scale(0.98);
        border-color: rgba(249, 249, 249, 0.8);
    }
`;
