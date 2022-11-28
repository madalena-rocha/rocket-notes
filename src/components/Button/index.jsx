import { Container } from './styles';

export function Button({ title, loading = false, ...rest }) {
	// loading = false: caso a propriedade loading não seja informada, definir o valor padrão false
	// ...rest: qualquer outras propriedades que não estejam explícitas aqui, mas tenham sido informadas em <Button /> serão inseridas no componente
  return(
    <Container 
			type="button"
			disables={loading} // se o loading for verdadeiro vai desabilitar
			{...rest}
		>
      { loading ? 'Carregando...' : title }
    </Container>
			// se o loading for verdadeiro, mostrar a mensagem Carregando...
			// se for falso, mostrar o conteúdo da propriedade title
  );
}