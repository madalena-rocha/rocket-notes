import { Container, Links } from "./styles";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";

export function Details() {
  return (
    <Container>
			<Header />

			<Section title="Links úteis">
				<Links>
					<li><a href="#">https://app.rocketseat.com.br/</a></li>
					<li><a href="#">https://app.rocketseat.com.br/</a></li>
				</Links>
			</Section>

      <Button title="Voltar" />
    </Container>
  ); // o children não é passado como uma propriedade comum, sendo passado dentro do <Section></Section>
}
