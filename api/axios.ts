import axios from "axios";

const api = axios.create({
    baseURL: "https://warcraft-grain-glow-resistant.trycloudflare.com",
});

export default api;