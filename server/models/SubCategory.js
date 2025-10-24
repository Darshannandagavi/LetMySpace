import mongoose from "mongoose";


const subCategorySchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategoryName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }

},
    { timestamps: true }
);
export default mongoose.model("SubCategory",subCategorySchema);