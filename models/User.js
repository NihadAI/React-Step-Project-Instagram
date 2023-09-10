import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },

        username: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            min: 5,
        },
        picturePath: {
            type: String,
            default: '',
        },
        followers: {
            type: Array,
            default: [],
        },
        following: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
