import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


const MyPostedJob = () => {

    const [jobs, setJobs] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:5000/myPostedJob?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setJobs(data)
            })
    }, [user.email])
    console.log(jobs)


    return (
        <div>
            <h2 className="text-4xl font-bold py-6 text-center"> MyPostedJob: {jobs.length}</h2>

        </div>
    );
};

export default MyPostedJob;

