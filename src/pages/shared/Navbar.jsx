import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import jobLogo from '../../assets/job-logo.png';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {

   // const { user, signOutUser } = useContext(AuthContext);
   
    const { user, signOutUser } = useAuth();   //used ----> custom hook


    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('successfully signout')
            })
            .catch(error => {
                console.log('Sign out failed')
            })
    }




    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/addJob'>Add Job</NavLink></li>
        <li><NavLink to='/myPostedJob'>My Posted Job</NavLink></li>
        <li><NavLink to='/myApplication'>My Application</NavLink></li>
        {/* <li><NavLink to='/register'>SignUp</NavLink></li> */}


    </>



    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">
                    <img className='w-12' src={jobLogo} alt="" />
                    <h2 className='text-3xl font-bold'>JOB PORTAL</h2>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}

                </ul>
            </div>
            <div className="navbar-end">

                {

                    user ? <><button
                        onClick={handleSignOut}
                        className="px-8 py-3 ml-4 text-white rounded-full font-bold  bg-blue-500">Log Out</button></> : <>
                        <Link to='/register'><button className="px-4 py-3   text-blue-500   border-2  font-bold rounded-full  border-blue-500" >SIGN UP</button></Link>
                        <Link to='/signIn'><button className="px-8 py-3 ml-4 text-white rounded-full font-bold  bg-blue-500">LOGIN</button></Link>
                    </>

                }


                {/* <a className="btn btn-primary">Login</a> */}
            </div>
        </div>
    );
};

export default Navbar;