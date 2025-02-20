import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job?._id}`)}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-5 rounded-md shadow-lg bg-white border border-gray-200 cursor-pointer w-full max-w-[350px] flex flex-col items-start"
    >
      {/* Company Name & Location */}
      <div className="mb-3 text-left w-full">
        <h1 className="font-medium text-lg text-gray-800">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>

      {/* Job Title & Description */}
      <div className="mb-3 text-left w-full">
        <h1 className="font-bold text-lg text-gray-900">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Badges for Job Info */}
      <motion.div
        className="flex flex-wrap gap-2 mt-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209B7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </motion.div>
    </motion.div>
  );
};

export default LatestJobCards;
