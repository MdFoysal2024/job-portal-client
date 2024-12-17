import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { Link } from 'react-router-dom';



const HotJobCard = ({ job }) => {
    console.log(job)


    const { _id, applicationDeadline, category, company, company_logo, description, jobType, hr_email, hr_name, location, requirements, responsibilities, salaryRange, status, title } = job || {};



    return (
        <div>


            <div className="card card-compact bg-base-100  shadow-xl h-80">
                <div className='flex'>

                    <figure>
                        <img className='w-16' src={company_logo} alt="" />
                    </figure>
                    <div>
                        <h3 className='text-2xl font-bold'>{company}</h3>
                        <p className='text-gray-500 flex gap-1 items-center'><CiLocationOn /> {location}</p>
                    </div>
                </div>


                <div className="card-body">
                    <h2 className="card-title">{title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>

                    <p>{description}</p>
                    <div className='flex flex-wrap text-gray-400  gap-2'>
                        {
                            requirements.map((requirement, idx) => <p key={idx}

                                className='cursor-pointer hover:text-blue-500'

                            >{requirement}</p>

                            )
                        }
                    </div>
                    <div className="card-actions flex items-center ">
                        <p>Salary: {salaryRange.min} -  {salaryRange.max} {salaryRange.currency}</p>
                        <Link to={`/jobDetails/${_id}`}>
                            <button

                                className=" text-white font-bold bg-blue-500 px-6  rounded-none py-2 ">Apply</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotJobCard;