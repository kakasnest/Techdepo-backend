import jwt from "jsonwebtoken";

const authMW = async (req, res, next) => {
  const token = req.cookies.auth;
  const {
    env: { TOKEN_SECRET },
  } = process;

  try {
    const { userId } = jwt.verify(token, TOKEN_SECRET);
    req.user = userId;
    next();
  } catch (err) {
    next(err);
  }
};

export default authMW;
