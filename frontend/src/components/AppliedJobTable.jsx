import React from 'react'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const {allAppliedJobs = []} = useSelector(store=>store.job);
  return (
    <div>
      <Table>
        <TableCaption>List of your applied jobs!</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className='text-right'>Status</TableHead>
            </TableRow>
        </TableHeader>
       <TableBody>
        
        {
            allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((item, idx) => (
                <TableRow key={idx}>
                    <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                    <TableCell>{item?.job?.title}</TableCell>
                    <TableCell>{item?.job?.company?.name}</TableCell>
                    <TableCell className=' text-right'><Badge 
                    className={`${item?.status === 'rejected' ? 'bg-red-500' : item?.status === 'pending' ? 'bg-gray-400' : 'bg-green-500'}`}
                    >{item?.status.toUpperCase()}</Badge></TableCell>

                </TableRow>
            ))
        }
       </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
