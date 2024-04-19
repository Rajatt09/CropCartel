import axios from "axios";
import Cookies from "js-cookie";

async function ApiCall(url, httpMethod, data) {
  const token = Cookies.get("AccessToken");
  //   console.log("Inside Apicall for ", url);
  try {
    if (httpMethod === "GET") {
      const response = await axios.get(url, data);

      return response;
    } else if (httpMethod === "POST") {
      //   console.log("Data Being Sent : ", data);

      const response = await axios.post(url, data);

      return response;
    }
  } catch (error) {
    console.error("Error in API call:", error);
    if (error.response) {
      const errorMessage = error.response.data.message;
      if (errorMessage === "Unauthorized request" || "Invalid Access Token") {
        console.error("Error from backend:", errorMessage);
        window.location.href = "/";
      }
      // console.error("Error from backend:", errorMessage);
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Error:", error.message);
    }
  }
}

export default ApiCall;
