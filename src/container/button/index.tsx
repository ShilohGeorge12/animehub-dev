import { IconType } from 'react-icons';
import { MouseEvent } from 'react';
import { ProfileBtn } from './profilebtn';
import { Searchbtn } from './searchbtn';
import { useContextApi } from '../../context';

interface IButtonProps {
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
	name: string;
	Value: IconType | string;
	size?: 'lg' | 'md' | 'sm';
	more?: string;
	type: 'profile' | 'search' | 'nav' | 'ViewAnime';
}

function Button(props: IButtonProps) {
	const { Value, onClick, size, type, more, name } = props;
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
						name={name}
						Value={Value}
						size={size}
						isDisabled={isDisabled}
					/>
				);
			break;
		case 'search':
			return (
				<Searchbtn
					name={name}
					onClick={onClick}
					Value={Value}
					isDisabled={isDisabled}
				/>
			);
		case 'nav':
			const classes = `p-3 rounded-2xl transform transition motion-safe:hover:scale-110 hover:-translate-y-1 duration-150 ease-in-out text-2xl ${more}`;
			return (
				<button
					className={classes}
					name={name}
					aria-label={typeof Value !== 'string' ? name : undefined}
					type={'button'}
					onClick={onClick}
					disabled={isDisabled()}>
					{typeof Value === 'string' ? Value : <Value />}
				</button>
			);
		case 'ViewAnime':
			return (
				<button
					type={'button'}
					name={name}
					className='w-fit bg-pink-500 text-white p-3 rounded-xl transition duration-300 hover:scale-110 hover:shadow-lg font-semibold'
					onClick={onClick}>
					{typeof Value === 'string' ? Value : <Value />}
				</button>
			);
	}
}

export default Button;
