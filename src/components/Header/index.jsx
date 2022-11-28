import { RiShutDownLine } from 'react-icons/ri'; // importando botão de ligar
import { Container, Profile, Logout } from './styles';

export function Header() {
  return (
    <Container>
			<Profile to="/profile">
				<img 
					src="https://github.com/madalena-rocha.png" 
					alt="Foto do usuário" 
				/>

				<div>
					<span>Bem-vindo</span>
					<strong>Madalena Machado</strong>
				</div>
			</Profile>

			<Logout>
				<RiShutDownLine />
			</Logout>
    </Container>
  );
}