import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { CgProfile } from "react-icons/cg";

const Header = () => {
    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/update">Update Profile</NavLink></li>
        <li><NavLink to="/contact">Contact Us</NavLink></li>
    </>;

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => console.log('Log out successful'))
            .catch(error => console.log(error));
    }

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="text-xl lg:text-2xl font-bold">Sweet Residences</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <>
                                <div className="tooltip tooltip-bottom" data-tip={user.email}>
                                    <img className="w-10 h-10 rounded-full mr-3" src={user.photoURL || "default-avatar-url.jpg"} alt="User Profile" />
                                </div>
                                <button onClick={handleLogOut} className="btn btn-accent">Log Out</button>
                            </> :
                            <>
                                <button className="btn"><CgProfile /></button>
                                <Link to="/login"><button className="btn btn-accent">LogIn</button></Link>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;
