import { Container } from './styles';

export function Input({ icon: Icon, ...rest }) {
	// recebe a propriedade icon com i minúsculo e converte passando para Icon com I maiúsculo para utilizá-lo como componente
  return (
		<Container>
			{Icon && <Icon size={20} />}
			<input {...rest} />
		</Container>
	) // se existir o ícone, mostre ele, caso contrário, não
}