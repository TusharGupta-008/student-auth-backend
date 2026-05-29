// import User from "../models/user.model.js";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

// const signUp = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         message: "Send all the details",
//       });
//     }
//     const existingEmail = await User.findOne({ email });
//     if (existingEmail) {
//       return res.status(400).json({
//         message: "Duplicate Email can not exist",
//       });
//     }
//     const hashedPass = await bcryptjs.hash(password, 10);

//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPass,
//     });
//     const token = jwt.sign(
//       {
//         id: newUser._id,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "5d" },
//     );

//     res.status(201).json({
//       message: "New User Created.",
//       token,
//       newUser: {
//         name,
//         email,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal Server error",
//       error: error,
//     });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       res.status(400).json({
//         message: "Send all the details",
//       });
//     }
//     const existingEmail = await User.findOne({ email });
//     if (!existingEmail) {
//       return res.status(400).json({
//         message: "Invalid Email",
//       });
//     }
//     const compare = await bcryptjs.compare(password, existingEmail.password);
//     if (!compare) {
//       return res.status(400).json({
//         message: "Invalid password",
//       });
//     }
//     const token = jwt.sign({ id: existingEmail._id }, process.env.JWT_SECRET, {
//       expiresIn: "5d",
//     });
//     return res.status(200).json({
//       message: "Welcome Back",
//       token,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

// export { signUp, login };

import bycryptjs from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Send all details. ",
      });
    }

    const hashedPass = await bycryptjs.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
    });

    res.status(201).json({
      message: "User Created",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Details error",
        error,
      });
    }
    const existingEmail = await User.findOne({ email });

    if (!existingEmail) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    const pass = await bycryptjs.compare(password, existingEmail.password);
    if (!pass) {
      return res.status(400).json({
        message: "Password is wrong.",
      });
    }

    const token = jwt.sign(
      {
        id: existingEmail.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5d",
      },
    );

    return res.status(201).json({
      message: "Welcome back",
      token,
      user: {
        id: existingEmail._id,
        name: existingEmail.name,
        email: existingEmail.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

const profile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({
    message: "Profile fetched",
    user,
  });
};

export { signup, login, profile };
