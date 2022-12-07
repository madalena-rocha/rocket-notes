// Configurações do axios

import axios from "axios"; // para trabalhar com requisições HTTP

export const api = axios.create({
    baseURL: "http://localhost:3333"
});