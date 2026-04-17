import jwt from "jsonwebtoken";

const genToken = (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role, // IMPORTANT
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { token, refreshToken };
};

export default genToken;