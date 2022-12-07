import { createContext, useContext, useState } from 'react'; // context api do React

import { api } from '../services/api';

export const AuthContext = createContext({}); // entre () valor padrão do contexto caso tenha

function AuthProvider({ children }) {
    const [data, setData] = useState({});

    async function signIn({ email, password }) { // função de autenticação
        // email e senha entre {} para poder passar essas informações independente da ordem
        try {
            const response = await api.post("/sessions", { email, password });
            const { user, token } = response.data;

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // inserindo um token do tipo bearer de autorização no cabeçalho por padrão de todas as requisições que o usuário fizer
            setData({ user, token });
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível entrar.");
            }
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, user: data.user }}>
            {children}
        </AuthContext.Provider>
    ) // children para inserir todas as rotas da aplicação
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };