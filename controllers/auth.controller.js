import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Send all the details",
      });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Duplicate Email can not exist",
      });
    }
    const hashedPass = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
    });
    const token = jwt.sign(
      {
        id: newUser.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5d" },
    );

    res.status(201).json({
      message: "New User Created.",
      token,
      newUser: {
        name,
        email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      error: error,
    });
  }
};
export default signUp;
