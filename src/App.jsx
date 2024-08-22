import styled from 'styled-components';
import './App.css';
import Nav from './components/Nav';
import Banner from './components/Banner';
import Category from './components/Category';
import Row from './components/Row';
import request from './api/request';

function App() {
    return (
        <Container>
            <Nav />
            <Banner />
            <Category />
            <Row title="Trending Now" id="TN" fetchUrl={request.fetchTrending} />
            <Row title="Top Rated" id="TR" fetchUrl={request.fetchTopRated} />
            <Row title="Action movies" id="AM" fetchUrl={request.fetchActionMovies} />
            <Row title="Comedy Movie" id="CM" fetchUrl={request.fetchComedyMovies} />
        </Container>
    );
}

export default App;

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
