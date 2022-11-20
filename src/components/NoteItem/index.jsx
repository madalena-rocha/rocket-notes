import { FiPlus, FiX } from 'react-icons/fi';

import { Container } from './styles';

export function NoteItem({ isNew, value, onClick, ...rest }) {
  // propriedade isNew para saber se é para adicionar um novo item
	return (
		<Container isNew={isNew}>
			<input 
				type="text"
				value={value}
				readOnly={!isNew} // se não é novo, permita somente leitura
				{...rest}
			/>

			<button
				type="button"
				onClick={onClick}
				className={isNew ? 'button-add' : 'button-delete'}
			>
				{isNew ? <FiPlus /> : <FiX />}
			</button>
		</Container> // se for novo, renderize o FiPlus, caso contrário, renderize o FiX
	);
}

