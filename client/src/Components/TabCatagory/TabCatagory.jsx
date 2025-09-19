import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "../JobCard/JobCard";

const TabCatagory = () => {
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
            <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-8">
              <JobCard></JobCard>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-8">
              <JobCard></JobCard>
              <JobCard></JobCard>
              <JobCard></JobCard>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-8">
              <JobCard></JobCard>
              <JobCard></JobCard>
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TabCatagory;
