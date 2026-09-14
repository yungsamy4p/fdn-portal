// Reemplaza esta URL con la Webhook de tu canal en Discord
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1549160935011127407/d0Tx7icC44tqc3a8awAAUHRXLZXt-iEGn9eSgawlP5mruHrWxtpTS_2sdJgDumq2Qlg5";

document.getElementById('enlistForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  const statusMsg = document.getElementById('statusMessage');

  const callsign = document.getElementById('callsign').value;
  const discord = document.getElementById('discord').value;
  const division = document.getElementById('division').value;
  const motivation = document.getElementById('motivation').value;

  submitBtn.disabled = true;
  submitBtn.innerText = "ENVIANDO REPORTE CIFRADO...";
  statusMsg.innerText = "";

  const payload = {
    username: "CENTRAL DE COMANDO FDN",
    avatar_url: "https://cdn.discordapp.com/attachments/1543495355318927392/1545704842108866630/logofdnnewgen2.png", 
    embeds: [
      {
        title: "📄 NUEVA SOLICITUD DE ENLISTAMIENTO RECIBIDA",
        color: 0x4b5320, 
        fields: [
          { name: "🪖 Callsign / Identificador", value: `\`${callsign}\``, inline: true },
          { name: "📡 Contacto Discord", value: `\`${discord}\``, inline: true },
          { name: "🎯 División Solicitada", value: division, inline: false },
          { name: "📝 Declaración / Experiencia", value: motivation, inline: false }
        ],
        footer: {
          text: "FDN Tactical Systems // Registro Automático"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      statusMsg.style.color = "#55ff55";
      statusMsg.innerText = "TRANSMISIÓN EXITOSA: Su expediente ha llegado al Alto Mando.";
      document.getElementById('enlistForm').reset();
    } else {
      throw new Error("Fallo en la respuesta del servidor");
    }
  } catch (error) {
    statusMsg.style.color = "#ff5555";
    statusMsg.innerText = "ERROR CRÍTICO: No se pudo enlazar con la base central.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "TRANSMITIR EXPEDIENTE";
  }
});