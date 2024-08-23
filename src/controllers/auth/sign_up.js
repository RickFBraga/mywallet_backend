import bcrypt from "bcrypt";
import { cadastroSchema } from "../../schemas/auth_schemas.js";
import { db } from "../../database/database.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const dadosCadastro = { name, email, password };

  const validation = cadastroSchema.validate(dadosCadastro, {
    abortEarly: false,
  });

  if (validation.error) {
    return res.status(422).send("Unprocessable Entity");
  }

  try {
    const emailExistente = await db
      .collection("cadastros")
      .findOne({ email: dadosCadastro.email });
    if (emailExistente) {
      return res.status(409).send("Conflict");
    }
    await db.collection("cadastros").insertOne({
      ...dadosCadastro,
      password: bcrypt.hashSync(dadosCadastro.password, 10),
    });
    console.log("Cadastro efetuado com sucesso!");
    res.status(201).send("Created");
  } catch (err) {
    console.log(err.message);
  }
}
