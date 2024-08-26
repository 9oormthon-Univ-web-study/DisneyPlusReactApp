import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {
    const [show, setShow] = useState(false); //상단바의 배경색을 지정할 기준이 되는 상태 변수
    const { pathname } = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            //removeEventListener는 컴포넌트를 안 쓸 때(언마운트 될 때)는 이벤트 리스너 지우도록
            //이게 없으면 컴포넌트를 없앴다가 다시 돌아올 때마다 계속 리스너가 쌓이게 됨
        };
    }, []);

    useEffect(() => {});

    const handleScroll = () => {
        //스크롤 값을 받고 50보다 크면 상태를 true로
        if (window.scrollY > 50) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`); //url 바꿔주고 Search컴포넌트 리렌더링됨
    };
    return (
        <NavWrapper show={show}>
            <Logo>
                {/* Logo가 NavWrapper안에 감싸져있기 때문에 안에 있을 수 있는듯 */}
                <img
                    alt="Disney Plus Logo"
                    src="/images/logo.svg"
                    onClick={() => {
                        window.location.href = '/'; //url이동 처리
                    }}
                />
            </Logo>
            {/* "/"로 접근했을 때 기본은 Login페이지기 때문에 Login페이지에서는 login할 수 있는 기능을 렌더링 시켜주기 위해서 */}
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
    text-transform: uppercase; //대문자로 변경
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    transition: all 0.2s ease 0s;

    &:hover {
        background-color: #f9f9f9;
        color: gray;
        border-color: transparent; //투명한 효과
    }
`;

const Input = styled.input`
    position: fixed;
    left: 50%; //50%만큼 이동했는데 요소의 크기만큼 오른쪽으로 남아있을 거기 때문에 transform을 사용해서
    transform: translate(-50%, 0); //요소를 X축과 Y축에서 각각 50%와 0%만큼 이동
    background-color: rgba(0, 0, 0, 0.582);
    border-radius: 5px;
    color: white;
    padding: 5px;
    border: none;
`;

const NavWrapper = styled.nav`
    position: fixed; //위치 고정(스크롤해도 그대로)
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: ${(props) => (props.show ? '#090b13' : 'transparent')};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px; //문자와 문자 사이의 간격을 설정
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
