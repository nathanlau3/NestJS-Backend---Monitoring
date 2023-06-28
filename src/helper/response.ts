import {Request, Response} from 'express'
module.exports = (
  res: Response,
  isSuccess = true,
  responseMessage = "Success",
  data = null,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    isSuccess,
    statusCode,
    responseMessage,
    data,
  });
};
