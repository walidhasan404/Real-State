import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Register = () => {
    const [regError, setRegError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        const { name, email, password, image } = e.target;
        setRegError('');
        setSuccess('');

        const passwordValue = password.value;

        if (passwordValue.length < 6) {
            setRegError('Password should be at least 6 characters long.');
            return;
        } else if (!/[A-Z]/.test(passwordValue)) {
            setRegError('Password should contain at least 1 uppercase letter.');
            return;
        } else if (!/[a-z]/.test(passwordValue)) {
            setRegError('Password should contain at least 1 lowercase letter.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email.value, passwordValue);
            await updateProfile(userCredential.user, {
                displayName: name.value,
                photoURL: image.files[0] ? URL.createObjectURL(image.files[0]) : null
            });
            setSuccess('User registered successfully');
            e.target.reset();
        } catch (error) {
            console.error(error);
            setRegError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter your name" 
                            className="input input-bordered w-full" 
                            required 
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            className="input input-bordered w-full" 
                            required 
                        />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input 
                            type={showPass ? "text" : "password"} 
                            name="password" 
                            placeholder="Enter your password" 
                            className="input input-bordered w-full" 
                            required 
                        />
                        <span 
                            className="absolute top-14 right-3 transform -translate-y-1/2 cursor-pointer" 
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <IoMdEyeOff /> : <IoMdEye />}
                        </span>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Profile Image (optional)</span>
                        </label>
                        <input 
                            type="file" 
                            id="image" 
                            name="image" 
                            accept="image/*" 
                            className="input input-bordered w-full" 
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button 
                            type="submit" 
                            className="btn btn-primary w-full"
                        >
                            Register
                        </button>
                    </div>
                </form>
                {regError && <p className="text-red-600 mt-4">{regError}</p>}
                {success && <p className="text-green-600 mt-4">{success}</p>}
                <p className="text-center mt-6">
                    Already have an account? <Link className='text-blue-600 font-semibold' to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
