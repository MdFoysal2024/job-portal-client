import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import animationData from '../../assets/Animation-Register .json'
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../shared/SocialLogin';

const Register = () => {

    const { createUser } = useContext(AuthContext);


    const handleRegister = e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)


        // -------password validation and error is home work--->
        createUser(email, password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error.message)
            })
    }




    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-[540px]">

                        <Lottie animationData={animationData}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                        <h1 className="text-5xl pt-6 text-center font-bold">SIGN UP!</h1>
                        <form onSubmit={handleRegister}
                            className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                               
                            </div>
                            <div className="form-control mt-6">
                                <button className=" py-3 text-white rounded-full font-bold  bg-blue-500">SIGN UP</button>
                            </div>
                        </form>
                    
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;