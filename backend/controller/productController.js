import Product from '../models/productModels.js';
import Category from '../models/catModels.js';
import handleError from "../utils/errorhandler.js"
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config();
// configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const getProducts= async (req,res)=>{
    try {
      const { category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.status(201).json(products)   
    } catch (error) {
    handleError(error,res)  
    }
}

const saveProduct = async (req, res) => {
  try {
    // check if product with same name exists
    const existingProduct = await Product.findOne({ name: req.body.name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const validCategory = await Category.findById(req.body.category);
    if (!validCategory) {
      return res.status(400).json({ message: "Invalid category" });
    }
    // create new product
    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
   handleError(error,res)  
  }
};

const updateProduct = async (req, res) => {
  try {
    const {id}= req.params;
    // check if product with same name exists
    const existingProduct = await Product.findOne({ _id: id });
    if (!existingProduct) {
      return res.status(400).json({ message: "Product not found" });
    }
    const validCategory = await Category.findById(req.body.category);
    if (!validCategory) {
      return res.status(400).json({ message: "Invalid category" });
    }
    let imageUrls = existingProduct.images || [];

    // if frontend sends new images
    if (req.body.images && req.body.images.length > 0) {
      let newImageUrls = [];

      for (let img of req.body.images) {
        // if already a URL (keep it)
        if (img.startsWith("http")) {
          newImageUrls.push(img);
        } else {
          // else upload to cloudinary (base64 or file path)
          const uploadRes = await cloudinary.uploader.upload(img, {
            folder: "products",
          });
          newImageUrls.push(uploadRes.secure_url);
        }
      }

      imageUrls = newImageUrls;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
        images: imageUrls,
      },
      { new: true }
    );


    res.status(201).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
   handleError(error,res)  
  }
};

const deleteProduct = async (req, res) => {
  try {
    const {id}= req.params;
    // check if product with same name exists
    const existingProduct = await Product.findOne({ _id: id });
    if (!existingProduct) {
      return res.status(400).json({ message: "Product not found" });
    }
    // create new product
    const deletedProduct = await Product.findByIdAndDelete(id);

    res.status(201).json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
   handleError(error,res)  
  }
};

export {getProducts, saveProduct, updateProduct, deleteProduct}