import React, { useEffect } from 'react'
import { JOBS_API_END_POINT } from '../utils/constant'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';


const useGetAllJobs = () => {

    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=> store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOBS_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true }); // hum idhr keyword se match kra ke show kr rhe hain jobs  ko

                if(res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    }, [])
}

export default useGetAllJobs


// this means whenever we call this function from the hook, it will fetch all jobs from the server and dispatch the action to the store.

// so we call the function where we want (home.jsx).

