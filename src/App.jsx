import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Login from './pages/LoginPage/Login';
import Main from './pages/MainPage/Main';
import Detail from './pages/DetailPage/Detail';
import Search from './pages/SearchPage/Search';

const Layout = () => {
    return (
        <div>
            <Nav />

            <Outlet />
        </div>
    );
};

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* "/"로 접근했을 때 기본은 Login페이지 */}
                    <Route index element={<Login />} />
                    <Route path="main" element={<Main />} />
                    <Route path=":movieId" element={<Detail />} />
                    {/* :movieId로 설정해줘서 Detail컴포넌트에서 useParams로 movieId값 가져올 수 있음 */}
                    <Route path="search" element={<Search />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
