# CHRONOS — Máquina do Tempo

Servidor Express + ElevenLabs (voz Alice) + narração automática.

## Pré-requisito
Node.js 18+ → https://nodejs.org

## Como rodar

```bash
cd chronos
npm install        # instala express + elevenlabs (só 1x)
npm start          # sobe em http://localhost:3000
```

## Estrutura
```
chronos/
  index.html   ← Frontend (Chronos UI)
  server.js    ← Express + ElevenLabsClient (Alice)
  package.json
```
