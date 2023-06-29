const customError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new customError("please provide email and password", 400);
  }

  // just for demo, normally provided by DB!!!
  const id = new Date().getDate();

  // payload should be small as possible for better user experience
  // jwt secret string should be long, complex and unguessable
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashBoard = async (req, res) => {
  // picking token from  req:{headers: {authorization: Bearer token}}
  const authHeaders = req.headers.authorization;

  // creating an array of the token string ["bearer", "token"]
  const authArray = authHeaders.split(" ").join(",");

  // if authHeaders is not present or authArray does not include token then throw error
  if (!authHeaders || authArray.includes(null)) {
    throw new customError("authorization credentials were not provided", 401);
  }
  const token = authArray[1];

  const luckyNumber = Math.round(Math.random() * 10);
  res.status(200).json({
    msg: "Hello, john cena",
    secret: `here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashBoard,
};
