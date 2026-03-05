PS C:\Users\jocil\Downloads\chronos\chronos> npm start

> chronos-time-machine@1.0.0 start
> node server.js


╔══════════════════════════════════════════╗
║   CHRONOS — Máquina do Tempo             ║
║   http://localhost:3000                  ║
╚══════════════════════════════════════════╝

Error getting text from OpenRouter response: ResponseValidationError: Response validation failed
    at safeParseResponse (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/lib/matchers.js:196:20)    
    at matchFunc (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/lib/matchers.js:168:28)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async $do (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/betaResponsesSend.js:93:22) {
  statusCode: 400,
  body: '{"error":{"code":"invalid_prompt","message":"No input provided"},"metadata":null}',
  headers: Headers {
    date: 'Thu, 05 Mar 2026 14:09:46 GMT',
    'content-type': 'application/json',
    'transfer-encoding': 'chunked',
    connection: 'keep-alive',
    'access-control-allow-origin': '*',
    'permissions-policy': 'payment=(self "https://checkout.stripe.com" "https://connect-js.stripe.com" "https://js.stripe.com" "https://*.js.stripe.com" "https://hooks.stripe.com")',
    'referrer-policy': 'no-referrer, strict-origin-when-cross-origin',
    'x-content-type-options': 'nosniff',
    server: 'cloudflare',
    'cf-ray': '9d79b3492df2d167-GIG'
  },
  contentType: 'application/json',
  rawResponse: Response {
    status: 400,
    statusText: 'Bad Request',
    headers: Headers {
      date: 'Thu, 05 Mar 2026 14:09:46 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'keep-alive',
      'access-control-allow-origin': '*',
      'permissions-policy': 'payment=(self "https://checkout.stripe.com" "https://connect-js.stripe.com" "https://js.stripe.com" "https://*.js.stripe.com" "https://hooks.stripe.com")',
      'referrer-policy': 'no-referrer, strict-origin-when-cross-origin',
      'x-content-type-options': 'nosniff',
      server: 'cloudflare',
      'cf-ray': '9d79b3492df2d167-GIG'
    },
    body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
    bodyUsed: true,
    ok: false,
    redirected: false,
    type: 'basic',
    url: 'https://openrouter.ai/api/v1/responses'
  },
  cause: ZodError: [
    {
      "expected": "number",
      "code": "invalid_type",
      "path": [
        "error",
        "code"
      ],
      "message": "Invalid input: expected number, received string"
    }
  ]
      at safeParseResponse.request.request (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/lib/matchers.js:168:74)
      at safeParseResponse (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/lib/matchers.js:193:19)  
      at matchFunc (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/lib/matchers.js:168:28)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async $do (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/betaResponsesSend.js:93:22),
  rawValue: {
    HttpMeta: {
      Response: Response {
        status: 400,
        statusText: 'Bad Request',
        headers: Headers {
          date: 'Thu, 05 Mar 2026 14:09:46 GMT',
          'content-type': 'application/json',
          'transfer-encoding': 'chunked',
          connection: 'keep-alive',
          'access-control-allow-origin': '*',
          'permissions-policy': 'payment=(self "https://checkout.stripe.com" "https://connect-js.stripe.com" "https://js.stripe.com" "https://*.js.stripe.com" "https://hooks.stripe.com")',
          'referrer-policy': 'no-referrer, strict-origin-when-cross-origin',
          'x-content-type-options': 'nosniff',
          server: 'cloudflare',
          'cf-ray': '9d79b3492df2d167-GIG'
        },
        body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
        bodyUsed: true,
        ok: false,
        redirected: false,
        type: 'basic',
        url: 'https://openrouter.ai/api/v1/responses'
      },
      Request: Request {
        method: 'POST',
        url: 'https://openrouter.ai/api/v1/responses',
        headers: Headers {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          authorization: 'Bearer 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',
          cookie: '',
          'user-agent': 'speakeasy-sdk/typescript 0.9.11 2.788.4 1.0.0 @openrouter/sdk'
        },
        destination: '',
        referrer: 'about:client',
        referrerPolicy: '',
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default',
        redirect: 'follow',
        integrity: '',
        keepalive: false,
        isReloadNavigation: false,
        isHistoryNavigation: false,
        signal: AbortSignal { aborted: false }
      }
    },
    error: { code: 'invalid_prompt', message: 'No input provided' },
    metadata: null,
    'request$': Request {
      method: 'POST',
      url: 'https://openrouter.ai/api/v1/responses',
      headers: Headers {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
        authorization: 'Bearer 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',
        cookie: '',
        'user-agent': 'speakeasy-sdk/typescript 0.9.11 2.788.4 1.0.0 @openrouter/sdk'
      },
      destination: '',
      referrer: 'about:client',
      referrerPolicy: '',
      mode: 'cors',
      credentials: 'same-origin',
      cache: 'default',
      redirect: 'follow',
      integrity: '',
      keepalive: false,
      isReloadNavigation: false,
      isHistoryNavigation: false,
      signal: AbortSignal { aborted: false }
    },
    'response$': Response {
      status: 400,
      statusText: 'Bad Request',
      headers: Headers {
        date: 'Thu, 05 Mar 2026 14:09:46 GMT',
        'content-type': 'application/json',
        'transfer-encoding': 'chunked',
        connection: 'keep-alive',
        'access-control-allow-origin': '*',
        'permissions-policy': 'payment=(self "https://checkout.stripe.com" "https://connect-js.stripe.com" "https://js.stripe.com" "https://*.js.stripe.com" "https://hooks.stripe.com")',
        'referrer-policy': 'no-referrer, strict-origin-when-cross-origin',
        'x-content-type-options': 'nosniff',
        server: 'cloudflare',
        'cf-ray': '9d79b3492df2d167-GIG'
      },
      body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
      bodyUsed: true,
      ok: false,
      redirected: false,
      type: 'basic',
      url: 'https://openrouter.ai/api/v1/responses'
    },
    'body$': '{"error":{"code":"invalid_prompt","message":"No input provided"},"metadata":null}'
  },
  rawMessage: 'Response validation failed'
}
Error getting full response: ResponseValidationError: Response validation failed
    at safeParseResponse (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/lib/matchers.js:196:20)    
    at matchFunc (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/lib/matchers.js:168:28)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async $do (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/betaResponsesSend.js:93:22) {
  statusCode: 400,
  body: '{"error":{"code":"invalid_prompt","message":"No input provided"},"metadata":null}',
  headers: Headers {
    date: 'Thu, 05 Mar 2026 14:09:46 GMT',
    'content-type': 'application/json',
    'transfer-encoding': 'chunked',
    connection: 'keep-alive',
    'access-control-allow-origin': '*',
    'permissions-policy': 'payment=(self "https://checkout.stripe.com" "https://connect-js.stripe.com" "https://js.stripe.com" "https://*.js.stripe.com" "https://hooks.stripe.com")',
    'referrer-policy': 'no-referrer, strict-origin-when-cross-origin',
    'x-content-type-options': 'nosniff',
    server: 'cloudflare',
    'cf-ray': '9d79b3492df2d167-GIG'
  },
  contentType: 'application/json',
  rawResponse: Response {
    status: 400,
    statusText: 'Bad Request',
    headers: Headers {
      date: 'Thu, 05 Mar 2026 14:09:46 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'keep-alive',
      'access-control-allow-origin': '*',
      'permissions-policy': 'payment=(self "https://checkout.stripe.com" "https://connect-js.stripe.com" "https://js.stripe.com" "https://*.js.stripe.com" "https://hooks.stripe.com")',
      'referrer-policy': 'no-referrer, strict-origin-when-cross-origin',
      'x-content-type-options': 'nosniff',
      server: 'cloudflare',
      'cf-ray': '9d79b3492df2d167-GIG'
    },
    body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
    bodyUsed: true,
    ok: false,
    redirected: false,
    type: 'basic',
    url: 'https://openrouter.ai/api/v1/responses'
  },
  cause: ZodError: [
    {
      "expected": "number",
      "code": "invalid_type",
      "path": [
        "error",
        "code"
      ],
      "message": "Invalid input: expected number, received string"
    }
  ]
      at safeParseResponse.request.request (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/lib/matchers.js:168:74)
      at safeParseResponse (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/lib/matchers.js:193:19)  
      at matchFunc (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/lib/matchers.js:168:28)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async $do (file:///C:/Users/jocil/Downloads/chronos/chronos/node_modules/@openrouter/sdk/esm/funcs/betaResponsesSend.js:93:22),
  rawValue: {
    HttpMeta: {
      Response: Response {
        status: 400,
        statusText: 'Bad Request',
        headers: Headers {
          date: 'Thu, 05 Mar 2026 14:09:46 GMT',
          'content-type': 'application/json',
          'transfer-encoding': 'chunked',
          connection: 'keep-alive',
          'access-control-allow-origin': '*',
          'permissions-policy': 'payment=(self "https://checkout.stripe.com" "https://connect-js.stripe.com" "https://js.stripe.com" "https://*.js.stripe.com" "https://hooks.stripe.com")',
          'referrer-policy': 'no-referrer, strict-origin-when-cross-origin',
          'x-content-type-options': 'nosniff',
          server: 'cloudflare',
          'cf-ray': '9d79b3492df2d167-GIG'
        },
        body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
        bodyUsed: true,
        ok: false,
        redirected: false,
        type: 'basic',
        url: 'https://openrouter.ai/api/v1/responses'
      },
      Request: Request {
        method: 'POST',
        url: 'https://openrouter.ai/api/v1/responses',
        headers: Headers {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          authorization: 'Bearer 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',
          cookie: '',
          'user-agent': 'speakeasy-sdk/typescript 0.9.11 2.788.4 1.0.0 @openrouter/sdk'
        },
        destination: '',
        referrer: 'about:client',
        referrerPolicy: '',
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default',
        redirect: 'follow',
        integrity: '',
        keepalive: false,
        isReloadNavigation: false,
        isHistoryNavigation: false,
        signal: AbortSignal { aborted: false }
      }
    },
    error: { code: 'invalid_prompt', message: 'No input provided' },
    metadata: null,
    'request$': Request {
      method: 'POST',
      url: 'https://openrouter.ai/api/v1/responses',
      headers: Headers {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
        authorization: 'Bearer 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',
        cookie: '',
        'user-agent': 'speakeasy-sdk/typescript 0.9.11 2.788.4 1.0.0 @openrouter/sdk'
      },
      destination: '',
      referrer: 'about:client',
      referrerPolicy: '',
      mode: 'cors',
      credentials: 'same-origin',
      cache: 'default',
      redirect: 'follow',
      integrity: '',
      keepalive: false,
      isReloadNavigation: false,
      isHistoryNavigation: false,
      signal: AbortSignal { aborted: false }
    },
    'response$': Response {
      status: 400,
      statusText: 'Bad Request',
      headers: Headers {
        date: 'Thu, 05 Mar 2026 14:09:46 GMT',
        'content-type': 'application/json',
        'transfer-encoding': 'chunked',
        connection: 'keep-alive',
        'access-control-allow-origin': '*',
        'permissions-policy': 'payment=(self "https://checkout.stripe.com" "https://connect-js.stripe.com" "https://js.stripe.com" "https://*.js.stripe.com" "https://hooks.stripe.com")',
        'referrer-policy': 'no-referrer, strict-origin-when-cross-origin',
        'x-content-type-options': 'nosniff',
        server: 'cloudflare',
        'cf-ray': '9d79b3492df2d167-GIG'
      },
      body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
      bodyUsed: true,
      ok: false,
      redirected: false,
      type: 'basic',
      url: 'https://openrouter.ai/api/v1/responses'
    },
    'body$': '{"error":{"code":"invalid_prompt","message":"No input provided"},"metadata":null}'
  },
  rawMessage: 'Response validation failed'
}
Empty content received from OpenRouter