import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";
import { Company } from "../models/companyModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";





export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const { id: jobId } = req.params; // req.params.id

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job is required!",
      });
    }

    // check user is already applied or not!
    const existingApplication = await Application.findOne({
      jobId,
      applicant: userId,
    }); // jobid se find krlia, fr match kradiya, dono match hone chahiye
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "Already applied!",
      });
    }

    // check if job exist
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Job not found!",
      });
    }

    if (!job.company) {
        return res.status(400).json({
          success: false,
          message: "Job is missing the required company field!",
        });
      }

    // create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
      
    });

    job.applications.push(newApplication._id); // job schema ke andr yeh array h udhr save kra dia
    await job.save();
    return res.status(201).json({
      success: true,
      message: "Job applied successfully!",
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

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id; // logged in user
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({ path: "job", populate: { path: "company"} }); // job ke andr company ko populate krnge }); // ascending order m sort hogya...
    if (!application) {
      return res.status(400).json({
        message: "Application not found!",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      application,
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

// kitne user ne apply kra hai wo dekhne k lie(by admin)
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
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

// update(by admin)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id; // handle by frontend
    if (!status) {
      return res.status(400).json({
        message: "Status is required!",
        success: false,
      });
    }

    // find application by applicantion id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(400).json({
        message: "Application not found!",
        success: false,
      });
    }

    // update status
    application.status = status.toLocaleLowerCase();
    await application.save();

    return res.status(200).json({
        success: true,
        message: "Status updated successfully!"
    })

  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
