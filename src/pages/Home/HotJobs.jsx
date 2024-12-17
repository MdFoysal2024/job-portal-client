import React, { useState } from 'react';
import { useEffect } from 'react';
import HotJobCard from './HotJobCard';

const HotJobs = () => {
    
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/jobs')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setJobs(data)
            })
    }, [])

    console.log(jobs)





    return (
        <div className='py-24'>
            <div className='text-center py-12 font-bold text-3xl'>Total JOBS({jobs.length})</div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {
                    jobs.map(job => <HotJobCard key={job._id} job={job}></HotJobCard>)
                }
            </div>

        </div>
    );
};

export default HotJobs;