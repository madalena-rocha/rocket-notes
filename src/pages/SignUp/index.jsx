import { useState } from "react"; // hook para criar estados
// capturar nome, e-mail e senha digitados pelo usuário e armazenar na memória para enviar para o back-end
// criar um estado para pegar a informação atualizada de acordo com o que o usuário digitou no momento
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { api } from "../../services/api";

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Form, Background } from './styles';

export function SignUp(){
	const [name, setName] = useState("");
	// dentro do () informa o valor inicial, nesse caso vazio porque quando abre a interface não tem nenhuma informação digitada
	// no vetor [] o useState entrega o estado e a função para atualizar o estado
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	function handleSignUp() {
		if (!name || !email || !password) {
			// garantir que nome, e-mail e senha foram preenchidos pelo usuário antes de prosseguir o cadastro
			return alert("Preencha todos os campos!");
		}

		setLoading(true);

		api.post("/users", { name, email, password })
			.then(() => {
				// o then é executado se deu tudo certo e o catch se algo deu errado
				alert("Usuário cadastrado com sucesso!");
				navigate("/");
				// após realizar o cadastro, levar para a tela de login
			})
			.catch(error => {
				if(error.response){
					// usando response porque no back-end foram criadas mensagens personalizadas de erro
					alert(error.response.data.message);
					// pegar a mensagem que o back-end está mandando
				} else {
					alert("Não foi possível cadastrar");
				}
			})
			.finally(() => setLoading(false));
	}
	
	return (
		<Container>
			<Background />

			<Form>
				<h1>Rocket Notes</h1>
				<p>Aplicação para salvar e gerenciar seus links úteis.</p>

				<h2>Crie sua conta</h2>

				<Input 
					placeholder="Nome"
					type="text"
					icon={FiUser}
					onChange={e => setName(e.target.value)}
				/>

				<Input 
					placeholder="E-mail"
					type="text"
					icon={FiMail}
					onChange={e => setEmail(e.target.value)}
				/>

				<Input 
					placeholder="Senha"
					type="password"
					icon={FiLock}
					onChange={e => setPassword(e.target.value)}
					// quando o valor do input muda, dispara um evento
					// capturar o evento através da variável e transferir para a função que atualiza o estado o que tem dentro do e
				/>

				<Button title="Cadastrar" onClick={handleSignUp} loading={loading} />

				<Link to="/">
					Voltar para o login
				</Link>
			</Form>
		</Container>
	);
}