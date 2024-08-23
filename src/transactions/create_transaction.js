import { db } from "../database/database.js";
import { transactionSchema } from "../schemas/auth_schemas.js";

export default async function transaction(req, res) {
  const { value, description, type } = req.body;
  const transactionData = { value, description, type };

  const validation = transactionSchema.validate(transactionData, {
    abortEarly: false,
  });

  if (validation.error) {
    return res.status(422).send("Unprocessable Entity");
  }

  try {
    await db.collection("transactions").insertOne({
      ...transactionData,
      user: res.locals.user.name,
    });
    console.log("Transação enviada ao banco de dados!");
    return res.status(201).send("Transaction successfully created");
  } catch (err) {
    console.log(err.message);
  }
}
