import jwt from "jsonwebtoken";

const isAuthorized = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    req.userId = null;
    return next();
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({
      success: false,
      authorized: false,
      message: "JWT_SECRET is not configured",
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
  } catch (error) {
    req.userId = null;

    res.clearCookie("token");
  }

  return next();
};

export default isAuthorized;