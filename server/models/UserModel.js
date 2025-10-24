import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  profilePicture: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  userStatus: {
    type: String,
    enum: ["Active", "inactive"],
    default: "Active",
  },
  matitalStatus: {
    type: String,
    enum: ["Single", "Married", "Divorced", "Widowed"],
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  phoneNumber: {
    type: Number,
  },
  dob: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  address: {
    type: String,
  },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

const propertyDataSchema = new mongoose.Schema({
  propertyType: {
    type: String,
    enum: ["RentHome", "SaleHome", "RentShop", "SaleShop", "SaleLand"],
  },
  propertyOwner: {
    type: String,
    required: true,
  },
  propertySize: {
    type: String,
    required: true,
  },
  propertyWorth: {
    type: Number,
    required: true,
  },
  ownerContact: {
    type: Number,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
  },
  propertyLocation: {
    type: String,
  },
  landType: {
    type: String,
  },
  builtYear: {
    type: Number,
  },
  description: {
    type: String,
  },
  bathrooms: {
    type: Number,
  },
  bedrooms: {
    type: Number,
  },
  propImg1: {
    type: String,
  },
  propImg2: {
    type: String,
  },
  propImg3: {
    type: String,
  },
  propImg4: {
    type: String,
  },
});
const PropertyData =
  mongoose.models.PropertyData ||
  mongoose.model("PropertyData", propertyDataSchema);

export { User, PropertyData };
