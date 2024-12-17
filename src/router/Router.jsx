import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import JobDetails from "../pages/Job/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/JobApply/JobApply";
import MyApplication from "../pages/MyApplication/MyApplication";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJob from "../pages/MyPostedJob/MyPostedJob";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <h2>Route Not found</h2>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/register',
                element: <Register></Register>,

            },
            {
                path: '/signIn',
                element: <SignIn></SignIn>,

            },
            {
                path: '/jobDetails/:id',
                element:
                    <PrivateRoute>
                        <JobDetails></JobDetails>
                    </PrivateRoute>

                ,
                loader: async ({ params }) => {
                    const paramsData = await fetch("http://localhost:5000/jobs")
                    const data = await paramsData.json();
                    const singleData = data.find(d => d._id == params.id)
                    return singleData;
                }
            },
            {
                path: '/jobApply/:id',
                element:
                    <PrivateRoute>
                        <JobApply></JobApply>
                    </PrivateRoute>

                ,
                // loader: async ({ params }) => {
                //     const paramsData = await fetch("http://localhost:5000/jobs")
                //     const data = await paramsData.json();
                //     const singleData = data.find(d => d._id == params.id)
                //     return singleData;
                // }
            },
            {
                path: '/myApplication',
                element:
                    <PrivateRoute>
                        <MyApplication></MyApplication>
                    </PrivateRoute>

                ,

            },
            {
                path: '/addJob',
                element:
                    <PrivateRoute>
                        <AddJob></AddJob>
                    </PrivateRoute>

                ,

            },
            {
                path: '/myPostedJob',
                element:
                    <PrivateRoute>
                        <MyPostedJob></MyPostedJob>
                    </PrivateRoute>

                ,

            }
        ]
    },
]);

export default router;