import React, { useState, useRef, useEffect } from 'react';
import './NavSidebar.scss';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';
import useOutsideClick from '../../hooks/useOutsideClick';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../redux/authSlice';
import axios from 'axios';

function NavSidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef(null);
    const token = useSelector(state => state.token);
    const { _id, username } = useSelector(state => state.user);
    const [user, setUser] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const onShowMoreClose = () => {
        setShowMore(false);
    };

    useOutsideClick(ref, onShowMoreClose, showMore);

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users/${_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const style = {
        width: '28px',
        height: '28px',
    };

    return (
        <div className="sidenav">
            <img className="sidenav__logo" src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png" alt="Instagram Logo" />
            <div className="sidenav__buttons">
                <Link to="/">
                    <button className="sidenav__button">
                        <HomeOutlinedIcon style={style} />
                        <span>Home</span>
                    </button>
                </Link>
                <button className="sidenav__button">
                    <SearchIcon style={style} />
                    <span>Search</span>
                </button>
                <button className="sidenav__button">
                    <ExploreOutlinedIcon style={style} />
                    <span>Explore</span>
                </button>
                <button className="sidenav__button">
                    <SlideshowIcon style={style} />
                    <span>Reels</span>
                </button>
                <button className="sidenav__button">
                    <ChatOutlinedIcon style={style} />
                    <span>Messages</span>
                </button>
                <button className="sidenav__button">
                    <FavoriteBorderIcon style={style} />
                    <span>Notifications</span>
                </button>
                <button className="sidenav__button">
                    <AddCircleOutlineIcon style={style} />
                    <span>Create</span>
                </button>
                <button
                    className="sidenav__button"
                    onClick={() => {
                        navigate(`/profile/${_id}`);
                        navigate(0);
                    }}
                >
                    <Avatar></Avatar>
                    <span>{username}</span>
                </button>
            </div>
            <div className="sidenav__more" ref={ref}>
                {showMore && (
                    <div className="sidenav__dropdown">
                        <button className="logout__dropdown-button" onClick={() => dispatch(setLogout())}>
                            Logout
                        </button>
                    </div>
                )}
                <button
                    className="sidenav__button"
                    onClick={() => {
                        setShowMore(v => !v);
                    }}
                >
                    <MenuIcon style={style} />
                    <span className="sidenav__buttonText">More</span>
                </button>
            </div>
        </div>
    );
}

export default NavSidebar;
