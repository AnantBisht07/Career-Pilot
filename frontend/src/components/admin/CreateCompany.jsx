import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";

const CreateCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = React.useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      ); // sending company name to the backend for registration

      if (res?.data?.success) {
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        // Passing companyName to the next page
        navigate(`/admin/companies/${companyId}`, { state: { companyName } });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl text-gray-200">
            {" "}
            Your Company Name
          </h1>
          <p className="text-gray-400">
            Give your company a valueable name, you can change this later.
          </p>
        </div>

        <Label className="text-orange-600">Company Name</Label>
        <Input
          type="text"
          className="my-2 text-gray-200"
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Adobe, Microsoft, Google, etc."
        />

        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
