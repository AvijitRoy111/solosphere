import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "../JobCard/JobCard";
import { useEffect, useState } from "react";
import axios from "axios";

const TabCatagory = () => {
  // const [jobs, setJobs] =useState([])

  // useEffect(()=>{
  //   const getData = async () =>{
  //       const {data} = await axios.get(`${import.meta.env.VITE_api}/jobs`)
  //       setJobs(data)
  //   }
  //   getData();
  // },[])


  return (
    <div className="mt-20 mb-40">
      <div className="flex flex-col items-center justify-center gap-4 mb-16">
        <h1 className="text-4xl  font-bold text-center">
          Browse Job By Catagory
        </h1>
        <p className=" text-xl font-medium text-center w-auto md:w-[750px]">
          Browse through all the jobs currently advertised on Job Bank by
          location, category or employer. Top searched job titles.Find job
          openings hiring now - browse millions of jobs by Category hiring now
          on ZipRecruiter.
        </p>
      </div>

      <Tabs>
        <div className="w-full border-b ">
          <TabList className="flex items-center justify-center gap-6">
            <Tab
              className="px-4 py-2 cursor-pointer focus:outline-none"
              selectedClassName="border-t border-l border-r  rounded-t-md bg-background text-blue-600 font-semibold -mb-[1px]"
            >
              Web Development
            </Tab>
            <Tab
              className="px-4 py-2 cursor-pointer focus:outline-none"
              selectedClassName="border-t border-l border-r  rounded-t-md bg-background text-blue-600 font-semibold -mb-[1px]"
            >
              Graphic Design
            </Tab>
            <Tab
              className="px-4 py-2 cursor-pointer focus:outline-none"
              selectedClassName="border-t border-l border-r  rounded-t-md bg-background text-blue-600 font-semibold -mb-[1px]"
            >
              Digital Marketing
            </Tab>
          </TabList>
        </div>

        <div className="mt-8">
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {jobs
                .filter((j) => j.catagory.toLowerCase() === "web development".toLowerCase())
                .map((job) => (
                  <div key={job._id} className="flex justify-center w-full">
                    <JobCard job={job} className="w-full md:w-auto" />
                  </div>
                ))}
            </div>
          </TabPanel>
          <TabPanel>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {jobs
                .filter((j) => j.catagory.toLowerCase() === "Graphic Design".toLowerCase())
                .map((job) => (
                  <div key={job._id} className="flex justify-center w-full">
                    <JobCard job={job} className="w-full md:w-auto" />
                  </div>
                ))}
            </div>
          </TabPanel>
          <TabPanel>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {jobs
                .filter((j) => j.catagory.toLowerCase() === "Digital Marketing".toLowerCase())
                .map((job) => (
                  <div key={job._id} className="flex justify-center w-full">
                    <JobCard job={job} className="w-full md:w-auto" />
                  </div>
                ))}
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TabCatagory;
