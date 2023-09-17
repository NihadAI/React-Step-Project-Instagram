import React from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { setLogin } from '../redux/authSlice';

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().required('Required'),
});

const initialValuesLogin = {
    email: '',
    password: '',
};

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (values, onSubmitProps) => {
        try {
            const response = await axios.post('http://localhost:3001/auth/login', values);
            const loggedIn = response.data;
            onSubmitProps.resetForm();
            if (loggedIn) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login">
            <div className="login__left">
                <img src="http://i.imgur.com/P3Vm1Kq.png" alt="" />
            </div>
            <div className="login__right">
                <Formik initialValues={initialValuesLogin} validationSchema={loginSchema} onSubmit={login}>
                    {({ handleSubmit, handleChange, values, errors }) => (
                        <form className="login__form" onSubmit={handleSubmit}>
                            <img src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png" alt="Instagram Logo" />
                            <Field name="email" type="email" placeholder="Email" value={values.email} onChange={handleChange} />
                            <ErrorMessage name="email" component="div" />
                            <Field name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} />
                            <ErrorMessage name="password" component="div" />
                            <button type="submit" className="login__button">
                                Log in
                            </button>
                        </form>
                    )}
                </Formik>
                <div className="login__footer">
                    <span>
                        Don't have an account?
                        <button onClick={() => navigate('/signup')}>Sign up</button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;
