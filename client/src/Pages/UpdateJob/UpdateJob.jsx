import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import axios from "axios";

const UpdateJob = () => {
  const updateJobs = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // destructure
  const {
    _id,
    job_title,
    deadline,
    min_price,
    max_price,
    description,
    catagory,
  } = updateJobs.data;

  // convert deadline to Date
  const [startDate, setStartDate] = useState(
    deadline ? new Date(deadline) : new Date()
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedJob = {
      job_title: form.job_title.value,
      email: form.email.value,
      deadline: startDate,
      catagory: form.category.value,
      min_price: form.min_price.value,
      max_price: form.max_price.value,
      description: form.description.value,
    };

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_api}/jobs/${_id}`,
        updatedJob
      );

      if (data.data.modifiedCount > 0) {
        setShowSuccess(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    navigate("/my-posted-job");
  };

  return (
    <div className="w-full flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-2 md:p-6 mx-auto bg-white rounded-md shadow-2xl ">
        <h2 className="text-lg text-center font-bold text-gray-700 capitalize pb-6">
          Update a Job
        </h2>

        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {/* Job Title */}
            <div>
              <label className="text-gray-700">Job Title</label>
              <input
                name="job_title"
                type="text"
                defaultValue={job_title}
                className="bg-gray-50 w-full px-4 py-2 mt-2 border rounded-md"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                readOnly
                className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-100"
              />
            </div>

            {/* Deadline */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Deadline</label>
              <DatePicker
                className="bg-white text-gray-700 px-6 py-2 border border-gray-300 rounded-md w-full"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Category</label>
              <select
                name="category"
                defaultValue={catagory}
                className="bg-gray-50 border p-2 rounded-md"
              >
                <option value="Web Development">Web Development</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="text-gray-700">Minimum Price</label>
              <input
                name="min_price"
                type="number"
                defaultValue={min_price}
                className="bg-gray-50 block w-full px-4 py-2 mt-2 border rounded-md"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="text-gray-700">Maximum Price</label>
              <input
                name="max_price"
                type="number"
                defaultValue={max_price}
                className="bg-gray-50 block w-full px-4 py-2 mt-2 border rounded-md"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700">Description</label>
            <textarea
              name="description"
              defaultValue={description}
              className=" bg-gray-50 block w-full px-4 py-2 mt-2 border rounded-md"
              rows="4"
            ></textarea>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5  bg-gray-700 rounded-md hover:bg-gray-600"
            >
              Update
            </button>
          </div>
        </form>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm">
            <div className="text-green-500 text-4xl mb-3">✅</div>
            <h3 className="text-lg font-semibold mb-2">
              Your job data updated successfully
            </h3>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-green-500  rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateJob;
