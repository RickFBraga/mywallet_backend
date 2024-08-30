import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { loginSchema } from "../../schemas/auth_schemas.js";
import { db } from "../../database/database.js";

dotenv.config();

export async function signIn(req, res) {
  const { email, password } = req.body;
  const dadosLogin = { email, password };

  const validation = loginSchema.validate(dadosLogin, {
    abortEarly: false,
  });

  if (validation.error) {
    return res.status(422).json({
      error: "Unprocessable Entity",
      details: validation.error.details.map((err) => err.message),
    });
  }

  try {
    const user = await db.collection("cadastros").findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    await db.collection("sessions").insertOne({ token, userId: user._id });

    return res.status(200).json({ token });
  } catch (err) {
    console.error("Error during sign-in:", err.message);
    return res.status(500).send("Internal Server Error");
  }
}
