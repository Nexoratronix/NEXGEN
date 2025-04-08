// import { kv } from "@vercel/kv";

// export async function setSession(sessionId, data) {
//   await kv.set(`sess:${sessionId}`, data, { ex: 24 * 60 * 60 }); // 1 day expiry
// }

// export async function getSession(sessionId) {
//   return await kv.get(`sess:${sessionId}`);
// }