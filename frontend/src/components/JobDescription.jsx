import React, { useEffect, useState } from 'react';
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { JOBS_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import Navbar from '../components/shared/Navbar'

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);

  const initiallyApplied = singleJob?.applications?.some(app => app.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(initiallyApplied);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to fetch job details");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply for job");
    }
  };

  return (
    <>
       <Navbar />

    <div className="w-full max-w-7xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
   
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="w-full md:w-2/3">
          <h1 className="font-bold text-2xl text-left">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209B7] font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-4 md:mt-0 flex-shrink-0">
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg px-6 py-2 transition duration-300 ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209B7] hover:bg-[#5c0e8f]"
            } text-white`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>

      {/* Job Details Section */}
      <h2 className="border-b-2 border-gray-300 font-medium py-3 text-lg">Job Details</h2>

      {/* Table Layout for Job Details */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border border-gray-300 mt-4">
          <tbody>
            {[
              ["Role", singleJob?.title],
              ["Location", singleJob?.location],
              ["Experience", singleJob?.
                experienceLevel],
              ["Salary", `${singleJob?.salary} LPA `],
              ["Total Applicants", singleJob?.applications?.length || 0],
              ["Posted Date", singleJob?.createdAt?.split("T")[0]],
            ].map(([label, value], index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="w-1/3 p-3 font-semibold bg-gray-100">{label}</td>
                <td className="w-2/3 p-3">{value || "N/A"}</td>
              </tr>
            ))}

            
            <tr className="border-b border-gray-200">
              <td className="w-1/3 p-3 font-semibold bg-gray-100">Description</td>
              <td className="w-2/3 p-3 whitespace-pre-line">{singleJob?.description || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default JobDescription;
