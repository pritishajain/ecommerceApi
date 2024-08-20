import categoryModel from "../models/category.model.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name, description, subcategories } = req.body;

    if (!name) {
      res.status(400).send({
        success: false,
        message: " Category Name is Required",
      });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await new categoryModel({
      name,
      description,
      subcategories,
    }).save();

    res.status(201).send({
      success: true,
      message: "Category Created Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "new category was not created",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name, description, subcategories } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, description, subcategories },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Ctaegory updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while updating category",
    });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({})
    res.status(200).send({
      success:true,
      message:"Categories List",
      category
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting all categories",
    });
    
  }
  
};

export const getByIdCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    res.status(200).send({
      success:true,
      message:"successfully got single category",
      category
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting category by id",
    });
    
  }
};

export const deleteCategoryController = async (req,res) => {
  try {
    const {id} = req.params;

    const existingCategory = await categoryModel.findById(id);
    if (!existingCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
   
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success:true,
      message:"category deleted successfully"
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in deleting the category",
    });
  }
}