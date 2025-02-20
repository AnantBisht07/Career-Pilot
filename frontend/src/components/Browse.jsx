import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { motion } from 'framer-motion';


const Browse = () => {
  useGetAllJobs();  // agr hum ise use nahi krnge toh filter kis mai se hogi jobs?  that's why we have to use this also here
  
  const dispatch = useDispatch();
  const { allJobs } = useSelector(store=>store.job);
  // jb hum search krne k bad is page ko levae krnge tb cleanup krdunga search query ko, kyuki wo fr same result query dega 
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  })
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
  <h1 className="font-bold text-xl my-10 text-white">Search Results ({allJobs.length})</h1>
  
  <motion.div 
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="grid lg:grid-cols-3 gap-4"
  >
    {allJobs.map((job, idx) => (
      <motion.div 
        key={idx}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 120 }}
      >
        <JobCard job={job} />
      </motion.div>
    ))}
  </motion.div>
</div>

    </div>
  );
};

export default Browse;
