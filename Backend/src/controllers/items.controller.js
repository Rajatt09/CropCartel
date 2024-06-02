import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addItem = async (req, res) => {
  try {
    const {
      name,
      quantity,
      category,
      basePrice,
      status,
      description,
      timePeriod,
    } = req.body;
    const cropImageLocalPath = req.file?.path;
    // console.log("crop image is: ", cropImageLocalPath);

    let crop;
    if (cropImageLocalPath) {
      crop = await uploadOnCloudinary(cropImageLocalPath);
    }

    const new_item = new Product({
      name: name,
      category: category,
      basePrice: basePrice,
      quantity: quantity,
      status: status,
      seller: req.user._id,
      description: description,
      expire: timePeriod,
      cropImage: crop?.url || "",
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
    console.error("error while adding item: ", error);
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
  updateItemStatus();
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
    // console.log(id);
    const item = await Product.findById(id);
    if (!item) {
      res.status(400).json(new ApiError(400, "Item not found"));
    }

    let updateFields = { ...req.body };
    const cropImageLocalPath = req.file?.path;
    // console.log("crop image is: ", cropImageLocalPath);

    if (cropImageLocalPath) {
      const crop = await uploadOnCloudinary(cropImageLocalPath);
      updateFields.cropImage = crop?.url || "";
    }

    const updatedItem = await Product.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(400).json(new ApiError(400, "Error updating item"));
    }
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
    console.log("reached deleted", id);
    const result = await Product.deleteOne({ _id: id });
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

const gettingDelete = async (req, res) => {
  console.log("getting delete reached");
  console.log(req.body, req.user);
  try {
    if (req.body.type == "seller") {
      const result = await Product.updateOne(
        { _id: req.body.id },
        { $set: { sellerCount: 0 } }
      );
    } else if (req.body.type == "buyer") {
      const result = await Product.updateOne(
        { _id: req.body.id },
        { $set: { buyerCount: 0 } }
      );
    }

    const product = await Product.findById(req.body.id);

    if (product.sellerCount === 0 && product.buyerCount === 0) {
      await Product.deleteOne({ _id: req.body.id });
    }

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

const gettingSold = async (req, res) => {
  try {
    //const {id} = req.user;
    const itemsArray = await Product.find({
      status: "expired",
      seller: req.user._id,
      sellerCount: 1,
    });

    const items = itemsArray.map((item) => item.toObject());

    await Promise.all(
      items.map(async (item) => {
        const buyer = await User.findById(item.buyer);
        item.buyerName = buyer ? buyer.name : "Unknown";
        item.buyerPhone = buyer ? buyer.phnumber : "Unknown";
        item.buyerEmail = buyer ? buyer.email : "Unknown";
        item.buyerState = buyer ? buyer.state : "Unknown";
        item.buyerCity = buyer ? buyer.city : "Unknown";
        return item;
      })
    );

    // console.log(items);

    return res
      .status(200)
      .json(new ApiResponse(200, items, "Items are succesfully rendered"));
  } catch (error) {
    console.log("error occured while rendering the sold items");
    res
      .status(400)
      .json(new ApiError(400, "error occured while rendering sold items"));
  }
};

const gettingBought = async (req, res) => {
  try {
    //const {id} = req.user;
    const itemsArray = await Product.find({
      status: "expired",
      buyer: req.user._id,
      buyerCount: 1,
    });

    const items = itemsArray.map((item) => item.toObject());

    await Promise.all(
      items.map(async (item) => {
        const seller = await User.findById(item.seller);
        item.sellerName = seller ? seller.name : "Unknown";
        item.sellerPhone = seller ? seller.phnumber : "Unknown";
        item.sellerEmail = seller ? seller.email : "Unknown";
        item.sellerState = seller ? seller.state : "Unknown";
        item.sellerCity = seller ? seller.city : "Unknown";
        return item;
      })
    );

    return res
      .status(200)
      .json(new ApiResponse(200, items, "Items are succesfully rendered"));
  } catch (error) {
    console.log("error occured while rendering the bought items");
    res
      .status(400)
      .json(new ApiError(400, "error occured while rendering bought items"));
  }
};

// Update item status based on end time
const updateItemStatus = async () => {
  try {
    const items = await Product.find();

    items.forEach(async (item) => {
      if (item.expire < new Date() && item.status === "posted") {
        item.status = "expired";
        await item.save();
      }
    });
  } catch (error) {
    throw new Error("Error updating item status: " + error.message);
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
  gettingSold,
  gettingBought,
  updateItemStatus,
  gettingDelete,
};
