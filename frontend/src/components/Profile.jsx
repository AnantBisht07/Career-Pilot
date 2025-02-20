import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, MailIcon, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {

  useGetAppliedJobs();


  const [open, setOpen] = useState(false);
  // user chhaiyie to le aao store se
  const { user } = useSelector((store) => store.auth);
  

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.profile?.profilePhoto}/>
            </Avatar>
            <div className="text-left">
              <h1 className="text-[#034951] font-medium text-xl">{user?.fullname}</h1>
              <p className="text-gray-700">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <MailIcon />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1 className="text-left pl-1">Skills</h1>
          <div className="flex items-center gap-1 cursor-pointer ">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile.skills.map((item, idx) => (
                <Badge className="text-sm mt-1" key={idx}>
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="mt-1 text-md text-left font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile.resume}
              className="text-left text-blue-500 hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className=" max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="pt-2 font-bold text-lg my-5  ">Applied Jobs</h1>
        {/* application table which you have applied  */}
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
