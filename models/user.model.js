const mongoose = require("mongoose");

/**
 * @swagger
 *   models:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         size:
 *           type: string
 */
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", schema);

module.exports = User;
