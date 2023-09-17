import React from 'react';
import './Suggesstions.scss';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setFollowers } from '../../../redux/authSlice';

function Suggesstions({ friendId, username, createdAt }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { _id } = useSelector(state => state.user);
    const token = useSelector(state => state.token);

    const patchFriend = async () => {
        try {
            const response = await axios.patch(`http://localhost:3001/users/${_id}/${friendId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;
            dispatch(setFollowers({ friends: data }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="suggesstions">
            <div className="suggesstions__usernames">
                <div className="suggesstion__username">
                    <div className="username__left">
                        <button className="avatar" onClick={() => navigate(`profile/${friendId}`)}>
                            <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
                        </button>
                        <div className="username__info">
                            <span className="username">{username}</span>
                            <span className="relation">{createdAt}</span>
                        </div>
                    </div>
                    <button className="follow__button" onClick={() => patchFriend()}>
                        Follow
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Suggesstions;
