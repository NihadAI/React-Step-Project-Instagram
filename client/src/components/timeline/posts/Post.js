import React from 'react';
import { Avatar } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './Post.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TelegramIcon from '@mui/icons-material/Telegram';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function Post({ user, postImage, likes, timestamp }) {
    return (
        <div className="post">
            <div className="post__header">
                <div className="post__headerAuthor">
                    <Avatar>{user.charAt(0).toUpperCase()}</Avatar>
                    {user} <span>{/* • TODO Follow if not, if yes don`t show anything */}</span>
                </div>

                <MoreHorizIcon />
            </div>
            <div className="post__image">
                <img src={postImage} alt="" />
            </div>
            <div className="post__footer">
                <div className="post__footerIcons">
                    <div className="post__iconsMain">
                        <FavoriteBorderIcon className="postIcon" />
                        <ChatBubbleOutlineIcon className="postIcon" />
                        <TelegramIcon className="postIcon" />
                    </div>
                    <div className="post__iconSave">
                        <BookmarkBorderIcon className="postIcon" />
                    </div>
                </div>
                <div className="post__information">
                    <span className="postLikes">Liked by {likes} people.</span>
                    <span className="postTimestamp">{timestamp} ago</span>
                </div>
            </div>
        </div>
    );
}

export default Post;
