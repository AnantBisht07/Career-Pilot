import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currenTime = new Date();
    const timeDifference = Math.floor(currenTime - createdAt);
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-[#076c78] border-gray-200">
      <div className="flex items-center justify-between">
        <p className='text-green-600 text-sm'>
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>

        <div className="mt-3 flex flex-col items-start justify-center mb-2">
          <h1 className="text-[#f95b46] font-bold">{job?.company?.name}</h1>
          <p className="text-gray-300">{job?.location}</p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center w-full mt-4">
        <h1 className="font-semibold text-lg my-2 text-[#23d4e8]">{job?.title}</h1>
        <p className="text-sm text-gray-200 text-left w-full leading-relaxed min-h-24">
          {job?.description}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4 ">
        <Badge className="text-blue-400 font-bold " variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold " variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[hsl(276,100%,66%)] font-bold " variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#0598a9] hover:bg-[#0d7783]">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
