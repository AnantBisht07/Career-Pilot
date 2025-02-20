import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: [],
    },
    reducers: {
        // actions
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        }
    }
    
})

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;

// is slice ko store mai daal skte hain..
