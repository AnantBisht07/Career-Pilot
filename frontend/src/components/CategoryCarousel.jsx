import React, { useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate} from 'react-router-dom';

const category = [
    "Full Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "Data Scientist",
    "Data Analyst",
    "IT Manager",
    "UI/UX Designer",
    "Software Engineer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Cybersecurity Analyst",
    "Machine Learning Engineer",
    "Artificial Intelligence Engineer",
    "Blockchain Developer",
    "Game Developer",
    "Mobile App Developer",
    "Embedded Systems Engineer",
    "System Administrator",
    "Product Manager",
    "QA Engineer",
    "Business Analyst",
    "Technical Support Engineer",
    "Network Engineer",
    "Database Administrator",
    "AR/VR Developer",
    "IoT Engineer",
    "SEO Specialist",
    "Digital Marketing Analyst",
    "E-commerce Specialist"
  ];
  


const CategoryCarousel = () => {

  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate('/browse');
    } 


  return (
    <div className="w-full px-4">
    <Carousel
      className="w-full max-w-xl mx-auto my-6 md:my-10 relative"
      opts={{
        loop: true,
        align: "start",
      }}
    >
      <CarouselContent className="flex gap-4">
        {category.map((item, idx) => (
          <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
            <Button
              onClick={() => submitHandler(item)}
              className="rounded-full text-sm px-4 py-2"
              variant="outline"
            >
              {item}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
  
      {/* Adjusted Arrow Position for Mobile */}
      <CarouselPrevious className="absolute -left-5 sm:-left-4 md:-left-8 top-1/2 transform -translate-y-1/2" />
      <CarouselNext className="absolute -right-5 sm:-right-4 md:-right-8 top-1/2 transform -translate-y-1/2" />
    </Carousel>
  </div>
  
  );
};

export default CategoryCarousel;
