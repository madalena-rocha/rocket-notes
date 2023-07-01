import { Container } from "./styles";

export function ButtonText({
  title,
  isActive = false,
  loading = false,
  ...rest
}) {
  // o valor padrão da propriedade isActive caso não seja informado é false
  return (
    <Container type="button" isActive={isActive} disabled={loading} {...rest}>
      {loading ? "Carregando..." : title}
    </Container>
  );
}
