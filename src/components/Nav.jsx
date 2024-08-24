import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../api/axios';

const Nav = () => {
    const [show, setShow] = useState(false);
    const { pathname } = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };
    /*
    setSearchvalue가 비동기적으로 작동하여 searchValue의 최신 값이 navigate에 사용되기 전에 업데이트 되지 않는 문제 때문에
    useEffect로 처리하여 searchValue가 업데이트 된 후에 navigate가 실행되도록 처리 
     */
    useEffect(() => {
        if (searchValue) {
            navigate(`/search?q=${searchValue}`);
        }
    }, [searchValue, navigate]);

    return (
        <NavWrapper show={show}>
            <Logo>
                <img
                    alt="Disney Plus Logo"
                    src="/images/logo.svg"
                    onClick={() => {
                        window.location.href = '/';
                    }}
                />
            </Logo>
            {pathname === '/' ? (
                <Login>login</Login>
            ) : (
                <Input
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    value={searchValue}
                    className="nav_input"
                    type="text"
                    placeholder="검색어를 입력하세요"
                />
            )}
        </NavWrapper>
    );
};

export default Nav;

const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    transition: all 0.2s ease 0s;

    &:hover {
        background-color: #f9f9f9;
        color: gray;
        border-color: transparent;
    }
`;

const Input = styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgba(0, 0, 0, 0.582);
    border-radius: 5px;
    color: white;
    padding: 5px;
    border: none;
`;

const NavWrapper = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: ${(props) => (props.show ? '#090b13' : 'transparent')};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;

    img {
        display: block;
        width: 100%;
    }
`;
