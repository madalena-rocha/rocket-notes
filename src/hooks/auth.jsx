import { createContext, useContext, useState, useEffect } from 'react'; // context api do React

import { api } from '../services/api';

export const AuthContext = createContext({}); // entre () valor padrão do contexto caso tenha

function AuthProvider({ children }) {
    const [data, setData] = useState({});

    function signOut() {
        // remover do local storage as informações armazenadas
        localStorage.removeItem("@rocketnotes:token");
        localStorage.removeItem("@rocketnotes:user");

        // retornar o estado como um objeto vazio, refletindo nas rotas e levando para o AuthRoutes
        setData({});
    }

    async function signIn({ email, password }) { // função de autenticação
        // email e senha entre {} para poder passar essas informações independente da ordem
        try {
            const response = await api.post("/sessions", { email, password });
            const { user, token } = response.data;

            // evitar que mesmo com o usuário autentivcado a aplicação volte para a tela de login ao atualizar a página
            // até agora, os dados do usuário autenticado estão guardados num estado, que é recarregado com o reload da página
            // armazenar essas informações no storage do navegador
            // buscar essas informações no local storage quando o usuário recarregar a página e preencher o estado para refletir nos lugares que estão usando o estado
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user)); // JSON.stringify para converter o objeto em texto
            localStorage.setItem("@rocketnotes:token", token);

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

    useEffect(() => {
        const token = localStorage.getItem("@rocketnotes:token");
        const user = localStorage.getItem("@rocketnotes:user");

        if(token && user) {
            // garantir que tanto o token quanto o usuário tenham sido informados
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({
                token,
                user: JSON.parse(user)
                // pegando os dados do usuário armazenados em formato de texto e retornando para um objeto do tipo JSON
            });
        }
    }, []);
    // a primeira parte é uma arrow function, correspondendo ao que deseja executar após a renderização do componente
    // a segunda parte é um vetor que pode colocar um estado, e quando esse estado mudar, dispara o useEffect novamente
    // vetor de dependências vazio, será carregado uma vez após a renderização do componente

    return (
        <AuthContext.Provider value={{ 
            signIn, 
            signOut,
            user: data.user, 
        }}
        >
            {children}
        </AuthContext.Provider>
    ) // children para inserir todas as rotas da aplicação
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };