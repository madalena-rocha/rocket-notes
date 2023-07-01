import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiSearch } from "react-icons/fi"; // importando ícone de adicionar
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";

import { api } from "../../services/api";

import { Note } from "../../components/Note";
import { Input } from "../../components/Input";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";

export function Home() {
  const [search, setSearch] = useState(""); // estado para guardar o conteúdo da caixa de pesquisa
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]); // estado para guardar qual tag está selecionada
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagSelected(tagName) {
    // recebe como parâmetro o nome da tag selecionada no momento
    if (tagName === "all") {
      return setTagsSelected([]); // ao clicar em todos, desmarcar todas as tags
    }

    const alreadySelected = tagsSelected.includes(tagName); // saber se a tag já está selecionada

    if (alreadySelected) {
      const filteredTags = tagsSelected.filter((tag) => tag !== tagName);
      // retornar todas as tags diferentes da tag desmarcada
      setTagsSelected(filteredTags);
    } else {
      // se não tiver selecionado, selecione
      setTagsSelected((prevState) => [...prevState, tagName]); // prevState para manter as tags selecionadas anteriormente
    }
  }

  function handleDetails(id) {
    // quando clicar numa nota, abrir a página para exibir os detalhes da nota
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      // o useEffect não aceita async, sendo necessário criar uma função para utilizá-lo
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${tagsSelected}`
      );
      // enviando para a rota /notes através de query o title passando o conteúdo dentro do search e as tags passando o conteúdo dentro de tagsSelected
      setNotes(response.data);
    }

    fetchNotes();
  }, [tagsSelected, search]);
  // quando mudar o conteúdo do tagsSelected ou do search, executa novamente o useEffect

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            onClick={() => handleTagSelected("all")}
            isActive={tagsSelected.length === 0} // o tamanho verifica se há algum elemento dentro do array
          />
        </li>

        {tags &&
          tags.map(
            (
              tag // certificando que há conteúdo dentro do estado tags, se sim, usar o tags para fazer o map
            ) => (
              <li key={String(tag.id)}>
                <ButtonText
                  title={tag.name}
                  onClick={() => handleTagSelected(tag.name)}
                  isActive={tagsSelected.includes(tag.name)} // verificar se a tag existe dentro do array
                />
              </li>
            )
          )}
      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          icon={FiSearch}
          onChange={(e) => setSearch(e.target.value)}
          // guarda na variável e o conteúdo da caixa de pesquisa e transferindo para o estado
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {notes.map((note) => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
          ))}
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  );
}
