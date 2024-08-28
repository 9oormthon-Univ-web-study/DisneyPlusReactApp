## 파이어베이스를 통한 배포

![alt text](image.png)
https://react-disney-plus-app-942b7.web.app/main

1. 개발 환경

-   Front : HTML, React, styled-components
-   Back-end : Firebase제공 Auth기능과 TMDB의 movie API 활용
-   서비스 배포 환경 : Firebase

2.  사용한 기술들

# react router dom

-   '/' : 로그인 페이지(로그인 되어있으면 '/main'으로 자동 이동)
-   '/main' : 메인 페이지
-   '/:movieId' : movieId에 따른 해당 영화의 상세 정보 표시 페이지(영화 이미지 띄우는 기능으로 대체)
-   '/search' : 키워드로 영화 검색할 수 있는 페이지
    위 기능들을 구분하기 위해 사용

# swipe

-   최근 인기/높은 평점/액션/코미디로 분리하여 영화들 리스트를 만들고 x축으로 스크롤하여 볼 수 있는 기능 제공하기 위해 사용
-   초기에는 요소들 옆으로 나열한 후 `getElementById`로 `scrollLeft`값에 접근하여 수정하며 스크롤 기능 구현
    => `useRef`로 접근 방법 변경
    => swipe로 최종 변경

# firebase

-   `getAuth`로 `Auth`객체 받아 활용
-   `onAuthStateChanged`로 인증상태 감지 후 사용자가 직접 페이지를 이동하지 않아도 되도록 조건부 라우팅 제공
-   `signInWithPopup`에서는 `GoogleAuthProvider`provider를 제공받은 후 구글 계정을 통한 소셜 로그인 기능 구현
-   `signOut`을 활용해 로그아웃 기능 간편 구현

# axios

-   중복된 부분 최소화하기 위해 인스턴스화하여 효율적으로 사용
-   pending방지를 위한 비동기 처리

3. 개발 기간 : 2024/8/20 ~ 2024/8/26

4. 개발하며 새롭게 알게 된 내용들

-   React Router Dom의 `<Outlet>`을 통해 특정 페이지에서 공통적으로 보여줘야하는 레이아웃을 페이지별로 직접 추가하지 않아도 동적으로 처리할 수 있음

-   사용자의 Url에 접근할 수 있는 여러 방법(useLocation, useParams, useSearchParams)들 중에서 각각의 활용 방법과 어떠한 상황에 사용해야할 지 익혔음
    useLocation : `location`객체 반환, path, query, hash, state(전달된 객체 상태)등의 정보
    useParams : `paramValue` 형태의 동적 파라미터 정보
    useSearchParmas : `key=value` 형태의 쿼리 스트링(useLocation 쓰면 전부 가져온 후 split해줘야하는 불편함이 있음)

-   useRef와 함수 외부에서 값을 선언해서 관리하는 방식의 차이

1. 컴포넌트가 렌더링되지 않아도 값이 존재하게 될 수 있음
2. 동일 컴포넌트가 여러번 호출될 경우 각 컴포넌트가 가리키는 값이 모두 동일할 수 있음
3. useRef는 값이 변해도 리렌더링되지 않음
