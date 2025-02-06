import User from "../infrastructure/schemas/User.js";


export const createUser = async (req, res) => {
  const newUser = req.body;

  // add validation here
  if (!newUser.name || !newUser.email) {
    return res.status(404).send();
  }

  await User.create({
    name: newUser.name,
    email: newUser.email,
  })
  return res.status(201).send();
}

export const getAllUsers = async (req, res) => {
  const users = await User.find({})
  return res.status(200).json(users);
}

export const getUserById = async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId)
  if (!user) {
    return res.status(404).send();
  }
  return res.status(200).json(user);
}