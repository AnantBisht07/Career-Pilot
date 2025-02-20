import React, { useEffect, useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import {setSearchedQuery} from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Pune", "Hyderabad", "Bangalore", "Nagpur", "Mumbai"],
  },

  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Software Engineer",
      "Data Science",
      "Full Stack Dev",
      "QA Analyst",
      "AI Engineer",
    ],
  },

  {
    filterType: "Salary",
    array: ["0-30k", "32k-60k", "62k-1lakh", "1.2lakh-4lakh"],
  },
];

const FilterCard = () => {

  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  })

  return (
    <div className="w-full bg-[#086873] p-3 rounded-md">
      <h1 className="font-bold text-lg text-orange-600">Filter Jobs</h1>
      <hr className="mt-3" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, idx) => (
          <div key={idx}>
            <h1 className="text-gray-300 font-semibold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `u${idx} - ${idx}` // just generaing if for below
              return (
                <div key={idx} className="flex items-center my-2 space-x-2 text-gray-100">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;


// jo hum select kr rhe hain uski value redux store mai save kra denge
