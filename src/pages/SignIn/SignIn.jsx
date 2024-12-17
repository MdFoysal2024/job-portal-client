import Lottie from 'lottie-react';
import React from 'react';
import animationData from '../../assets/Animation - Login.json';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { Axios } from 'axios';

const SignIn = () => {


    const { signInUser } = useContext(AuthContext);

    const location = useLocation();
    console.log(location);

    const navigate = useNavigate();

    //যদি কোনো পাথের state থাকে, তবে লগিনের পরে সেই পাথে/রাউটে যাবে, আর না হলে হোমে যাবে।
    const from = location.state || '/';

    const handleSignIn = e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)


        // -------password validation and error is home work--->
        signInUser(email, password)
            .then(result => {
                //console.log('Sign in User', result.user)
                console.log('Sign in User', result.user.email)

                //const user = { email: email }

                //const user = { email: result.user.email }





                //---------JWT এর জন্য Auth related APIs fetching by axios.post ---->



                // AuthProvider এর useEffect() থেকে jwt API ডকুমেন্টেশন সেট করলে login/register/socialLogin/googleLogin যে কোনো জায়গা থেকে user email পেলেই সার্ভারে টোকেন পাঠাবে । আর  login/register এ ডকুমেন্টেশন সেট করলে সব জায়গা থেকে টোকেন পাঠাতে পারবে না  


                //jwt এর কিছু কাজ axios.post() দিয়ে ক্লাইন সাইট এর লগিন পেইজে করা হইছে। যেখান থেকে রিকুয়েস্ট পাঠাবে যাতে লগিনের পরে একটি টোকেন জেনারেট করে । এবং jwt এর বেশ কিছু rules/functionality কে chatGPT থেকে নেয়া হয়েছে। 



                // axios.post('http://localhost:5000/jwt', user, { withCredentials: true })

                //     // .then(data => {
                //     //     console.log(data);  //console.log(data.data)
                //     // })----------> এটার পরিবর্তে নিচের লাইন

                //     .then(res => {
                //         console.log(res.data);   //console.log(data.data)
                //     })







                navigate(from);
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
                        <h1 className="text-5xl pt-6 text-center font-bold">Login now!</h1>
                        <form onSubmit={handleSignIn}
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
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="py-3 text-white rounded-full font-bold  bg-blue-500">LOGIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;