// Rotas da autenticação - acessíveis quando o usuário não estiver logado (telas de login e cadastro)

import { Routes, Route } from 'react-router-dom';

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export function AuthRoutes() {
  return (
		<Routes>
			<Route path="/" element={<SignIn />} />
			<Route path="/register" element={<SignUp />} />
		</Routes>
	) 
}
