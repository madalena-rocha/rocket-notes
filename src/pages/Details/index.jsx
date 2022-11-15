import { Container } from "./styles";

import { Button } from "../../components/Button";

export function Details() {
  return (
    <Container>
      <h1>Hello World!</h1>
      <span>Madalena Machado</span>

      <Button title="Login" loading />
      <Button title="Cadastrar" />
      <Button title="Voltar" />
    </Container>
  );
}
