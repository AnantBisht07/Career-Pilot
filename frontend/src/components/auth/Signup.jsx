import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const { loading, user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("file", input.file);
    formData.append("role", input.role);

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 sm:p-8"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create an Account
          </h1>

          <div className="mb-4">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Anant Bisht"
              value={input.fullname}
              name="fullname"
              onChange={handleOnChange}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="ianantbisht@gmail.com"
              value={input.email}
              name="email"
              onChange={handleOnChange}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="9999999999"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={handleOnChange}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="******"
              value={input.password}
              name="password"
              onChange={handleOnChange}
              className="w-full"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <Label>Role</Label>
            <RadioGroup className="flex items-center gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={handleOnChange}
                  className="cursor-pointer"
                />
                <Label className='text-md'>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={handleOnChange}
                  className="cursor-pointer"
                />
                <Label className='text-md'>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <Label>Profile Picture</Label>
            <Input
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer bg-gray-100"
              onChange={changeFileHandler}
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            {loading ? (
              <Button className="w-full flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-[#034951] hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            )}
          </div>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 font-medium">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
