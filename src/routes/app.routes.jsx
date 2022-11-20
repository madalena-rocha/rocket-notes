// Rotas da aplicação - acessíveis quando o usuário estiver logado na aplicação

import { Routes, Route } from 'react-router-dom';

import { New } from '../pages/New';
import { Home } from '../pages/Home';
import { Details } from '../pages/Details';
import { Profile } from '../pages/Profile';

export function AppRoutes() {
  return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/new" element={<New />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/details/:id" element={<Details />} />
		</Routes> // O Details precisa do código da nota para exibí-la, sendo necessário passar na rota o parâmetro id
	) 
}
