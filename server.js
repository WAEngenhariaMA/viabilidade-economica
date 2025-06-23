const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Lê o JSON da variável de ambiente (Render: Environment > GOOGLE_APPLICATION_CREDENTIALS)
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Inicializa o Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Endpoint para retornar os projetos
app.get("/api/projetos", async (req, res) => {
  try {
    const snapshot = await db.collection("projetos").get();
    const dados = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(dados);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});
