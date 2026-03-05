# Playbook de Correções — OpenRouter + ElevenLabs

Este documento serve para **agentes e humanos** manterem estável a integração de IA do Chronos.

## 1) Bug crítico do OpenRouter (400 `invalid_prompt`)

### Sintoma
Erro no servidor:
- `ResponseValidationError`
- `invalid_prompt`
- `No input provided`

### Causa raiz
A chamada de `callModel` estava enviando `messages`, mas o endpoint de Responses da SDK espera `input`.

### Correção aplicada
- Endpoint `/ai/messages` agora envia `input` no formato aceito pela SDK.
- `prompt` é normalizado com `trim()` antes da chamada.
- Extração de texto mais robusta:
  - tenta `response.getText()`
  - fallback para `response.getResponse()` e `output_text`/`output[].content`
- Se vier resposta vazia, retorna erro explícito `OpenRouter empty response`.

### Checklist de diagnóstico futuro
1. Verifique `OPENROUTER_API_KEY` no ambiente.
2. Verifique se `prompt` chegou ao backend (`req.body.prompt`).
3. Valide se o modelo configurado em `OPENROUTER_MODEL` está disponível.
4. Em caso de erro intermitente, logar `statusCode`, `body` e modelo usado.

## 2) Voz dinâmica com ElevenLabs

### Objetivo
Evitar narração sempre com a mesma identidade vocal e melhorar a imersão por época histórica.

### Correção aplicada
- O frontend escolhe voz dinamicamente por faixa temporal (`VOICE_BY_ERA`).
- `fetchTTS(text, year)` envia `voiceId` + `modelId` para `/tts`.
- Backend aceita `voiceId`/`modelId` dinâmicos com fallback seguro para `ELEVEN_DEFAULT_VOICE_ID`.

### Estratégia atual de voz
- Até 500: voz A
- 501–1800: voz B
- 1801–1945: voz C
- 1946+ : voz D

> Ajuste os IDs conforme as vozes realmente disponíveis na conta ElevenLabs.

## 3) Melhorias sugeridas (próximos passos)

1. **Catálogo de vozes em endpoint dedicado**
   - Criar `GET /tts/voices` para listar vozes ativas da conta.
   - Permitir fallback automático para a primeira voz válida.

2. **Circuit breaker no OpenRouter**
   - Se falhar 3x em janela curta, usar resposta histórica local temporária.
   - Exibir aviso amigável no UI sem quebrar experiência.

3. **Validação de JSON do historiador no backend**
   - Em vez de confiar no frontend para `JSON.parse`, validar no servidor.
   - Retornar payload já estruturado `{ summary, facts, atmosphere }`.

4. **Observabilidade mínima**
   - Adicionar request id por viagem temporal.
   - Logar latência de OpenRouter e TTS separadamente.

5. **Cache por data histórica**
   - Chave por `day-month-year` para evitar custo repetido.
   - TTL curto (ex.: 24h) para respostas sem personalização por usuário.

## 4) Segurança operacional

- Nunca commitar chaves (`OPENROUTER_API_KEY`, `ELEVEN_API_KEY`).
- Rotacionar a chave se tiver sido exposta em logs.
- Em produção, limitar tamanho máximo de `prompt` e `text`.

## 5) Smoke test rápido

1. `npm start`
2. Fazer `POST /ai/messages` com `{"day":7,"month":9,"year":1822}` e validar `content[0].text`.
3. Fazer `POST /tts` com `{"text":"olá","voiceId":"<id válido>"}` e validar `audio/mpeg`.
4. Rodar fluxo completo no navegador e confirmar:
   - resumo histórico aparece;
   - narração toca;
   - voz muda entre anos distantes.

## 6) Contrato correto de IA no CHRONOS

- O frontend **não** envia prompt livre de usuário para IA.
- O frontend envia apenas parâmetros temporais (`day`, `month`, `year`).
- O backend monta internamente o prompt de sistema para geração do relatório histórico.
- Isso reduz erro de formato e mantém consistência editorial da experiência.
