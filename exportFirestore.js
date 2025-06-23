const fs = require("fs");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // renomeie seu JSON de credenciais para isso
const cron = require("node-cron");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function exportarProjetos() {
  const snapshot = await db.collection("projetos").get();
  const dados = [];

  snapshot.forEach((doc) => {
    dados.push({ id: doc.id, ...doc.data() });
  });

  fs.writeFileSync("projetos.json", JSON.stringify(dados, null, 2));
  console.log("Exportação concluída para projetos.json");
}

cron.schedule("*/5 * * * *", () => {
  exportarProjetos();
});
