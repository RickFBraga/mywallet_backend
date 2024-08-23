import { db } from "../database/database.js";

export default async function transaction_list(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  if (!token) return res.status(401).send("Unauthorized");

  const page = req.query.page || 1;

  if (page <= 0) {
    return res.status(400).send("Bad Request");
  }

  const limit = 10;
  const start = (page - 1) * limit;

  try {
    const transactionsList = await db
      .collection("transactions")
      .find()
      .skip(start)
      .limit(limit)
      .toArray();

    res.send(transactionsList);
  } catch (err) {
    console.log(err.message);
  }
}
