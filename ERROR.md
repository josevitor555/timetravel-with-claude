PS C:\Users\jocil\Downloads\chronos\chronos> npm start

> chronos-time-machine@1.0.0 start
> node server.js


╔══════════════════════════════════════════╗
║   CHRONOS — Máquina do Tempo             ║
║   http://localhost:3000                  ║
╚══════════════════════════════════════════╝

OpenRouter Error: SDKValidationError: Input validation failed: [
  {
    "expected": "object",
    "code": "invalid_type",
    "path": [
      "chatGenerationParams"
    ],
    "message": "Invalid input: expected object, received undefined"
  }
]
    at safeParse (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/lib/schemas.js:34:20)
    at $do (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:18:20)
    ... 6 lines matching cause stack trace ...
    at Layer.handle [as handle_request] (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\layer.js:95:5)       
    at C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\index.js:284:15 {
  cause: ZodError: [
    {
      "expected": "object",
      "code": "invalid_type",
      "path": [
        "chatGenerationParams"
      ],
      "message": "Invalid input: expected object, received undefined"
    }
  ]
      at file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:18:109
      at safeParse (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/lib/schemas.js:31:19)
      at $do (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:18:20)
      at chatSend (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:15:27)
      at Chat.send (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/sdk/chat.js:10:28)
      at file:///C:/Users/jocil/Downloads/chronos/chronos/server.js:38:46
      at Layer.handle [as handle_request] (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\layer.js:95:5)     
      at next (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\route.js:149:13)
      at Route.dispatch (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\route.js:119:3)
      at Layer.handle [as handle_request] (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\layer.js:95:5),    
  rawValue: {
    model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
    messages: [ [Object] ]
  },
      at $do (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:18:20)
      at chatSend (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:15:27)
      at Chat.send (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/sdk/chat.js:10:28)
      at file:///C:/Users/jocil/Downloads/chronos/chronos/server.js:38:46
      at Layer.handle [as handle_request] (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\layer.js:95:5)     
      at next (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\route.js:149:13)
      at Route.dispatch (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\route.js:119:3)
      at Layer.handle [as handle_request] (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\layer.js:95:5),    
  rawValue: {
    model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
      at $do (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:18:20)
      at chatSend (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:15:27)
      at Chat.send (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/sdk/chat.js:10:28)
      at file:///C:/Users/jocil/Downloads/chronos/chronos/server.js:38:46
      at Layer.handle [as handle_request] (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\layer.js:95:5)     
      at next (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\route.js:149:13)
      at $do (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:18:20)
      at chatSend (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:15:27)
      at Chat.send (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/sdk/chat.js:10:28)
      at file:///C:/Users/jocil/Downloads/chronos/chronos/server.js:38:46
      at $do (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:18:20)
      at chatSend (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:15:27)
      at Chat.send (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/sdk/chat.js:10:28)
      at $do (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:18:20)
      at $do (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:18:20)
      at chatSend (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/chatSend.js:15:27)
      at Chat.send (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/sdk/chat.js:10:28)
      at file:///C:/Users/jocil/Downloads/chronos/chronos/server.js:38:46
      at Layer.handle [as handle_request] (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\layer.js:95:5)     
      at next (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\route.js:149:13)
      at Route.dispatch (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\route.js:119:3)
      at Layer.handle [as handle_request] (C:\Users\jocil\Downloads\chronos\chronos\node_modules\express\lib\router\layer.js:95:5),    
  rawValue: {
    model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
    messages: [ [Object] ]
  },
  rawMessage: 'Input validation failed'
}