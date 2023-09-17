import React, { useEffect, useState } from 'react';
import './Timeline.scss';
import Suggesstions from './suggestions/Suggesstions';
import Post from './posts/Post';
import Stories from './Stories';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { setUsers } from '../../redux/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Timeline() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const { _id } = useSelector(state => state.user);
    const users = useSelector(state => state.users.slice(0, 5));
    const token = useSelector(state => state.token);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                dispatch(setUsers(response.data));
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, [dispatch, token]);
    const [posts, setPosts] = useState([
        { user: 'therock', postImage: 'https://picsum.photos/id/238/500/500', likes: 14, timestamp: '2d' },
        { user: 'shusd', postImage: 'https://picsum.photos/id/237/500/500', likes: 44, timestamp: '1d' },
        { user: 'qwerty', postImage: 'https://picsum.photos/id/236/500/500', likes: 11, timestamp: '1h' },
        { user: 'zxcabuser', postImage: 'https://picsum.photos/id/231/500/500', likes: 54, timestamp: '12h' },
        { user: 'ccxxxx', postImage: 'https://picsum.photos/id/232/500/500', likes: 43, timestamp: '11h' },
        { user: 'vvvvvfffff', postImage: 'https://picsum.photos/id/233/500/500', likes: 12, timestamp: '3d' },
    ]);
    return (
        <div className="timeline">
            <div className="timeline__left">
                <div className="timeline__posts">
                    <Stories />
                    {posts.map(post => (
                        <Post user={post.user} postImage={post.postImage} likes={post.likes} timestamp={post.timestamp} />
                    ))}
                </div>
            </div>
            <div className="timeline__right">
                <div className="suggesstions__top">
                    <Avatar
                        onClick={() => {
                            navigate(`/profile/${_id}`);
                            navigate(0);
                        }}
                    ></Avatar>
                    <span>{user.username}</span>
                </div>
                <div className="suggesstions__title">Suggestions for you</div>
                {users.map(user => (
                    <Suggesstions friendId={user._id} username={user.username} createdAt={user.createdAt} />
                ))}
            </div>
        </div>
    );
}

export default Timeline;
