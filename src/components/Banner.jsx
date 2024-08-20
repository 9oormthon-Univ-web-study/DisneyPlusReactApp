import React, { useEffect } from 'react';
import axios from '../api/axios'; //axios라이브러리 이름이 아닌 우리가 만든 인스턴스 이름!!
//export default로 설정해줘서 어떤 이름으로 부르든 상관 없음
import request from '../api/request';
const Banner = () => {
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get(request.fetchNowPlaying);
        console.log(response);
    };
    return <div>Banner</div>;
};

export default Banner;
