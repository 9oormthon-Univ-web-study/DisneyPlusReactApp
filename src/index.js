import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import app from './firebase'; //firebase 프로젝트랑 연결
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {/* PersistGate는 리덕스 store에서 원하는 값을 사용할 수 있을 때까지 리렌더링을 지연시켜줌 */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
