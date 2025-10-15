import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "../JobCard/JobCard";
import { useEffect, useState } from "react";
import axios from "axios";

const TabCatagory = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(3); // ✅ প্রতি পেইজে কয়টা job দেখাবে

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_api}/jobs`);
      setJobs(data.data);
    };
    getData();
  }, []);

  // ✅ Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  // নির্দিষ্ট category এর job গুলো আলাদা ফাংশনে রাখছি
  const filterJobs = (category) =>
    jobs.filter((j) => j.catagory?.toLowerCase() === category.toLowerCase());

  const paginate = (array) => array.slice(indexOfFirstJob, indexOfLastJob);

  // ✅ Total Pages (Dynamic)
  const totalPages = (totalJobs) => Math.ceil(totalJobs / jobsPerPage);

  // ✅ Handle Page Change
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = (total) => {
    if (currentPage < total) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="mt-20">
      <div className="flex flex-col items-center justify-center gap-4 mb-16">
        <h1 className="text-4xl font-bold text-center">
          Browse Job By Category
        </h1>
        <p className="text-xl font-medium text-center w-auto md:w-[750px]">
          Browse through all the jobs currently advertised on Job Bank by
          location, category or employer. Top searched job titles.
        </p>
      </div>

      <Tabs>
        <div className="w-full border-b ">
          <TabList className="flex items-center justify-center gap-6">
            <Tab
              className="px-4 py-2 cursor-pointer focus:outline-none"
              selectedClassName="border-t border-l border-r rounded-t-md bg-background text-blue-600 font-semibold -mb-[1px]"
            >
              Web Development
            </Tab>
            <Tab
              className="px-4 py-2 cursor-pointer focus:outline-none"
              selectedClassName="border-t border-l border-r rounded-t-md bg-background text-blue-600 font-semibold -mb-[1px]"
            >
              Graphics Design
            </Tab>
            <Tab
              className="px-4 py-2 cursor-pointer focus:outline-none"
              selectedClassName="border-t border-l border-r rounded-t-md bg-background text-blue-600 font-semibold -mb-[1px]"
            >
              Digital Marketing
            </Tab>
          </TabList>
        </div>

        {/* ✅ Tab Panels */}
        <div className="mt-8">
          {["Web Development", "Graphics Design", "Digital Marketing"].map(
            (category, index) => {
              const filtered = filterJobs(category);
              const pagedJobs = paginate(filtered);
              const total = totalPages(filtered.length);

              return (
                <TabPanel key={index}>
                  {/* Job Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pagedJobs.map((job) => (
                      <div key={job._id} className="flex justify-center w-full">
                        <JobCard job={job} className="w-full md:w-auto" />
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {filtered.length > 0 && (
                    <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
                     
                      {/* Prev / Next + Page Info */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handlePrev}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded-md ${
                            currentPage === 1
                              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-500"
                          }`}
                        >
                          Prev
                        </button>

                        <span className="text-gray-700 font-semibold">
                          Page {currentPage} of {total}
                        </span>

                         {/* Per Page Selector */}
                      <div className="flex items-center gap-2">
                        
                        <select
                          className="border bg-white p-2 rounded-md"
                          value={jobsPerPage}
                          onChange={(e) => {
                            setJobsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                        >
                          <option value={3}>3</option>
                          <option value={6}>6</option>
                          <option value={9}>9</option>
                        </select>
                      </div>

                        <button
                          onClick={() => handleNext(total)}
                          disabled={currentPage === total}
                          className={`px-4 py-2 rounded-md ${
                            currentPage === total
                              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-500"
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </TabPanel>
              );
            }
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default TabCatagory;
