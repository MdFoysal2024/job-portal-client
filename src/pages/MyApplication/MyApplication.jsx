import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const MyApplication = () => {

    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);

    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        // fetch(`http://localhost:5000/job-application?email=${user.email}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setJobs(data)
        //     })





        //fetch পরিবর্তে axios.get() দিয়ে আরো সহজে ডাটা লোড করা যায়, এবং axios.get() হলো আপডেট ভার্সন , fetch এর console.log(data)/console.log(setJobs(data))  পরিবর্তে  axios এর console.log(data.data)/console.log(setJobs(res.data)) হবে আর .then() একবার লেখলেই হবে।



        //------------fetch পরিবর্তে axios.get()----------->

        // axios.get(`http://localhost:5000/job-application?email=${user.email}`, { withCredentials: true })
        //     .then(res => {
        //         console.log(setJobs(res.data))
        //     })





        //-----custom hook ব্যবহার করে axios.get() কে আরো সংক্ষেপে করা যায়----------->

        //axios আরো সংক্ষেপে ব্যবহার করার জন্য useAxiosSecure.jsx নামক 
        //একটি custom hook তৈরী করছি, যেখানে baseURL: 'http://localhost:5000',
        //{withCredentials: true} কে সেট করেছি, যাতে  এগুলো বার বার না লিখে 
        // শুধু মাত্র custom hook টাকে ব্যবহার করে সব জায়গাতে সেট করা যায়, তবে baseURL এর 5000 এর পরের অংশ নির্দিষ্ট পেইজের API অনুযায়ী get('/') ভিতরে বসাতে হবে। যেমন:  baseURL: 'http://localhost:5000'  এর পরে get('/') এর ভিতরে  axiosSecure.get(`/job-application?email=${user.email}`)

        //const axiosSecure = useAxiosSecure() ------>custom hook উপরে আছে


        axiosSecure.get(`/job-application?email=${user.email}`)
            .then(res => {
               console.log(setJobs(res.data))
            })

    }, [user.email])

    // console.log(jobs)


    return (
        <div>
            my Application({jobs.length})
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            jobs.map((job, index) => <tr key={job._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={job.company_logo}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{job.title}</div>
                                            <div className="text-sm opacity-50">{job.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>Purple</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>)
                        }




                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyApplication;