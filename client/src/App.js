import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { useSelector } from 'react-redux';

function App() {
    const isAuth = Boolean(useSelector(state => state.token));
    console.log(isAuth);
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" />} />

                <Route path="/profile/:userId" element={isAuth ? <Profile /> : <Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
