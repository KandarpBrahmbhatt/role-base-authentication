import Role from "../model/role.model.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

// create user(Admin only)
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body)
    const hashPassword = await bcrypt.hash(password, 10);


    const role = await Role.findOne({ name: "customer" });

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role: role._id,
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

//  read all (Admin + User)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role", "name");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

//  UPDATE USER (Admin only)
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );

    res.json({ message: "User updated", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update error" });
  }
};

//  DELETE USER (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete error" });
  }
};