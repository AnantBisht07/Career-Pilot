import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";



const LatestJobs = () => {

  const { allJobs } = useSelector(store => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 ">
      <h1 className="text-4xl font-bold">
        {" "}
        <span className="text-[#E64833]">Latest & Top</span> <span className="text-white">Job Openings</span>
      </h1>
      {/* job cards display */}
      <div className="grid lg:grid-cols-3 gap-4 my-5">
        { allJobs.length <= 0 ? <p>No Jobs Found!</p> :   (
          allJobs.slice(0, 6).map((job, idx) => <LatestJobCards key={idx} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
