import User from "../models/User.js";

export const deleteUser = async (req, res) => {
  try {
    await User.destroy(
      {
        where: {id: req.params.id}
      }
    )
    res.status(201).json("user has been deleted")
  } catch (err) {
    throw err
  }
}

export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
        where: {id: req.params.id},
      })
    res.status(200).json("user has been updated")
  } catch (err) {
    throw err
  }
}