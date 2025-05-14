import axios from "axios";

export const baseApiCall = async (
  method: string,
  url: string,
  data = {},
  params = {},
  headers = {}
) => {
  try {
    const response = await axios({
      method: method, // HTTP method (GET, POST, PUT, DELETE, etc.)
      url: url, // API endpoint
      data: data, // Data for POST/PUT requests
      params: params, // Query parameters for GET requests
      headers: headers, // Optional headers (like authentication tokens)
      timeout: 10000, // Optional timeout
    });

    // Handle the success response
    return response.data;
  } catch (error: any) {
    // Error handling (you can log it or customize it as per your requirements)
    console.error(
      "API call error:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throwing the error to be handled by the caller
  }
};
