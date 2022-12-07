import { createContext, useContext } from 'react'; // context api do React

export const AuthContext = createContext({}); // entre () valor padrão do contexto caso tenha

function AuthProvider({ children }) {
    return (
        <AuthContext.Provider value={{ name: "Madalena", email: "madalena@gmail.com" }}>
            {children}
        </AuthContext.Provider>
    ) // children para inserir todas as rotas da aplicação
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };