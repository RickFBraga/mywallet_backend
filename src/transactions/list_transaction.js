import { db } from "../database/database.js";

export default async function transaction_list(req, res) {
  const page = parseInt(req.query.page, 10) || 1;

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

    return res.status(200).json(transactionsList);
  } catch (err) {
    console.error("Error fetching transactions:", err.message);
    return res.status(500).send("Internal Server Error");
  }
}
