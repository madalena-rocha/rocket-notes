import { Container } from './styles';

export function ButtonText({ title, isActive = false, ...rest }){
	// o valor padrão da propriedade isActive caso não seja informado é false
  	return (
		<Container 
			type="button" 
			isActive={isActive}
			{...rest}
		>
			{title}
		</Container>
	);
}