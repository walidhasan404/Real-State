import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { CgProfile } from "react-icons/cg";

const Header = () => {
    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/update">Update Profile</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
        </>
    );

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => console.log('Log out successful'))
            .catch(error => console.log(error));
    };

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="hidden lg:flex lg:items-center lg:mr-4">
                    <img className="w-10" src="https://i.ibb.co/H43mt5X/download-25.jpg" alt="Logo" />
                    <a className="text-xl lg:text-2xl font-bold ml-2">Sweet Residences</a>
                </div>

                <div className="dropdown lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <div className="lg:hidden flex items-center">
                    <a className="text-xl lg:text-2xl font-bold">Sweet Residences</a>
                    <img className="w-10" src="https://i.ibb.co/H43mt5X/download-25.jpg" alt="Logo" />
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <>
                        <div className="tooltip tooltip-bottom" data-tip={user.email}>
                            <img className="w-10 h-10 rounded-full mr-3" src={user.photoURL || "default-avatar-url.jpg"} alt="User Profile" />
                        </div>
                        <button onClick={handleLogOut} className="btn btn-accent">Log Out</button>
                    </>
                ) : (
                    <>
                        <button className="btn"><CgProfile /></button>
                        <Link to="/login"><button className="btn btn-accent">Log In</button></Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
