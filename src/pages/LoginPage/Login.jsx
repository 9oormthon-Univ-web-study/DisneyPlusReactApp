import React from 'react';
import styled from 'styled-components';

const Login = () => {
    return (
        <Container>
            <Content>
                <Center>
                    <LogoOne src="/images/cta-logo-one.svg" alt="logo1" />
                    <SignUpLink>지금 가입</SignUpLink>
                    <Description>디즈니플러스입니다</Description>
                    <LogoTwo src="/images/cta-logo-two.png" alt="logo2" />
                </Center>
            </Content>
            <BgImage />
        </Container>
    );
};

export default Login;

/* 배경 설정 */
const BgImage = styled.div`
    height: 100%;
    background-position: top; // 이미지의 위치를 설정하는 속성(positin:absolute 두고 설정해둬서 딱히 의미 없음)
    background-image: url('/images/login-background.jpg');
    background-size: cover; // 크기 설정
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
`;

/* 전체 요소들을 담을 컨테이너, flex, column 설정해줘서 세로로 나열되도록 함 */
const Container = styled.section`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100vh;
`;

/* 배경을 제외한 요소들 설정 */
const Content = styled.div`
    margin-bottom: 10vw;
    width: 100%;
    position: relative; // 위치를 부모 요소를 기준으로 잡음
    min-height: 100vh; // 전체 화면 높이를 기준으로 하여
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 80px 40px; // 전체 화면 높이 기준으로 상 하 에만 padding 부여
    height: 100%;
`;

/* 요소들 */
const Center = styled.div`
    max-width: 650px;
    display: flex;
    flex-direction: column;
`;

const LogoOne = styled.img`
    margin-bottom: 12px;
    max-width: 600px;
    min-height: 1px;
    display: block;
    width: 100%;
`;

const SignUpLink = styled.a`
    font-weight: bold;
    color: #f9f9f9;
    background-color: #0063e5;
    margin-bottom: 12px;
    width: 100%;
    letter-spacing: 1.5px;
    font-size: 18px;
    padding: 16.5px 0;
    border: 1px solid transparent;
    border-radius: 4px;

    &:hover {
        background-color: #0483ee;
        cursor: pointer;
    }
`;

const Description = styled.p`
    font-size: 11px;
    margin: 0 0 24px;
    line-height: 1.5;
    letter-spacing: 1.5px;
`;

const LogoTwo = styled.img`
    max-width: 600px;
    margin-bottom: 20px;
    display: inline-block;
    vertical-align: bottom; // 라인의 수직 기준 어느 높이에 놓을지
    width: 100%;
`;
