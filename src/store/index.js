import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; //./usrSlice 파일에서 default 내보내기 정보를 가져옴
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

export const rootReducer = combineReducers({
    user: userReducer,
});

// ReduxPersist 설정 객체
const persistConfig = {
    key: 'root', // 저장소의 루트 키 설정
    storage, // 브라우저의 로컬 스토리지를 사용하도록 설정(영구 보관을 위함)
};

// 첫번째 인자 : persist 관련 설정을 정의하는 객체
// 두번째 인장 : 루트 리듀서
const persistedReducer = persistReducer(persistConfig, rootReducer); //리듀서의 지속성을 설정

// store 생성
export const store = configureStore({
    reducer: persistedReducer,
    // 액션에는 데이터 소실을 막기 위해 프로미스, 맵, 함수 등은 들어갈 수 없게 막아두는데 이를 무시하기 위해 serializableCheck 옵션을 false로 지정
    // 후에 개별 값들에만 해당 옵션을 부여하는 방식으로 수정 예정
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({ serializableCheck: false }),
});

export const persistor = persistStore(store); // rehydration 프로세스를 더 잘 제어할 수 있게 하기 위해 persistStore 사용
