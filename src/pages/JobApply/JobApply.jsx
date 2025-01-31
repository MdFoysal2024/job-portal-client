import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
// import { useLoaderData } from 'react-router-dom';

const JobApply = () => {

    // const jobData = useLoaderData()
    // console.log(jobData, 12)
    // const { _id, applicationDeadline, category, company, company_logo, description, jobType, hr_email, hr_name, location, requirements, responsibilities, salaryRange, status, title, deadline } = jobData || {};

    const { id } = useParams();
    const { user } = useAuth()
    console.log(id, user);

    const navigate = useNavigate();
    const submitJobApplication = e => {
        e.preventDefault();
        const form = e.target;
        const linkedIn = form.linkedIn.value;
        const github = form.github.value;
        const resume = form.resume.value;
        console.log(linkedIn, github, resume);

        const jobApplication = {
            job_id: id,
            application_email: user.email,
            linkedIn,
            github,
            resume
        }

        fetch('http://localhost:5000/job-applications', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(jobApplication)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/myApplication')
                }
            })


    }

    return (
        <div>


            <div className="card bg-base-100 mt-12 w-full shadow-2xl">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl  py-12 text-center font-bold">Apply Job and Good Luck!</h1>

                </div>
                <form onSubmit={submitJobApplication}
                    className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">LinkedIn URL</span>
                        </label>
                        <input type="url" name='linkedIn' placeholder="LinkedIn URL" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">GitHub URL</span>
                        </label>
                        <input type="url" name='github' placeholder="GitHub URL" className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Resume URL</span>
                        </label>
                        <input type="url" name='resume' placeholder="Resume URL" className="input input-bordered" required />

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Apply</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default JobApply;