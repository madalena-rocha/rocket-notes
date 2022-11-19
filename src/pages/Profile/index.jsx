import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Form, Avatar } from "./styles";

export function Profile() {
	return (
		<Container>
			<header>
				<a href="/">
					<FiArrowLeft />
				</a>
			</header>

			<Form>
				<Avatar>
					<img 
						src="https://github.com/madalena-rocha.png"
						alt="Foto do usuário"
					/>

					<label htmlFor="avatar">
						<FiCamera />

						<input 
							// input invisível utilizado somente para abrir a janela de carregar imagem
							id="avatar"
							type="file"
						/>
					</label>
				</Avatar>
				
				<Input 
					placeholder="Nome"
					type="text"
					icon={FiUser}
				/>

				<Input 
					placeholder="E-mail"
					type="text"
					icon={FiMail}
				/>

				<Input 
					placeholder="Senha atual"
					type="password"
					icon={FiLock}
				/>

				<Input 
					placeholder="Senha atual"
					type="password"
					icon={FiLock}
				/>

				<Button title="Salvar" />
			</Form>
		</Container>
	)
}