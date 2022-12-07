import { useState, useEffect } from 'react';
import { Container, Links, Content } from "./styles";
import { useParams, useNavigate } from 'react-router-dom'; // buscar pelos parâmetros que existem na rota

import { api } from '../../services/api';

import { Tag } from "../../components/Tag";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";

export function Details() {
	const [data, setData] = useState(null);

	const params = useParams();
	const navigate = useNavigate();

	function handleBack() {
		navigate("/");
	}

	useEffect(() => { // buscar pelas informações da nota
		async function fetchNote() {
			const response = await api.get(`/notes/${params.id}`);
			setData(response.data);
		}

		fetchNote();
	}, []);

  	return (
    	<Container>
			<Header />
			{
				data && // mostrar o main somente se houver conteúdo
				<main>
					<Content>
						<ButtonText title="Excluir nota" />

						<h1>{data.title}</h1>

						<p>{data.description}</p>

						{ 
							data.links && // só renderizar esta seção se houver links
							<Section title="Links úteis">
								<Links>
									{
										data.links.map(link => (
											<li key={String(link.id)}>
												<a href={link.url} target="_blank">
													{link.url}
												</a>
											</li>
										))
									}
								</Links>
							</Section>
						}

						{ 
							data.tags && 
							<Section title="Marcadores">
								{
									data.tags.map(tag => (
										<Tag 
											key={String(tag.id)}
											title={tag.name} 
										/>
									))
								}
							</Section>
						}

						<Button 
							title="Voltar" 
							onClick={handleBack} 
						/>				
					</Content>
				</main>
			}
    	</Container>
  	); // o children não é passado como uma propriedade comum, sendo passado dentro do <Section></Section>
}
