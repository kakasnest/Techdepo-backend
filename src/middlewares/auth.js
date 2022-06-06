import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const {
    cookies: { auth: token },
  } = req;
  const {
    env: { TOKEN_SECRET: secret },
  } = process;

  try {
    const { userId } = jwt.verify(token, secret);
    req.userId = userId;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default auth;
