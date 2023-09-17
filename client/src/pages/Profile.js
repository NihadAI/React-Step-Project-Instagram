import React from 'react';
import { Avatar } from '@mui/material';
import NavSidebar from '../components/navigation/NavSidebar';
import './Profile.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Profile() {
    const users = useSelector(state => state.users);
    const { userId } = useParams();
    const user = users.find(user => user._id === userId);

    console.log(users);
    return (
        <div className="profile">
            <div className="profile__left">
                <NavSidebar />
            </div>
            <div className="profile__right">
                <div className="profile__header">
                    <div className="header__avatar">
                        <Avatar sx={{ width: 150, height: 150 }}></Avatar>
                    </div>
                    <div className="header__info">
                        <div className="info__header">
                            <span>{user.username}</span>
                            <button>Edit user</button>
                            <SettingsIcon />
                        </div>
                        <div className="info__main">
                            <span>0 posts</span>
                            <span>{user.followers.length} followers</span>
                            <span>{user.following.length} following</span>
                        </div>
                        <div className="info__footer">My name is {user.fullName}</div>
                    </div>
                </div>
                <div className="profile__main">
                    <div className="main__buttons">
                        <button>
                            <ViewCompactIcon></ViewCompactIcon>
                            <span>posts</span>
                        </button>
                        <button>
                            <BookmarkBorderIcon></BookmarkBorderIcon>
                            <span>saves</span>
                        </button>
                        <button>
                            <PermContactCalendarIcon></PermContactCalendarIcon>
                            <span>marks</span>
                        </button>
                    </div>
                    <div className="main__photos">
                        <input type="file" />
                        <button>Upload Photo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
