import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const verifyJWT = async (req, res, next) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log("req.cookie is: ", req.cookie);
    // console.log("header is: ", req.header("Authorization"));
    // console.log("req body", req.body);
    if (!token) {
      //   throw new ApiError(401, "Unauthorized request");
      return res
        .status(401)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiError(401, "Unauthorized request"));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      //   throw new ApiError(401, "Invalid Access Token");
      return res
        .status(401)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiError(401, "Invalid Access Token"));
    }
    req.user = user;

    next();
  } catch (error) {
    // throw new ApiError(401, "Invalid access token");
    return res
      .status(401)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiError(401, "Invalid access token"));
  }
};