import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const {
    cookies: { adminAuth: token },
  } = req;
  const {
    env: { TOKEN_SECRET: secret },
  } = process;

  try {
    const { adminId } = jwt.verify(token, secret);
    req.adminId = adminId;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default adminAuth;
