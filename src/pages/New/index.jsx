import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Textarea } from '../../components/Textarea';
import { NoteItem } from '../../components/NoteItem';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { Container, Form } from './styles';

export function New() {
	const [links, setLinks] = useState([]); // estado para guardar todos os links
	const [newLink, setNewLink] = useState(""); // estado para guardar o link adicionado

	function handleAddLink() {
		setLinks(prevState => [...prevState, newLink])
		// acessar o estado anterior, pegar o conteúdo armazenado e montar um novo vetor despejando tudo que tinha antes com o novo link
		setNewLink(""); // limpando o setNewLink para ter o estado resetado
	}

	function handleRemoveLink(deleted) { // recebe o link que deseja remover da lista
		setLinks(prevState => prevState.filter(link => link !== deleted));
		// retorna a nova lista contendo todos os links da coleção, menos o link que deseja deletar
	}

  	return (
    	<Container>
			<Header />

			<main>
				<Form>
					<header>
						<h1>Criar nota</h1>
						<Link to="/">voltar</Link>
					</header>

					<Input placeholder="Título" />
					
					<Textarea placeholder="Observações" />

					<Section title="Links úteis">
						{
							links.map((link, index) => ( // index é a posição do elemento dentro da lista
								<NoteItem 
									key={String(index)} // sempre que houver um componente sendo renderizado por uma lista, é obrigatório colocar uma key
									value={link}
									onClick={() => handleRemoveLink(link)}
									// quando deseja passar algum parâmetro para a função, deve usar a nomenclatura de arrow function
								/>
							))
						}

						<NoteItem 
							isNew 
							placeholder="Novo link" 
							value={newLink}
							onChange={e => setNewLink(e.target.value)}
							onClick={handleAddLink}
						/>
					</Section>

					<Section title="Marcadores">
						<div className="tags">
							<NoteItem value="react" />
							<NoteItem isNew placeholder="Nova tag" />
						</div>
					</Section>

					<Button title="Salvar" />
				</Form>
			</main>
		</Container>   
  	);
}