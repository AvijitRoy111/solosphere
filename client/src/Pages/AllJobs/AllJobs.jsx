import axios from "axios";
import { useEffect, useState } from "react";
import Jobcard from "./JobCard/Jobcard";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Filters & states
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  // all data
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_api}/jobs`);
      setJobs(data);
      setFilteredJobs(data);
    };
    getData();
  }, []);

  // 🔹 Filtering + Searching + Sorting handle
  useEffect(() => {
    let updatedJobs = [...jobs];

    // Category filter
    if (category) {
      updatedJobs = updatedJobs.filter((job) => job?.catagory.toLowerCase() === category.toLowerCase());
    }

    // Search filter
    if (search) {
      updatedJobs = updatedJobs.filter((job) =>
        job?.job_title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting
    if (sort === "asc") {
      updatedJobs = updatedJobs.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
    } else if (sort === "dsc") {
      updatedJobs = updatedJobs.sort(
        (a, b) => new Date(b.deadline) - new Date(a.deadline)
      );
    }

    setFilteredJobs(updatedJobs);
    setCurrentPage(1);
  }, [category, search, sort, jobs]);

  // 🔹 Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);

  //  Reset.....
  const handleReset = () => {
    setCategory("");
    setSearch("");
    setSort("");
    setItemsPerPage(3);
    setCurrentPage(1);
    setFilteredJobs(jobs);
  };

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      {/* Filter Section */}
      <div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-50 border p-4 rounded-lg"
          >
            <option value="">Filter By Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphics Design">Graphics Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
          </select>

          {/* Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter Job Title"
              />

              <button
                type="submit"
                className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </form>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-gray-50 border p-4 rounded-md"
          >
            <option value="">Sort By Deadline</option>
            <option value="dsc">Descending Order</option>
            <option value="asc">Ascending Order</option>
          </select>

          {/* Reset */}
          <button onClick={handleReset} className="btn bg-blue-700 py-3 px-4 rounded-md">
            Reset
          </button>
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 ">
          {currentJobs.map((job) => (
            <Jobcard key={job._id} job={job} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed hover:bg-blue-500 hover:text-white"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((btnNum) => (
          <button
            key={btnNum}
            onClick={() => setCurrentPage(btnNum)}
            className={`px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md ${
              currentPage === btnNum
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {btnNum}
          </button>
        ))}

        {/* Items per page */}
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="bg-gray-50 border text-center px-2 mr-2 ml-2 rounded-md"
        >
          <option value="3">3 </option>
          <option value="6">6 </option>
          <option value="9">9</option>
        </select>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllJobs;
