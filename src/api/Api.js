import axios from "axios";

// const headers = {
//   "Content-Type": "application/json",
// };

const instance = axios.create({
  timeout: 500000,
//   headers,
});

instance.interceptors.response.use(
  function (response) {
    response = { ...response, status: 200 };
    return response;
  },
  function (error) {
    if (error.response) {
      let status = error.response.status;

      if (status === 422) {
        return {
          error: error.response.data.error
            ? error.response.data.error
            : error.response.data,
          status: 422,
        };
      }
      if (status === 404) {
        return {
          success: error.response.data.success,
          status: 404,
          message: error.response.data.message,
          data: error.response.data.data,
        };
      }
      if (status === 400) {
        return {
          success: error.response.data.success,
          status: 400,
          message: error.response.data.message,
          data: error.response.data.data,
        };
      }
      if (status === 403) {
        return {
          success: error.response.data.success,
          status: 403,
          message: error.response.data.message,
          data: error.response.data.data,
        };
      }
    }

    // let customError = Promise.reject(error)
    return { error };
    // return { error: 'Unable to connect to the internet', status: 500 }
  }
);
// Process response from api
function processResult(response) {
  let { status } = response;
  if (response.status) {
    if (status === 200) {
      return {
        success: true,
        data: response.data,
        message: "Successful",
      };
    } else if (status === 500) {
      return { success: false, message: "Cannot connect to the internet" };
    } else if (status === 404) {
      return response;
    } else if (status === 400) {
      return response;
    }
    return { success: false, message: "Something went wrong. Try again." };
  } else {
    return {
      message:
        "Failed to load response. Please check your internet connection and try again.",
      success: false,
    };
  }
}
// Handle api calls
async function getFermentorEvents(data) {
  let results = await instance.get(data);
  return processResult(results);
}

export { getFermentorEvents };
