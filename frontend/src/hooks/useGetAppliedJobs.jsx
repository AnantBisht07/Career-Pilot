import axios from 'axios';
import { useEffect } from 'react';
import {APPLICATION_API_END_POINT} from '../utils/constant.js';
import { setAllAppliedJobs } from '../redux/jobSlice.js';
import { useDispatch } from 'react-redux';


const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
useEffect(() => {
    const fetchAppliedJobs = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials: true});
        if(res.data.success) {
            dispatch(setAllAppliedJobs(res.data.application)) // to mai apne jobSlice mai saari applied jobs ko store kr lunga redux isilie use hota hai 
            // or humne backend mai application response mai bhej rkha hai to wha se utha lia
        }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAppliedJobs();
}, [])
}


export default useGetAppliedJobs;


// hume isko profile page par get krna hai toh profile get kr lenge...
