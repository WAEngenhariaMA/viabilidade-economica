const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Lê a chave do Firebase a partir da variável de ambiente
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Inicializa o Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Rota para obter os projetos
app.get("/api/projetos", async (req, res) => {
  try {
    const snapshot = await db.collection("projetos").get();
    const dados = [];

    snapshot.forEach((doc) => {
      dados.push({ id: doc.id, ...doc.data() });
    });

    res.json(dados);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}/api/projetos`);
});
