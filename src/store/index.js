import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; //./usrSlice 파일에서 default 내보내기 정보를 가져옴
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

export const rootReducer = combineReducers({
    user: userReducer,
});

// ReduxPersist 설정 객체
const persistConfig = {
    key: 'root', // 저장소의 루트 키 설정
    storage, // 브라우저의 로컬 스토리지를 사용하도록 설정(영구 보관을 위함)
    // whitelist: ['user', 'settings'], - 유지할 리듀서들 이름
    // blacklist: ['temporaryData'], - 유지하지 않을 리듀서들 이름
    // transforms: [ - 저장/복원 과정에서 데이터를 변형하는 함수들 배열
    //     encryptTransform({
    //       secretKey: 'my-super-secret-key',
    //       onError: function(error) {
    //         // Handle the error
    //       },
    //     }),
    //   ],
};
// 첫번째 인자 : persist 관련 설정을 정의하는 객체
// 두번째 인장 : 루트 리듀서
const persistedReducer = persistReducer(persistConfig, rootReducer); //리듀서의 지속성을 설정

// store 생성
export const store = configureStore({
    reducer: persistedReducer, // 루트 리듀서를 지속성 설정한 리듀서로 감싼 리듀서로 대체
    // 액션에는 데이터 소실을 막기 위해 프로미스, 맵, 함수 등(직렬화가 불가능한 값)은 들어갈 수 없게 막아두는데
    //이를 무시하기 위해 serializableCheck 옵션을 false로 지정(데이터 유실을 막기 위해!)
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
        }), //persist/'이 뒤에 나오는 내용들'의 액션들이 호출이 될 때 체크 무시
    //전체의 serializable을 false => redux persist를 사용할 때만 사용하도록 수정
});

export const persistor = persistStore(store); // rehydration 프로세스를 더 잘 제어할 수 있게 하기 위해 persistStore 사용
