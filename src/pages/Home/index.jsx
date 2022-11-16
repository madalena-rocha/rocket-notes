import { FiPlus } from 'react-icons/fi'; // importando ícone de adicionar
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Header } from '../../components/Header';
import { ButtonText } from '../../components/ButtonText';

export function Home() {
  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li><ButtonText title="Todos" isActive /></li>
        <li><ButtonText title="React" /></li>
        <li><ButtonText title="Nodejs" /></li>
      </Menu>

      <Search></Search>

      <Content></Content>

      <NewNote>
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  );
}