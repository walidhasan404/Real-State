import { useForm } from 'react-hook-form';
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { AuthContext } from "../Providers/AuthProvider";
import auth from '../../firebase/firebase.config';

const Login = () => {
    const [logError, setLogError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPass, setShowPass] = useState(false);
    const { logInUser, user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const lastVisited = localStorage.getItem('lastVisited') || '/';
            localStorage.removeItem('lastVisited');
            navigate(lastVisited);
        }
    }, [user, navigate]);

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(result => {
                setSuccess('Logged in successfully');
                navigateAfterLogin();
            })
            .catch(error => {
                console.log('error', error.message);
            });
    };

    const handleFacebookSignIn = () => {
        signInWithPopup(auth, new FacebookAuthProvider())
            .then(result => {
                setSuccess('Logged in successfully');
                navigateAfterLogin();
            })
            .catch(error => {
                console.log('error', error.message);
            });
    };

    const handleGoogleLogOut = () => {
        signOut(auth)
            .then(() => {
                setSuccess('Logged out successfully');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleLogin = async (data) => {
        const { email, password } = data;
        setLogError('');
        setSuccess('');

        try {
            await logInUser(email, password);
            setSuccess('User logged in successfully');
            navigateAfterLogin();
        } catch (error) {
            console.error(error);
            setLogError(error.message);
        }
    };

    const navigateAfterLogin = () => {
        const lastVisited = localStorage.getItem('lastVisited') || '/';
        localStorage.removeItem('lastVisited');
        navigate(lastVisited);
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold">Login now</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                            </div>
                            {errors.email && <p className="text-red-700">Email is required</p>}
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPass ? "text" : "password"} {...register("password", { required: true })} placeholder="password" className="input input-bordered" />
                                <span className="absolute top-2/3 right-3 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <IoMdEyeOff /> : <IoMdEye />}
                                </span>
                            </div>
                            {errors.password && <p className="text-red-700">Password is required</p>}
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-outline">Login</button>
                            </div>
                        </form>
                        {logError && <p className="text-red-700">{logError}</p>}
                        {success && <p className="text-green-600">{success}</p>}
                        <div>
                            {!user && (
                                <>
                                    <h2 className="text-lg font-semibold text-center">Log In With</h2>
                                    <div className='flex gap-2 justify-center'>
                                        <button className="btn btn-outline" onClick={handleGoogleSignIn}>Google SignIn</button>
                                        <button className="btn btn-outline" onClick={handleFacebookSignIn}>Facebook LogIn</button>
                                    </div>
                                </>
                            )}
                        </div>
                        <p className="text-base p-4">New to the website? Please <Link className='text-lg font-bold' to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
