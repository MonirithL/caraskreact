const IP = import.meta.env.VITE_IP;
export const CLIENT_BASE_AUTH = `http://${IP}:5173/auth`
export const API_BASE = `http://${IP}:3000`;
// console.log(API_BASE)
export const API_BASE_AUTH = `${API_BASE}/auth`;
export const API_BASE_TEST = `${API_BASE}/test`;