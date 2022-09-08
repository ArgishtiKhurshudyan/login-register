import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {createError} from "../utils/error.js";
import jwt from "jsonwebtoken";
import chalk from "chalk";

export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    ...req.body,
    password: hash,
  });
  try {
    await newUser.save();
    res.status(200).send("User has been created ❤");

  } catch (err) {
    if (newUser.email)   res.status(403).json("email is already created")
    next(chalk.bgYellow(chalk.red(err)));
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne(
      {
        where: {email: req.body.email}
      });

    if (!user) return next(createError(404, "Email not found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!isPasswordCorrect)
      return next(createError(404, "Wrong password or email"));
    const token = jwt.sign(
      {id: user.id},
      process.env.JWT
    );

    const {password, ...otherDetails} = user._previousDataValues
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({details: {...otherDetails}});
  } catch (err) {
    next(err);
    console.log("catch", err)
  }
};