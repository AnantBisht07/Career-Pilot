import { Company } from "../models/companyModel.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

// registering the company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    console.log("NAME: ", companyName);
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required!",
        success: false,
      });
    }

    // already exists
    let company = await Company.findOne({ name: companyName }); // we are searching companyName in name in model
    if (company) {
      return res.status(400).json({
        message: "Company already registered!",
        sucess: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully!",
      success: true,
      company,
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

// getting the company
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // jo logged in hoga uski user id h yeh kyuki hum usi ka data show krnge(companies) ka jo user logged in hoga
    // console.log(userId);
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(400).json({
        message: "Companies not found!",
        success: false,
      });
    }
    // console.log(companies);
    return res.status(200).json({
      success: true,
      companies,
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

// get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        message: "Company not found!",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      company,
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

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    //cloudinary
    let logo;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url; // logo ka public url mil jyega jo koi bhi access kr sktaa hai
    }

    const companyId = req.params.id;

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company data updated!",
      company,
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
