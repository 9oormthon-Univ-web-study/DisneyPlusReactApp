import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Nav = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
        return () => {
            window.removeEventListener('scroll', () => {});
            //removeEventListener는 컴포넌트를 안 쓸 때는 이벤트 리스너 지우도록
            //이게 없으면 컴포넌트를 없앴다가 다시 돌아올 때마다 계속 리스너가 쌓이게 됨
        };
    }, []);

    return (
        <NavWrapper show={show}>
            <Logo>
                <img
                    alt="Disney Plus Logo"
                    src="/images/logo.svg"
                    onClick={() => {
                        window.location.href = '/'; //url이동 처리
                    }}
                />
            </Logo>
        </NavWrapper>
    );
};

export default Nav;

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
