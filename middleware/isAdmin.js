// // Roll base Access controll Authentication

// const isAdmin = (req, res, next) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     //  prevent crash if role not populated
//     if (!req.user.role || !req.user.role.name) {
//       return res.status(500).json({
//         message: "Role not loaded properly",
//       });
//     }

//     if (req.user.role.name !== "admin") {
//       return res.status(403).json({
//         message: "Access denied. Admin only",
//       });
//     }

//     next();
//   } catch (error) {
//     console.error("Admin Middleware Error:", error); // log real error
//     return res.status(500).json({
//       message: "Authorization error",
//       error: error.message, //  show real error
//     });
//   }
// };

// export default isAdmin

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userRole = req.user.role.name;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: `Access denied. Allowed roles: ${allowedRoles.join(", ")}`,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Authorization error" });
    }
  };
};

export default authorizeRoles;