<<<<<<< HEAD
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId, // Mongoose's ObjectId
=======
import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
>>>>>>> refs/remotes/origin/dt_home_api
      auto: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
    icon: {
<<<<<<< HEAD
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
=======
        type: String
    }
}, {
    timestamps: true 
});

// Model
const Category = mongoose.model('Category', categorySchema);
>>>>>>> refs/remotes/origin/dt_home_api
export default Category;
