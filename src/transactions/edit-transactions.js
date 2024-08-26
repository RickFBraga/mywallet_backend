import { ObjectId } from "mongodb";
import { transactionSchema } from "../schemas/auth_schemas.js";
import { db } from "../database/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function editTransactions(req, res) {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  if (!token) return res.status(401).send("Unauthorized");

  const { value, description, type } = req.body;
  const transactionData = { value, description, type };

  const validation = transactionSchema.validate(transactionData, {
    abortEarly: false,
  });

  if (validation.error) {
    return res.status(422).json({
      error: "Unprocessable Entity",
      details: validation.error.details.map((err) => err.message),
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log("User ID from token:", userId);

    const session = await db.collection("sessions").findOne({
      userId: new ObjectId(userId),
    });

    if (!session) {
      return res.status(404).json({ error: "Not Found" });
    }

    if (session.userId.toString() !== userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await db
      .collection("transactions")
      .updateOne({ _id: new ObjectId(id) }, { $set: transactionData });

    return res.status(204).send();
  } catch (err) {
    console.error("Error during transaction update:", err.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
}
