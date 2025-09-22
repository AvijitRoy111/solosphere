import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";

const MyPostedJob = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (user?.email) getData();
  }, [user]);

  const getData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_api}/jobs/${user?.email}`
    );
    setJobs(data);
  };

  // delete handler
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_api}/jobs/${selectedId}`
      );

      if (data.deletedCount > 0) {
        // UI থেকে remove করা হচ্ছে
        setJobs((prev) => prev.filter((job) => job._id !== selectedId));
        setShowConfirm(false);
        setShowSuccess(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">My Posted Jobs</h2>

        <span className="px-3 py-1 font-bold text-xs text-blue-600 bg-blue-100 rounded-full ">
          0 {jobs.length} Jobs
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Title</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Deadline</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Price Range</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Description
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="relative bg-white divide-y divide-gray-200 ">
                  {jobs.map((job) => (
                    <tr key={job._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {job.job_title}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {new Date(job.deadline).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        ${job.min_price}-${job.max_price}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <p
                            className="px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
                           text-xs"
                          >
                            {job.catagory}
                          </p>
                        </div>
                      </td>
                      <td
                        title=""
                        className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap"
                      >
                        {job.description.slice(0, 50)}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            onClick={() => {
                              setSelectedId(job._id);
                              setShowConfirm(true);
                            }}
                            className="text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>

                          <Link to={`/updateJob/${job._id}`}>
                            <button className="text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Confirm Delete Modal */}
                  <div className="absolute top-1/2 left-1/2">
                    {showConfirm && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm">
                          <div className="flex items-center justify-center  mb-3">
                            <span className="text-red-500 text-9xl border-2 border-red-600 rounded-full w-20 h-20 pt-7 pl-6">
                              <Trash />
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">
                            Are you sure?
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Do you really want to delete this job?
                          </p>
                          <div className="flex justify-center gap-4">
                            <button
                              onClick={() => setShowConfirm(false)}
                              className="px-4 py-2 bg-gray-200 rounded-lg"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleDelete}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Success Modal */}
                    {showSuccess && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm">
                          <div className="text-green-500 text-4xl mb-3">✅</div>
                          <h3 className="text-lg font-semibold mb-2">
                            Your job deleted successfully
                          </h3>
                          <button
                            onClick={() => setShowSuccess(false)}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPostedJob;
