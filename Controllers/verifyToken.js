import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      status: "error",
      statusCode: 403,
      message: "Token tidak valid atau kadaluwarsa",
    });
  }

  jwt.verify(token, process.env.secretLogin, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Token tidak valid atau kadaluwarsa",
      });
    }
    req.user = decoded;
    next();
  });
};

export default verifyToken;
