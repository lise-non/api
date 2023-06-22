const db = require("../models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = db.user;

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Trouver l'utilisateur correspondant au nom d'utilisateur donné
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).send("Nom d'utilisateur ou mot de passe incorrect");
  }

  // Vérifier si le mot de passe correspond au hash stocké
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).send("Nom d'utilisateur ou mot de passe incorrect");
  }

  // Si le nom d'utilisateur et le mot de passe sont corrects, générer un token JWT
  const token = jwt.sign({ userId: user._id }, "secretKey", {
    expiresIn: "1h",
  });

  // Envoyer le token JWT au format Bearer
  res.status(200).json({ token: token });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).send("Utilisateur créé avec succès");
};

exports.resetPassword = async(res, req) =>{
  const { username, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
  });

  await user.updateOne(user._id)

  res.status(204).send("mot de pass mis à jour");
};