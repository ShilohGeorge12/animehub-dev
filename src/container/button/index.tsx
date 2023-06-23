import { IconType } from 'react-icons';
import { MouseEvent } from 'react';
import { ProfileBtn } from './profilebtn';
import { Searchbtn } from './searchbtn';
import { Navbtn } from './navbtn';
import { useContextApi } from '../../context';

interface IButtonProps {
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
	Value: IconType | string;
	size?: 'lg' | 'md' | 'sm';
	more?: string;
	type: 'profile' | 'search' | 'nav';
}

function Button(props: IButtonProps) {
	const { Value, onClick, size, type, more } = props;
	const {
		state: { loggedIn },
	} = useContextApi();

	const isDisabled = () => {
		if (!loggedIn) return true;
		return false;
	};

	switch (type) {
		case 'profile':
			if (size)
				return (
					<ProfileBtn
						onClick={onClick}
						Value={Value}
						size={size}
						isDisabled={isDisabled}
					/>
				);
			break;
		case 'search':
			return (
				<Searchbtn
					onClick={onClick}
					Value={Value}
					isDisabled={isDisabled}
				/>
			);
		case 'nav':
			return (
				<Navbtn
					more={more ? more : ''}
					onClick={onClick}
					Value={Value}
					isDisabled={isDisabled}
				/>
			);
	}
}

export default Button;
