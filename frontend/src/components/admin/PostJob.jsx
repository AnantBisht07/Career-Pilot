import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "../ui/select";
import { toast } from "sonner";
import axios from "axios";
import { JOBS_API_END_POINT } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const companyArray = [];

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${JOBS_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center w-full px-4 my-5">
  <form
    onSubmit={submitHandler}
    className="p-8 w-full max-w-4xl border-gray-200 shadow-lg"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
      <div>
        <Label>Title</Label>
        <Input
          type="text"
          name="title"
          value={input.title}
          onChange={changeEventHandler}
          className="w-full my-1"
        />
      </div>

      <div>
        <Label>Description</Label>
        <Input
          type="text"
          name="description"
          value={input.description}
          onChange={changeEventHandler}
          className="w-full my-1"
        />
      </div>

      <div>
        <Label>Requirements</Label>
        <Input
          type="text"
          name="requirements"
          value={input.requirements}
          onChange={changeEventHandler}
          className="w-full my-1"
        />
      </div>

      <div>
        <Label>Salary</Label>
        <Input
          type="text"
          name="salary"
          value={input.salary}
          onChange={changeEventHandler}
          className="w-full my-1"
        />
      </div>

      <div>
        <Label>Location</Label>
        <Input
          type="text"
          name="location"
          value={input.location}
          onChange={changeEventHandler}
          className="w-full my-1"
        />
      </div>

      <div>
        <Label>Job Type</Label>
        <Input
          type="text"
          name="jobType"
          value={input.jobType}
          onChange={changeEventHandler}
          className="w-full my-1"
        />
      </div>

      <div>
        <Label>Experience</Label>
        <Input
          type="text"
          name="experience"
          value={input.experience}
          onChange={changeEventHandler}
          className="w-full my-1"
        />
      </div>

      <div>
        <Label>No Of Position</Label>
        <Input
          type="number"
          name="position"
          value={input.position}
          onChange={changeEventHandler}
          className="w-full my-1"
        />
      </div>
    </div>

    {/* Company Selection Dropdown */}
    {companies.length > 0 && (
      <div className="w-full mt-4 text-gray-200">
        <Label>Company</Label>
        <Select onValueChange={selectChangeHandler}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Companies</SelectLabel>
              {companies.map((company, idx) => (
                <SelectItem key={idx} value={company?.name?.toLowerCase()}>
                  {company?.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    )}

    {loading ? (
      <Button className="w-full my-4 flex justify-center items-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
      </Button>
    ) : (
      <Button type="submit" className="w-full my-4">
        Post New Job
      </Button>
    )}

    {companies.length === 0 && (
      <p className="text-xs text-red-600 font-bold text-center my-3">
        *Please register a company first, before posting a job.
      </p>
    )}
  </form>
</div>
</div>
  );
};

export default PostJob;
