import { useState, useEffect } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi'; // importando ícone de adicionar
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { api } from '../../services/api';

import { Note } from '../../components/Note';
import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';

export function Home() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() { // o useEffect não aceita async, sendo necessário criar uma função para utilizá-lo
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  }, []);

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
            isActive 
          />
        </li>

        {
          tags && tags.map(tag => ( // certificando que há conteúdo dentro do estado tags, se sim, usar o tags para fazer o map
            <li key={String(tag.id)}>
              <ButtonText 
                title={tag.name} 
              />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input placeholder="Pesquisar pelo título" icon={FiSearch} />
      </Search>

      <Content>
        <Section title="Minhas notas">
          <Note data={{
            title: 'React',
            tags: [
              {id: '1', name: 'react'},
              {id: '2', name: 'rocketseat'}
            ]
          }} 
          />
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  );
}