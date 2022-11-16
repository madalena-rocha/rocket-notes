import styled from "styled-components";

// Armazenando dentro do Container um elemento HTML div
export const Container = styled.div`
  width: 100%;
	height: 100vh;

	display: grid;
	grid-template-rows: 105px auto;
	grid-template-areas:
	"header"
	"content"
`;
