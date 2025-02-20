import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

const Companies = () => {
    const navigate = useNavigate();
    useGetAllCompanies();

    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setSearchCompanyByText(input));
    })

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <Input className="w-fit text-gray-300" placeholder="Filter by name" onChange={(e) => setInput(e.target.value)} />
          <Button onClick={() => navigate('/admin/companies/create')}>New Compnay</Button>
        </div>

        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
