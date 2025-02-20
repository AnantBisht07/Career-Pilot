import React from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import axios from 'axios';



const status = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async(status, id) => {
  
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status});
      if(res.data.success) {
        toast.success(res.data.message);
        
      }
    } catch (error) {
      toast.error(error.response.data.meesage);
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full text-left">
        <TableCaption className='text-gray-300'>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='text-gray-300'>Full Name</TableHead>
            <TableHead className='text-gray-300'>Email</TableHead>
            <TableHead className='text-gray-300'>Contact</TableHead>
            <TableHead className='text-gray-300'>Resume</TableHead>
            <TableHead className='text-gray-300'>Date</TableHead>
            <TableHead className="text-right text-gray-300">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item, idx) => {
              return (
                <tr key={idx} className="text-gray-200">
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                  {
                          item?.applicant?.profile?.resume ? <a className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                        }

                    </TableCell>

                  

            
                  <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>

                  <TableCell className="float-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 cursor-pointer">
                        
                        {status.map((status, idx) => {
                          return (
                            <div onClick={() => statusHandler(status, item?._id)} // paasing the every applicant id.
                              key={idx}
                              className="flex w-fit items-center my-2 cursor-pointer text-orange-600"
                            >
                              <span>{status}</span>
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
