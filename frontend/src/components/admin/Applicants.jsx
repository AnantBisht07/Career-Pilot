import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";

const Applicants = () => {
  const params = useParams(); // params se huum id mil jyegu
  const dispatch = useDispatch();
  const {applicants} = useSelector(store=>store.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true });
          dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div>
  <Navbar />
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="font-bold text-lg sm:text-xl my-5 text-center sm:text-left">
      Applicants ({applicants?.application?.length})
    </h1>
    <div className="overflow-x-auto">
      <ApplicantsTable />
    </div>
  </div>
</div>

  );
};

export default Applicants;
