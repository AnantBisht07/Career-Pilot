import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-5 my-10"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium"
        >
          No. 1 job hunt web app!
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl font-bold text-white"
        >
          Search, Apply & <br />{" "}
          <span className="text-[#E64833]"> Get Your Dream Job</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-500"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint cumque
          similique exercitationem? Perferendis, tempore sit.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center mx-auto bg-[#E64833] h-10"
        >
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Find your dream job"
            className="placeholder-white outline-none bg-[#E64833] text-white text-sm w-full px-3 py-2"
          />
          <Button
            onClick={submitHandler}
            className="rounded-r-full bg-[#E64833] hover:bg-[#d42f19] px-3 py-2"
          >
            <Search className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
