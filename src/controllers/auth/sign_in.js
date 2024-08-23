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
    return res.status(422).send("Unprocessable Entity");
  }

  try {
    const user = await db
      .collection("cadastros")
      .findOne({ email: dadosLogin.email });

    if (!user) {
      return res.status(404).send("Not Found");
    }

    const passwordMatch = bcrypt.compareSync(
      dadosLogin.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).send("Unauthorized");
    } else {
      const token = jwt.sign({}, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400,
      });

      const session = {
        token,
        userId: user._id,
      };
      await db.collection("sessions").insertOne(session);
      return res.send(token);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
}
