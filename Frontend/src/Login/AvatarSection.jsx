import React, { useState } from "react";
import ApiCall from "../../utils/ApiCall";
import axios from "axios";

const AvatarSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setErrorMessage("Please select a file.");
      return;
    }
    // Add your logic to handle the uploaded file here
    console.log("Selected file:", selectedFile);
    try {
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      //   const response = await ApiCall("/users/updateavatar", "POST", FormData);
      const response = await axios.post("/users/updateavatar", formData);
      const temp = response.data.data || {};

      console.log("temp", temp);
      //   navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      console.error("Error while updating user profile picture: ", error);
    }
    // Reset the selected file state after handling it
    setSelectedFile(null);
    setErrorMessage("");
  };

  return (
    <div className="profile-section" style={{ padding: "30px" }}>
      <h2
        style={{
          textAlign: "center",
          padding: "0px 0px 15px 0px",
        }}
      >
        Update Your Profile Picture
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-0">
          <label htmlFor="avatar" className="form-label">
            Choose a file:
          </label>
          <input
            type="file"
            className="form-control"
            id="avatar"
            accept="image/*"
            onChange={handleFileChange}
            // required
          />
        </div>
        <div className="mb-3" style={{ color: "red" }}>
          {errorMessage || ""}
        </div>
        <button
          type="submit"
          style={{ backgroundColor: "rgb(70, 135, 70)" }}
          className="btn btn-primary"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default AvatarSection;
