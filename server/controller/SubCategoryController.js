import SubCategory from "../models/SubCategory.js";

export const createSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryName, description } = req.body;
    const newSubCategory = new SubCategory({
      categoryId,
      subCategoryName,
      description,
    });
    await newSubCategory.save();
    res
      .status(200)
      .json({ message: "Sub-Category created successfully", newSubCategory });
  } catch (error) {
    res.status(500).json({ message: "Error creating SubCategory", error });
  }
};

export const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate(
      "categoryId",
      "categoryName"
    );
    res.status(200).json({ subCategories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};

export const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id).populate(
      "categoryId",
      "categoryName"
    );
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    res.status(200).json({ subCateogory });
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategory", error });
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const { subCategoryName, description } = req.body;
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { subCategoryName, description },
      { new: true }
    ).populate("categoryId", "categoryName");
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    res
      .status(200)
      .json({ message: "SubCategory Updated successfully", subCateogory });
  } catch (error) {
    res.status(500).json({ message: "Error updating subcategory", error });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    res.status(200).json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subcategory", error });
  }
};
