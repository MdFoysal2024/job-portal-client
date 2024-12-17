import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";


const AddJob = () => {


    const { user } = useAuth();
    const navigate = useNavigate()


    const handleAddJob = e => {
        e.preventDefault();

        // সকল ডাটা এক সাথে পাওয়ার জন্য নিচের ফরমেট গুলো Chat GPT থেকে আনা হয়েছে।
        const formData = new FormData(e.target)
        console.log(formData);

        const initialData = Object.fromEntries(formData.entries());
        console.log(initialData);

        const { min, max, currency, ...newJob } = initialData
        console.log(newJob);

        newJob.salaryRange = { min, max, currency }
        console.log(newJob);

        // Job requirements এর আলাদা আলাদা লাইনের value গুলো কে   একটি array এর ভিতরে সেট করার জন্য requirements.split('\n') করা হয়েছে.
        newJob.requirements = newJob.requirements.split('\n');
        console.log(newJob);


        // Job responsibility এর আলাদা আলাদা লাইনের value গুলো কে একটি array এর ভিতরে সেট করার জন্য responsibility.split('\n') করা হয়েছে.
        newJob.responsibility = newJob.responsibility.split('\n');
        console.log(newJob);

        fetch('http://localhost:5000/jobs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newJob)
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
                    navigate('/myPostedJob')
                }
            })














    }




    return (
        <div>

            <h2 className="text-center mx-auto bg-blue-100 w-[360px] mt-6 p-4 text-4xl font-bold">Post A New Job</h2>
            <form onSubmit={handleAddJob}
                className="card-body">
                {/* Job title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Title</span>
                    </label>
                    <input type="text" name="title" placeholder="Job Title" className="input input-bordered" required />
                </div>


                {/* company name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Name</span>
                    </label>
                    <input type="text" placeholder="Company Name" name="company" className="input input-bordered" required />

                </div>

                {/* Job Location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Location</span>
                    </label>
                    <input type="text" placeholder="Job Location" name="location" className="input input-bordered" required />

                </div>



                {/* Job description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Description </span>
                    </label>
                    <textarea className="textarea textarea-bordered" name="description" placeholder="Job Description" required></textarea>
                </div>

                {/* Job Requirements*/}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Requirements </span>
                    </label>

                    <textarea className="textarea textarea-bordered" name="requirements" placeholder="Put each requirements in a New Line" required></textarea>
                </div>
                {/* Job responsibilities*/}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job responsibilities </span>
                    </label>

                    <textarea className="textarea textarea-bordered" name="responsibility" placeholder="Put each responsibility in a New Line" required></textarea>
                </div>



                <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Job Type */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Job Type</span>
                        </label>
                        <select defaultValue="Pick A Job Type" name="job_type" className="select select-bordered select-ghost w-full ">
                            <option disabled >Pick A Job Type</option>
                            <option>Full-Time</option>
                            <option>Part-Time</option>
                            <option>Remote</option>
                            <option>Intern</option>
                        </select>

                    </div>

                    {/* Job Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job Field</span>
                        </label>
                        <select defaultValue="Pick A Job Field" name="job_field" className="select select-bordered select-ghost w-full ">
                            <option disabled >Pick A Job Field</option>
                            <option>Engineering</option>
                            <option>Marketing</option>
                            <option>Finance</option>
                            <option>Teaching</option>
                        </select>

                    </div>

                    {/* applicationDeadline */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Deadline</span>
                        </label>
                        <input type="date" placeholder="20-12-2024" onFocus="this.type='date'" onBlur="this.type='text'"  name="applicationDeadline"  className="input input-bordered"  />

                    </div>
                </div>



                {/* salary range */}

                <div className="grid grid-cols-1 w-full items-end justify-between lg:grid-cols-3 gap-4 ">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Salary Range:</span>
                        </label>
                        <input type="number" placeholder="Min" name="min" className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <input type="number" placeholder="Max" name="max" className="input input-bordered" required />
                    </div>

                    {/* Money Currency */}
                    <div className="form-control">
                        <select defaultValue="Currency" name="currency" className="select select-bordered select-ghost w-full ">
                            <option disabled >Currency</option>
                            <option>BDT</option>
                            <option>USD</option>
                            <option>Rupee</option>
                            <option>EURO</option>
                        </select>

                    </div>
                </div>



                {/* HR name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Name</span>
                    </label>
                    <input type="text" placeholder="HR Name" name="hr_company" className="input input-bordered" required />

                </div>

                {/* HR Email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Email</span>
                    </label>
                    <input type="email"
                        defaultValue={user?.email} placeholder="HR Email" name="hr_email" className="input input-bordered" required />

                </div>

                {/* company Logo */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Logo URL</span>
                    </label>
                    <input type="text" placeholder="Company Name URL" name="company_logo" className="input input-bordered" required />

                </div>

                {/* Job status*/}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job status</span>
                    </label>
                    <select name="job_status" className="select select-bordered select-ghost w-full ">
                        <option disabled>Active</option>
                        <option>Active</option>
                        <option>Inactive</option>

                    </select>

                </div>























































                {/* Submit btn */}
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;