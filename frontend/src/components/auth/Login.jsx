import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from "lucide-react";





const Login = () => {

    const [input, setInput] = useState({
        email: '',
        password: '',
        role: '',
    });
    // e.target.name: Refers to the name attribute of the input field that triggered the event.

    const { loading, user } = useSelector(store=>store.auth);

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const handleOnChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value}); //Updates only the specific field that triggered the event while keeping other fields unchanged.
    }

    
    const submitHandler = async (e) => {
        e.preventDefault();
        
    
        try {
          dispatch(setLoading(true));
          const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          
          if(res.data.success) {
            // save the user form redux store
            dispatch(setUser(res.data.user));
            navigate('/');
            toast.success(res.data.message);
          }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
          // koi bhi upr se ek chltaa hai, toh yeh zruur chlta hai
          dispatch(setLoading(false));
        }
      };

      useEffect(() => {
        if(user) {
          navigate('/');
        }
      }, [])

  return (
    <>
        <Navbar />
    <div className="flex flex-col items-center">

  
    {/* Form Container */}
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-lg rounded-lg p-6 md:p-8 mx-4 md:mx-0 mt-14">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center">Login</h1>
  
      <form onSubmit={submitHandler} className="mt-4 space-y-4">
        {/* Email Input */}
        <div>
          <Label className="text-gray-700 text-sm font-medium">Enter Your Email</Label>
          <Input
            type="email"
            placeholder="ianantbisht@gmail.com"
            value={input.email}
            name="email"
            onChange={handleOnChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04555e] focus:outline-none"
          />
        </div>
  
        {/* Password Input */}
        <div>
          <Label className="text-gray-700 text-sm font-medium">Enter Your Password</Label>
          <Input
            type="password"
            placeholder="******"
            value={input.password}
            name="password"
            onChange={handleOnChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04555e] focus:outline-none"
          />
        </div>
  
        {/* Role Selection */}
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Input
              type="radio"
              name="role"
              value="student"
              checked={input.role === "student"}
              onChange={handleOnChange}
              className="cursor-pointer"
            />
            <Label className="text-gray-700 text-md">Student</Label>
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
            <Label className="text-gray-700 text-md">Recruiter</Label>
          </div>
        </div>
  
        {/* Submit Button */}
        <div>
          {loading ? (
            <Button className="w-full py-3 bg-[#04555e] text-white rounded-lg flex items-center justify-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-3 bg-[#04555e] hover:bg-[#033d46] text-white font-semibold rounded-lg transition-all duration-200"
            >
              Login
            </Button>
          )}
        </div>
  
        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#04555e] font-medium hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  </div>
  </>
  );
};

export default Login;
