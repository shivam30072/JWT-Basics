const jwt = require("jsonwebtoken");
const customError = require("../errors/custom-error");

const authMiddleware = (req, res, next) => {
  // extracting token from  req:{headers: {authorization: Bearer token}}
  const authHeaders = req.headers.authorization;

  // creating an array of the token string ["bearer", "token"]
  const authArray = authHeaders.split(" ");

  // if authHeaders is not present or authArray does not include token then throw error
  if (!authHeaders || authArray.includes(null)) {
    throw new customError("authorization credentials were not provided", 401);
  }

  // token = [0-> Bearer, 1->token]
  const token = authArray[1];

  try {
    // decoded the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decodedToken;

    req.user = { id, username };
    next();
  } catch (error) {
    throw new customError("Not authorized to access this route", 401);
  }
};

module.exports = authMiddleware;
