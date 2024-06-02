import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      //   throw new ApiError(404, "User does not exist");
      return res.status(404).json(new ApiError(404, "User does not exist"));
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    // throw new ApiError(
    //   500,
    //   "Something went wrong while generating refresh and access token"
    // );
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Something went wrong while generating refresh and access token"
        )
      );
  }
};

const registerUser = async function (req, res) {
  const { name, email, password, phnumber } = req.body;

  console.log(req.body);
  if ([name, email, password, phnumber].some((field) => field?.trim() === "")) {
    // throw new ApiError(400, "All fileds are required");
    return res.status(400).json(new ApiError(400, "All files are required"));
  }
  // Checking for valid email format using regex pattern
  const regExp = /^[a-zA-Z0-9._%+-]+@[a-z]+\.[a-z.]+$/;
  //   if (!regExp.test(email)) {
  //     throw new ApiError(400, "Invalid Email Format!");
  //   }

  try {
    let userExist = await User.findOne({ email });
    if (userExist) {
      //   throw new ApiError(409, "User with this email already exists.");
      return res
        .status(409)
        .json(new ApiError(409, "User with this email already exists."));
    }

    // const avatarLocalPath = req.file?.path;

    // const avatar = await uploadOnCloudinary(avatarLocalPath);

    const user = await User.create({
      name,
      email,
      password,
      phnumber,
      //   avatar: avatar?.url || "",
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      //   throw new ApiError(
      //     500,
      //     "Something went wrong while registering the user, Please try later."
      //   );
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "Something went wrong while registering the user, Please try later."
          )
        );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  } catch (err) {
    console.error("error while creating user: ", err);
    // throw new ApiError(500, "Internal Server Error");
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "") {
      //   throw new ApiError(400, "email is required");
      return res.status(400).json(new ApiError(400, "email is required"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      //   throw new ApiError(404, "User does not exist");
      return res.status(404).json(new ApiError(404, "User does not exist"));
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      //   throw new ApiError(401, "Invalid user credentials");
      return res
        .status(401)
        .json(new ApiError(401, "Invalid user credentials"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged in succesfully"
        )
      );
  } catch (error) {
    console.log("error while  logging in the user => ", error);
    // throw new ApiError(500, "Internal Server Error occured while finding user");
    return res
      .status(500)
      .json(
        new ApiError(500, "Internal Server Error occured while finding user")
      );
  }
};

const logoutUser = async function (req, res) {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged Out"));
  } catch (e) {
    console.log("Logout failed with error : ", e);
    // throw new ApiError(500, "Failed to Log out");
    return res.status(500).json(new ApiError(500, "Failed to Log out"));
  }
};

const redirectingUser = async function (req, res) {
  try {
    const loggedInUser = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );

    return res.status(200).json(new ApiResponse(200, loggedInUser));
  } catch (e) {
    console.log("redirection to dashboard failure : ", e);
    return res
      .status(400)
      .json(new ApiError(400, "redirection to dashboard fail."));
    // throw new ApiError(500, "Failed to Log out");
  }
};

const getDetails = async function (req, res) {
  try {
    const loggedInUser = await User.findById(req.user._id).select(
      "-password -refreshToken -createdAt  -updatedAt -__v"
    );

    // console.log("get details is activated");

    return res.status(200).json(new ApiResponse(200, loggedInUser));
  } catch (e) {
    console.log("failure in user details fetching : ", e);
    return res
      .status(400)
      .json(new ApiError(400, "failure in user details fetching."));
    // throw new ApiError(500, "Failed to Log out");
  }
};

const updateAccount = async function (req, res) {
  try {
    const updateFields = req.body;
    console.log(updateFields);

    // Remove empty fields to avoid overwriting with empty values
    // Object.keys(updateFields).forEach(
    //   (key) => updateFields[key] === undefined && delete updateFields[key]
    // );

    // Checking for valid email format using regex pattern
    // const regExp = /^[a-zA-Z0-9._%+-]+@[a-z]+\.[a-z.]+$/;
    if (updateFields.email === "") {
      //   throw new ApiError(400, "Invalid Email Format!");
      return res.status(400).json(new ApiError(400, "Invalid Email Format!"));
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      //   throw new ApiError(404, "User does not exist");
      return res.status(404).json(new ApiError(404, "User does not exist"));
    }

    Object.keys(updateFields).forEach((key) => (user[key] = updateFields[key]));

    await user.save({ validateBeforeSave: false });

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(201)
      .json(
        new ApiResponse(200, loggedInUser, "User details updated successfully")
      );
  } catch (error) {
    console.log("error while updating detalis of user", error);
    // throw new ApiError(400, "Updation of Details Failed. Please try later.");
    return res
      .status(400)
      .json(new ApiError(400, "Updation of Details Failed. Please try later."));
  }
};

const updateYourAvatar = async function (req, res) {
  try {
    const avatarLocalPath = req.file?.path;
    // console.log("avatar :", avatarLocalPath);
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    // console.log("avatar url : ", avatar.url);
    const user = await User.findById(req.user._id);
    if (!user) {
      //   throw new ApiError(404, "User does not exist");
      return res.status(404).json(new ApiError(404, "User does not exist"));
    }

    user.avatar = avatar?.url || "";
    await user.save({ validateBeforeSave: false });

    const updatedUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!updatedUser) {
      //   throw new ApiError(
      //     500,
      //     "Something went wrong while updating profile picture of the user, Please try later."
      //   );
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "Something went wrong while updating profile picture of the user, Please try later."
          )
        );
    }

    //       TO BE CHECKED WHETHER THIS IS WORKING OR NOT

    //delete avatar from cloudinary
    // deleteFromCloudinary(user.avatar);

    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          updatedUser,
          "User profile picture updated successfully"
        )
      );
  } catch (err) {
    console.error("error while updating user profile picture: ", err);
    // throw new ApiError(500, "Internal Server Error");
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  updateAccount,
  updateYourAvatar,
  redirectingUser,
  getDetails,
};
