import * as gemini from './gemini-client.js';
import * as openai from './openai-client.js';
function client(provider='gemini'){if(provider==='gemini')return gemini;if(provider==='openai')return openai;throw new Error('未知的 AI 服務商');}
export function generate(config,prompt,signal,fetcher=fetch){return client(config.provider).generate(config,prompt,signal,fetcher)}
export function listModels(key,signal,provider='gemini'){return client(provider).listModels(key,signal)}
