import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    email: '',
    photoURL: '',
    displayName: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //user/setUser type의 액션은 action을 받으면 state를 다음과 같이 바꿔주는 역할을 한다는 뜻
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.photoURL = action.payload.photoURL;
            state.displayName = action.payload.displayName;
        },
        //user/removeUser type의 액션은 action을 받으면 state를 다음과 같이 바꿔주는 역할을 한다는 뜻
        removeUser: (state) => {
            state.id = '';
            state.email = '';
            state.photoURL = '';
            state.displayName = '';
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
