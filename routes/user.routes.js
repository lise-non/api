const { login, register } = require("../controllers/user.controller");
const validationMiddlewares = require("../middlewares/validationMiddlewares");
const schema = require("../models/validationSchema");

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connecte un utilisateur existant et renvoie un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Succès - renvoie un token JWT au format Bearer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT au format Bearer
 *       401:
 *         description: Nom d'utilisateur ou mot de passe incorrect
 *
 * /register:
 *   post:
 *     summary: Crée un nouvel utilisateur dans la base de données
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       500:
 *         description: Erreur interne du serveur
 */

module.exports = function (app) {
  app.post("/login",validationMiddlewares(schema), login);
  app.post("/register", validationMiddlewares(schema), register);
};
