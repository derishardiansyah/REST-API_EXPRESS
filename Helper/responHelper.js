const responseHelper = (res, status, data, message) => {
  const response = {
    status: status === 500 ? "Error" : "Success",
    statusCode: status,
    message: status === 500 ? "Internal Server Error" : message,
  };

  if (data) {
    response.data = data;
  }

  if (status === 500 || status === 404 || status === 401 || status === 400) {
    const errorMessage =
      status === 404 ? "Resource Not Found" : response.message;
    console.log(errorMessage, "error");
    return res.status(status).json({
      status: "Error",
      statusCode: status,
      message: errorMessage,
    });
  }

  return res.status(status).json(response);
};

export default responseHelper;
