import axios from 'axios';
import { a } from 'motion/react-client';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})




const useAxiosSecure = () => {

    const { signOutUser } = useAuth();   //used ----> custom hook
    const navigate = useNavigate();



    //লগিন করে টোকেন তৈরী কারীর user email এবং  ডাটা তৈরী কারীর user email 
    // যদি একই হয় তবে সে ঐ টোকেন দিয়ে পেইজ রিলোড দিলে ডাটা পাবে,
    // আর এক না হলে error message দিয়ে interceptors তাকে Log Out করে দিবে।

    useEffect(() => {


        // Documentation টি https://axios-http.com/docs/interceptors সাইট থেকে নেয়া।

        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('Error Caught in interceptor', error.status );

            if (error.status === 401 || error.status === 403) {
                console.log('Log Out the User');


                // user logout documentation-------->

                signOutUser()
                    .then(() => {
                        console.log('successfully signout')
                        navigate('/signIn')


                    })
                    .catch(error => {
                        console.log('Sign out failed', error)
                    })

            }

            return Promise.reject(error);
        })

    }, [])








    return axiosInstance;


};

export default useAxiosSecure;