import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; //./usrSlice 파일에서 default 내보내기 정보를 가져옴
const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
