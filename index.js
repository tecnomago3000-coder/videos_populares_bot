import fetch from "node-fetch";
import { VIDEOS } from "./publicaciones.js";

const TOKEN = process.env.TELEGRAM_VIDEO_BOT;

const GRUPOS = [
  process.env.TELEGRAM_GROUP_1,
  process.env.TELEGRAM_GROUP_2,
  process.env.TELEGRAM_GROUP_3,
  process.env.TELEGRAM_GROUP_4,
  process.env.TELEGRAM_GROUP_5,
  process.env.TELEGRAM_GROUP_6,
  process.env.TELEGRAM_GROUP_7
].filter(Boolean);

if (!TOKEN || GRUPOS.length === 0) {
  console.error("❌ Faltan variables de entorno");
  process.exit(1);
}

async function publicarVideo(videoUrl) {
  for (const chatId of GRUPOS) {
    try {
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: videoUrl,
          disable_web_page_preview: false
        })
      });

      console.log("🎬 Video publicado en:", chatId);
    } catch (e) {
      console.error("❌ Error en:", chatId, e);
    }

    // pausa entre grupos
    await new Promise(r => setTimeout(r, 1500));
  }
}

async function iniciar() {
  for (const video of VIDEOS) {
    await publicarVideo(video);

    // pausa entre videos
    await new Promise(r => setTimeout(r, 4000));
  }

  console.log("✅ Publicación de videos completada");
}

iniciar();
