import styled from "styled-components";

export const Container = styled.button`
  background: none;
  color: ${({ theme, isActive }) =>
    isActive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};
  // se tiver ativo, cor laranja, senão, cor cinza

  border: none;
  font-size: 1.6rem;

  &:disabled {
    opacity: 0.5;
  }
`;
