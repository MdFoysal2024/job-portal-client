import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { auth } from "../../firebase/firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    // import { GoogleAuthProvider } from "firebase/auth";



    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }



    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }


    // যখন কোনো ইউজার লগিন করবে, তখন তার ইমেল, পাসওয়ার্ড কে  সংরক্ষন করে রাখার জন্য useEffect এর ভিতরে onAuthStateChanged (auth, currentUser) এ ইউজার ইনফরমেশন setUser(currentUser); দিয়ে সেট করে রাখা হয়, আর যখন কোনো ইউজার সেট হবে তখন লোডিং setLoading(false) বন্ধ হয়ে যাবে। এবং এখানের currentUser হলো যে লগিন করবে সে/তার ইনফরমেশন । 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('State Captured', currentUser)
            console.log('State Captured', currentUser?.email);


            // AuthProvider এর useEffect() থেকে jwt API ডকুমেন্টেশন সেট করলে login/register/socialLogin/googleLogin যে কোনো জায়গা থেকে user email পেলেই সার্ভারে টোকেন পাঠাবে । আর  login/register এ ডকুমেন্টেশন সেট করলে সব জায়গা থেকে টোকেন পাঠাতে পারবে না  

            if (currentUser?.email) {
                const user = { email: currentUser.email }

                // jwt token create documentation-->
                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log('Login Create Token', res.data);
                        setLoading(false);
                    })
            }
            else {

                // jwt token remove documentation-->
                axios.post('http://localhost:5000/logout', {}, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log('Log Out Remove Token', res.data);
                        setLoading(false);
                    })
            }


        })
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;