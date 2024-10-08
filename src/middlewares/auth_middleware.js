import { db } from "../database/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function tokenValidate(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  if (!token) return res.status(401).send("Unauthorized");

  try {
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) return res.sendStatus(401);

      const authToken = await db.collection("sessions").findOne({ token });
      if (!authToken) return res.status(401).send("Unauthorized");

      const user = await db.collection("cadastros").findOne({
        _id: authToken.userId,
      });
      if (!user) return res.sendStatus(401);

      res.locals.user = user;
      next();
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
}
