const IP = import.meta.env.VITE_IP;
const SERVER = import.meta.env.VITE_SERVER;
export const CLIENT_BASE_AUTH = `${IP}/auth`
export const API_BASE = `${SERVER}`;
// console.log(API_BASE)
export const API_BASE_AUTH = `${API_BASE}/auth`;
export const API_BASE_TEST = `${API_BASE}/test`;