import jwt from "jsonwebtoken";

const authMW = async (req, res, next) => {
  const token = req.cookies.auth;
  const secret = process.env.TOKEN_SECRET;

  try {
    const { userId } = jwt.verify(token, secret);
    req.user = userId;
    next();
  } catch (err) {
    next(err);
  }
};

export default authMW;
