import genToken from "../config/token.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs"

import Role from "../model/role.model.js";

export const sigup = async (req, resp) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return resp.status(400).json({ message: "All fields are required" });
    }

    // const role = await Role.findById(roleId);
        //  Find default role (user)
    // const role = await Role.findOne({ name: "customer" });

    //    if (!role) {
    //   return resp.status(500).json({ message: "Default role not found" });
    // }
let role = await Role.findOne({ name: "customer" });

if (req.body.role) {
  role = await Role.findOne({ name: req.body.role });
}
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return resp.status(400).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role: role._id,
    });

    const { token, refreshToken } = genToken(user);

    resp.cookie("token", token, { httpOnly: true });
    resp.cookie("refreshToken", refreshToken, { httpOnly: true });

    return resp.status(200).json({ message: "Signup success", user });
  } catch (error) {
    return resp.status(500).json({ message: "Signup error", error });
  }
};

export const login = async (req, resp) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        if (!email, !password) {
            return resp.status(400).json({ message: "All field Are required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return resp.status(400).json({ message: "user, Email not exist " })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return resp.status(400).json({ message: "Password is not mathched" })
        }
        // SET LOGIN STATUS  
        user.isLoggedIn = true;
        await user.save();
        const { token, refreshToken } = await genToken(user)
        console.log("Token is : ", token)
        console.log("Refresh Token is : ", refreshToken)

        // Access Token
        resp.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000 // 15 min
        })

        // Refresh Token
        resp.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        })

        return resp.status(200).json({ message: "Login Successfully", user, token, refreshToken })
    } catch (error) {
        console.log(`Login error ${error}`);
        return resp.status(500).json({ message: "Login error", error })
    }
}