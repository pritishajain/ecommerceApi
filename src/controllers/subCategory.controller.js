import subCategoryModel from "../models/subCategory.model.js";

export const createSubCategoryController = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    if (!name) {
      res.status(400).send({
        success: false,
        message: "Sub Category Name is Required",
      });
    }

    const existingSubCategory = await subCategoryModel.findOne({ name });
    if (existingSubCategory) {
      return res.status(400).send({
        success: false,
        message: "Sub Category already exists",
      });
    }

    const subCategory = await new subCategoryModel({
      name,
      description,
      category,
    }).save();

    res.status(201).send({
      success: true,
      message: "Sub Category Created Successfully",
      subCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "new Sub category was not created",
    });
  }
};

export const updateSubCategoryController = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const { id } = req.params;
    const subCategory = await subCategoryModel.findByIdAndUpdate(
      id,
      { name, description, category },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Sub Category updated Successfully",
      subCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while updating Sub category",
    });
  }
};

export const getSubCategoryController = async (req, res) => {
  try {
    const subCategory = await subCategoryModel.find({}).populate("category")
    res.status(200).send({
      success:true,
      message:"Sub Categories List",
      subCategory
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting all sub categories",
    });
    
  }
  
};

export const getByIdSubCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await subCategoryModel.findById(id).populate("category");
    res.status(200).send({
      success:true,
      message:"successfully got single sub category",
      subCategory
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting sub category by id",
    });
    
  }
};

export const deleteSubCategoryController = async (req,res) => {
  try {
    const {id} = req.params;

    const existingSubCategory = await subCategoryModel.findById(id);
    if (!existingSubCategory) {
      return res.status(404).send({
        success: false,
        message: "Sub Category not found",
      });
    }
   
    await subCategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success:true,
      message:"Sub category deleted successfully"
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in deleting the sub category",
    });
  }
}