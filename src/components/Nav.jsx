import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { setUser, removeUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Nav = () => {
    const [show, setShow] = useState(false); //상단바의 배경색을 지정할 기준이 되는 상태 변수
    const { pathname } = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    //리렌더링 될 때 빈 객체로 초기화되어서 로컬스토리지에 있더라도 사용하지 않고 있는 상태기 때문에 initialUserData 가져오는 로직 추가

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            // (auth,callback)형태로 받고, 사용자의 인증 상태가 변경될 때(로그인, 로그아웃 등)마다 지정된 콜백 함수가 실행됨
            if (user) {
                //유저 정보가 있을 때
                if (pathname === '/') {
                    //현재 경로가 로그인 페이지라면
                    navigate('/main'); //메인 페이지로 이동
                }
            } else {
                navigate('/'); //login 페이지
            }
        });
        // Nav 컴포넌트는 Outlet을 통해 모든 컴포넌트에서 사용되기 때문에 Nav에서 설정해줌
    }, [auth, navigate, pathname]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            //removeEventListener는 컴포넌트를 안 쓸 때(언마운트 될 때)는 이벤트 리스너 지우도록
            //이게 없으면 컴포넌트를 없앴다가 다시 돌아올 때마다 계속 리스너가 쌓이게 됨
        };
    }, []);

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

    const handleAuth = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                dispatch(
                    setUser({
                        id: result.user.uid,
                        email: result.user.email,
                        displayName: result.user.displayName,
                        photoURL: result.user.photoURL,
                    })
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(removeUser());
                navigate('/');
            })
            .catch((error) => {
                alert(error);
            });
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
                <Login
                    onClick={() => {
                        handleAuth();
                    }}
                >
                    login
                </Login>
            ) : (
                <>
                    <Input
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        value={searchValue}
                        className="nav_input"
                        type="text"
                        placeholder="검색어를 입력하세요"
                    />
                    <SignOut>
                        <UserImg src={user.photoURL} alt={user.displayName} />
                        <DropDown>
                            <span
                                onClick={() => {
                                    handleLogOut();
                                }}
                            >
                                Sign out
                            </span>
                        </DropDown>
                    </SignOut>
                </>
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

const UserImg = styled.img`
    border-radius: 50%;
    width: 100%;
    height: 100%;
`;

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100%;
    opacity: 0;
`;
const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    &:hover {
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;
