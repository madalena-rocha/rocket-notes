import { Container, Links } from "./styles";

import { Tag } from "../../components/Tag";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";

export function Details() {
  return (
    <Container>
			<Header />

			<ButtonText title="Excluir nota" />

			<Section title="Links úteis">
				<Links>
					<li><a href="#">https://app.rocketseat.com.br/</a></li>
					<li><a href="#">https://app.rocketseat.com.br/</a></li>
				</Links>
			</Section>
			
			<Section title="Marcadores">
				<Tag title="express" />
				<Tag title="nodejs" />
			</Section>

      <Button title="Voltar" />
    </Container>
  ); // o children não é passado como uma propriedade comum, sendo passado dentro do <Section></Section>
}
