import React from 'react';
import './Signup.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';

const signupSchema = yup.object().shape({
    email: yup.string().email('invalid email').required('required'),
    fullName: yup.string().required('required'),
    username: yup.string().required('required'),
    password: yup.string().required('required'),
});

const initialValuesRegister = {
    email: '',
    fullName: '',
    username: '',
    password: '',
};

function Signup() {
    const navigate = useNavigate();

    const signup = async values => {
        try {
            const response = await axios.post('http://localhost:3001/auth/signup', values);

            console.log(response.data);

            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="signup">
            <div className="signup__left">
                <img src="http://i.imgur.com/P3Vm1Kq.png" alt="" />
            </div>
            <div className="signup__right">
                <Formik initialValues={initialValuesRegister} validationSchema={signupSchema} onSubmit={signup}>
                    {({ handleSubmit, handleChange, values, errors }) => (
                        <form className="signup__form" onSubmit={handleSubmit}>
                            <img src="https://download.logo.wine/logo/Instagram/Instagram-Wordmark-White-Logo.wine.png" alt="Instagram Logo" />
                            <p>Register to see photos and videos of your friends.</p>
                            <input name="email" type="email" placeholder="Email" value={values.email} onChange={handleChange} />
                            {errors.email && <div>{errors.email}</div>}
                            <input name="fullName" type="text" placeholder="Full name" value={values.fullName} onChange={handleChange} />
                            {errors.fullName && <div>{errors.fullName}</div>}
                            <input name="username" type="text" placeholder="Username" value={values.username} onChange={handleChange} />
                            {errors.username && <div>{errors.username}</div>}
                            <input name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} />
                            {errors.password && <div>{errors.password}</div>}
                            <button type="submit" className="signup__button">
                                Sign Up
                            </button>
                        </form>
                    )}
                </Formik>

                <div className="signup__footer">
                    <span>
                        Have an account?
                        <button onClick={() => navigate('/login')}>Log in</button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Signup;
