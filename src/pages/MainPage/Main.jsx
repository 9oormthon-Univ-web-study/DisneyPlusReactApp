import React from 'react';
import Nav from '../../components/Nav';
import Banner from '../../components/Banner';
import Category from '../../components/Category';
import Row from '../../components/Row';
import styled from 'styled-components';
import request from '../../api/request';

const Main = () => {
    return (
        <Container>
            <Nav />
            <Banner />
            {/* 랜덤한 영화에 대한 정보가 배너로 등장 */}
            <Category />
            {/* 영화사들을 카테고리로 분류 */}
            {/* 장르별로 영화들 리스트하는 Row */}
            <Row title="Trending Now" id="TN" fetchUrl={request.fetchTrending} />
            <Row title="Top Rated" id="TR" fetchUrl={request.fetchTopRated} />
            <Row title="Action movies" id="AM" fetchUrl={request.fetchActionMovies} />
            <Row title="Comedy Movie" id="CM" fetchUrl={request.fetchComedyMovies} />
        </Container>
    );
};

export default Main;

const Container = styled.main`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 72px; //Nav크기만큼 밑에서 시작하기 위해
    padding: 0 calc(3.5vw + 5px);

    &:after {
        background: url('/images/home-background.png') center center/cover no-repeat fixed;
        content: '';
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
        margin: 0;
    }
`;
