import React, { useEffect } from 'react'
import { JOBS_API_END_POINT } from '../utils/constant'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllAdminJobs } from '../redux/jobSlice.js';


const useGetAllAdminJobs = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOBS_API_END_POINT}/getadminjobs`, { withCredentials: true });

                if(res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    }, [])
}

export default useGetAllAdminJobs



