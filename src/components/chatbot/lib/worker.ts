import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

// Only execute in worker environment
if (typeof self !== 'undefined' && typeof importScripts !== 'undefined') {
  const handler = new WebWorkerMLCEngineHandler();

  self.onmessage = (msg: MessageEvent) => {
      handler.onmessage(msg);
  };
}
