import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  timeout: 500000,
  headers,
});

instance.interceptors.response.use(
  function (response) {
    response = { ...response, status: 200, statusCode: 200 };
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
          statusCode: 422,
        };
      }
      if (status === 404) {
        return {
          success: error.response.data.success,
          statusCode: 404,
          message: error.response.data.message,
          data: error.response.data.data,
        };
      }
      if (status === 400) {
        return {
          success: error.response.data.success,
          statusCode: 400,
          message: error.response.data.message,
          data: error.response.data.data,
        };
      }
      if (status === 403) {
        return {
          success: error.response.data.success,
          statusCode: 403,
          message: error.response.data.message,
          data: error.response.data.data,
        };
      }
    }

    // let customError = Promise.reject(error)
    return { error };
    // return { error: 'Unable to connect to the internet', statusCode: 500 }
  }
);
// Process response from api
function processResult(response) {
  let { statusCode } = response;
  if (response.statusCode) {
    if (statusCode === 200) {
      return {
        success: response.data.success,
        data: response.data.data,
        message: response.data.message,
      };
    } else if (statusCode === 500) {
      return { success: false, message: "Cannot connect to the internet" };
    } else if (statusCode === 404) {
      return response;
    } else if (statusCode === 400) {
      return response;
    }
    return { success: response.data?.status, message: response.data?.message };
  } else {
    return {
      message:
        "Oops, failed to load response. Please check your internet connection and try again.",
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
