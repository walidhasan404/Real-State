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
            .then(() => {
                setSuccess('Logged in successfully');
                navigateAfterLogin();
            })
            .catch(error => {
                setLogError(error.message);
            });
    };

    const handleFacebookSignIn = () => {
        signInWithPopup(auth, new FacebookAuthProvider())
            .then(() => {
                setSuccess('Logged in successfully');
                navigateAfterLogin();
            })
            .catch(error => {
                setLogError(error.message);
            });
    };

    const handleGoogleLogOut = () => {
        signOut(auth)
            .then(() => {
                setSuccess('Logged out successfully');
            })
            .catch(error => {
                setLogError(error.message);
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
            setLogError(error.message);
        }
    };

    const navigateAfterLogin = () => {
        const lastVisited = localStorage.getItem('lastVisited') || '/';
        localStorage.removeItem('lastVisited');
        navigate(lastVisited);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input 
                            type="email" 
                            {...register("email", { required: "Email is required" })} 
                            placeholder="Enter your email" 
                            className="input input-bordered w-full" 
                        />
                        {errors.email && <p className="text-red-600 mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input 
                            type={showPass ? "text" : "password"} 
                            {...register("password", { required: "Password is required" })} 
                            placeholder="Enter your password" 
                            className="input input-bordered w-full" 
                        />
                        <span 
                            className="absolute top-14 right-3 transform -translate-y-1/2 cursor-pointer" 
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <IoMdEyeOff /> : <IoMdEye />}
                        </span>
                        {errors.password && <p className="text-red-600 mt-1">{errors.password.message}</p>}
                    </div>
                    <div className="form-control mt-4">
                        <button type="submit" className="btn btn-primary w-full">Login</button>
                    </div>
                </form>
                {logError && <p className="text-red-600 mt-4">{logError}</p>}
                {success && <p className="text-green-600 mt-4">{success}</p>}
                <div className="text-center mt-6">
                    {!user && (
                        <>
                            <h2 className="text-lg font-semibold">Log In With</h2>
                            <div className='flex gap-4 justify-center mt-4'>
                                <button className="btn btn-outline" onClick={handleGoogleSignIn}>Google</button>
                                <button className="btn btn-outline" onClick={handleFacebookSignIn}>Facebook</button>
                            </div>
                        </>
                    )}
                </div>
                <p className="text-center mt-6">
                    New to the website? Please <Link className='text-blue-600 font-semibold' to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
