import User from '../models/User.js';

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* UPDATE */
export const addRemoveFollower = async (req, res) => {
    try {
        const { id, followerId } = req.params;
        const user = await User.findById(id);
        const follower = await User.findById(followerId);
        if (user.followers.includes(followerId)) {
            user.followers = user.friends.filter(id => id !== followerId);
            follower.followers = follower.followers.filter(id => id !== id);
        } else {
            user.followers.push(followerId);
            follower.followers.push(id);
        }
        await user.save();
        await follower.save();

        const followers = await Promise.all(user.followers.map(id => User.findById(id)));
        console.log(followers);
        const formattedFollowers = followers.map(({ _id, picturePath }) => {
            return { _id, fullName, username, picturePath };
        });
        res.status(200).json(formattedFollowers);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
