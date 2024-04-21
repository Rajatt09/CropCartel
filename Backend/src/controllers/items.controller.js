import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addItem = async (req, res) => {
  try {
    const {name,quantity,category,basePrice,status,description,timePeriod} = req.body.product;
    //console.log(req.body.product, "Hello");
    const new_item = new Product({
      name: name,
      category: category,
      basePrice: basePrice,
      quantity: quantity,
      status: status,
      seller: req.user._id,
      description:description,
      expire:timePeriod
    });
    //console.log("Hi");
    const result = await new_item.save();
    if (!result) {
      return res
        .status(400)
        .json(new ApiError(500, "item not added to database"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, result, " item added successfully"));
  } catch (error) {
    console.error("error while adding item: ", err);
    // throw new ApiError(500, "Internal Server Error");
    return res
      .status(500)
      .json(
        new ApiError(500, "Internal Server Error occured while adding item")
      );
  }
};

const getSaved = async (req, res) => {
  try {
    const items = await Product.find({ status: "saved", seller: req.user._id });
    return res
      .status(200)
      .json(new ApiResponse(200, items, " saved items fetched successfully"));
  } catch (error) {
    console.log("error during  getting saved items", error);
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Internal Server Error occured while fetching saved items"
        )
      );
  }
};

const getPosted = async (req, res) => {
  try {
    const items = await Product.find({
      status: "posted",
      seller: { $ne: req.user._id },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, items, " posted items fetched successfully"));
  } catch (error) {
    console.log("error during  getting posted items", error);
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Internal Server Error occured while fetching posted items"
        )
      );
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Product.findById(id);
    //   res.send(item);
    return res
      .status(200)
      .json(new ApiResponse(200, item, "item detail fetched successfully"));
  } catch (error) {
    console.error("error while getting items: ", error);
    // throw new ApiError(500, "Internal Server Error");
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Internal Server Error occured while getting particular item detail"
        )
      );
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const item = await Product.findById(id);
    if (!item) {
      res
        .status(400)
        .json(
          new ApiError(400, "error occured while finding items to be updated")
        );
    }

    const updatedItem = await Product.findByIdAndUpdate(req.params.id, {
      ...req.body.product,
    });
    await updatedItem.save();
    return res
      .status(200)
      .json(new ApiResponse(200, updatedItem, "item updated successfully"));
  } catch (error) {
    console.log("error during getting updated items : ", updateItem);
    res
      .status(400)
      .json(new ApiError(400, "error occured while updating item"));
  }
};

const saveItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Product.findById(id);
    if (!item) {
      return res
        .status(404)
        .json(new ApiError(404, "Item to be changed to posted is not found"));
    }

    item.status = "posted";
    await item.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, item, "Item posted successfully"));
  } catch (error) {
    console.log("Error while saving item:", error);
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Internal Server Error during changing item from saved to posted"
        )
      );
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("reached deleted");
    const result = await Product.findOneAndDelete({ id });
    console.log(result);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "item deleted successfully"));
  } catch (error) {
    console.log("error occured while deleting items");
    res
      .status(400)
      .json(new ApiError(400, "error occured while deleting item"));
  }
};

export {
  addItem,
  getItem,
  deleteItem,
  updateItem,
  getPosted,
  getSaved,
  saveItem,
};