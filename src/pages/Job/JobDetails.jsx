import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const JobDetails = () => {
    const jobData = useLoaderData()
    console.log(jobData, 12)
    const { _id, applicationDeadline, category, company, company_logo, description, jobType, hr_email, hr_name, location, requirements, responsibilities, salaryRange, status, title, deadline } = jobData || {};

    return (
        <div className='py-24'>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <div className='flex w-full gap-6 justify-between items-center'>
                        <img className='w-16' src={company_logo} alt="" />
                        <p className='text-lg font-bold'>Apply For: {company}</p>
                    </div>
                    <h2 className="card-title">{title}</h2>
                    <p>DeadLine: {applicationDeadline}</p>
                    <p className='text-gray-400'>{description}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/jobApply/${_id}`}>

                        <button className="btn btn-primary">Apply Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;