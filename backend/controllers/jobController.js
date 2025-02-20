import { Job } from "../models/jobModel.js";
import { Company } from "../models/companyModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';


// these are for students --> posted by ADMIN
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id; // is se pta chlega ki konsa user job post kr rha hai...

    
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        success: false,
        message: "Something is missing in above fields!",
      });
    }

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // Validate companyId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID!",
      });
    }

    // Check if company exists
    const companyExists = await Company.findById(companyId);
    if (!companyExists) {
      return res.status(400).json({
        success: false,
        message: "Company does not exist!",
      });
    }

    const parsedSalary = Number(salary);
    if (isNaN(parsedSalary) || parsedSalary < 0) {
      return res.status(400).json({ message: "Invalid salary value" });
    }


    // create job
    const job = await Job.create({
      title,
      description,
      requirements: Array.isArray(requirements)
        ? requirements
        : requirements.split(","), // kyuki wo as a str ara hai
      salary: parsedSalary, // converted into numbers
      location,
      jobType,
      position,
      company: companyId,
      experienceLevel: experience,
      created_by: userId,
    });

    // console.log(req.body);

    return res.status(201).json({
      success: true,
      message: "Job created successfully!",
      job,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || ""; // keyword is like when we filter out the things or we search according to that is called filter...

    // it checks if either the title or description contains the keyword.
    // $regex is used for pattern matching (searching within strings).
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } }, // i is for case sensitive
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
    //   .populate( {path: "company", select: "_id name"} )
      .populate( {path: "company"} )
      .sort({ createdAt: -1 });
      
    if (!jobs) {
      return res.status(400).json({
        success: false,
        message: "Jobs not found!",
      });
    }
    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(400).json({
        message: "Job not found!",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// details of Admin --> like kitne job post kiye abhi takk
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: 'company',
      createdAt: -1
    });
    if (!jobs) {
      return res.status(400).json({
        message: "Job not found!",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
