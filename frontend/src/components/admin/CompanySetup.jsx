import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import {toast} from "sonner";
import { useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import useGetCompanyById from "../../hooks/useGetCompanyById";


const CompanySetup = () => {
  const params = useParams();  // used for getting the company id from search query.
  useGetCompanyById(params.id);
  const { state } = useLocation(); // Get state from location
  const [input, setInput] = React.useState({ 
    name:  "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector(store=>store.company) || {}; 
  const [loading, setLoading] = React.useState(false);


  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Creates a new FormData object.
    formData.append("name", input?.name);
    formData.append("description", input?.description);
    formData.append("website", input?.website);
    formData.append("location", input?.location);

    if(input.file) {
        formData.append('file', input.file);
    }
    // api call
    try {
        setLoading(true);
        const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        if(res.data.success) {
            toast.success(res.data.message);
            navigate('/admin/companies');
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }finally{
        setLoading(false);
    }
  };
  // file bhejne k lie FormData use hota hai
  // FormData is a built-in JavaScript API that allows you to store key-value pairs. It's used to send data to the server.
  //   Automatically sets the correct request headers (multipart/form-data).
  // Works with fetch() or axios.post() for making API requests.


  useEffect(() => {
    setInput({
        name: state?.companyName  || "",
        description: singleCompany?.description || "",
        website: singleCompany?.website || "",
        location: singleCompany?.location || "",
        file: singleCompany?.file || null
    })
  },[singleCompany]);
  
  return (
    <div>
      <Navbar />

      <div className="max-w-xl mx-auto my-10 text-orange-600">
        <form onSubmit={submitHandler}>
          <div>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className='text-gray-200'>Company Name</Label>
              <Input
               className='text-gray-200'
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className='text-gray-200'>Description</Label>
              <Input
              className='text-gray-200'
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className='text-gray-200'>Website</Label>
              <Input
              className='text-gray-200'
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className='text-gray-200'>Location</Label>
              <Input
              className='text-gray-200'
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className='text-gray-200'>Logo</Label>
              <Input
              className='text-gray-200'
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {
            loading ? <Button className='w-full my-4'><Loader2 className="mr-2 h-4 w-4 animate-spin">Loading...</Loader2></Button> : <Button type="submit" className=" w-full my-4">
            Update
          </Button>
          }
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
