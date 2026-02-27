import jwt from "jsonwebtoken";

const isAuthorized = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        authorized: false,
        message: "Unauthorized",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        authorized: false,
        message: "JWT_SECRET is not configured",
      });
    }

    const decoded = jwt.verify(token, jwtSecret);

    if (!decoded?.userId) {
      return res.status(401).json({
        success: false,
        authorized: false,
        message: "Invalid token payload",
      });
    }

    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      authorized: false,
      message: "Unauthorized",
    });
  }
};

export default isAuthorized;
