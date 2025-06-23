// index.js
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Caminho absoluto do arquivo de credenciais (para evitar erro no Render)
const serviceAccount = require("./serviceAccountKey.json");

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Rota para buscar os projetos do Firestore
app.get("/projetos", async (req, res) => {
  try {
    const snapshot = await db.collection("projetos").get();
    const dados = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(dados);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ erro: "Erro ao buscar dados do Firebase" });
  }
});

// Porta para rodar localmente ou no Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API rodando na porta ${PORT}`));
