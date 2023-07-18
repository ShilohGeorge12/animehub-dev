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
	type: 'header_theme' | 'profile' | 'search' | 'nav' | 'nav_logInOrOut' | 'ViewAnime';
}

function Button(props: IButtonProps) {
	const { Value, onClick, size, type, more, name } = props;
	const {
		state: { loggedIn, editProfileModal },
	} = useContextApi();

	const isDisabled = () => {
		if (!loggedIn) return true;
		if (editProfileModal) return true;
		return false;
	};

	switch (type) {
		case 'header_theme':
			return (
				<button
					type='button'
					name={name}
					aria-label={name}
					className={`p-1 md:p-2 bg-pink-500 text-white text-2xl rounded-xl transition duration-300 ease-in-out hover:translate-y-1 hover:scale-110 dark:hover:bg-white dark:hover:text-pink-500`}
					onClick={onClick}
					disabled={isDisabled()}>
					{typeof Value === 'string' ? Value : <Value />}
				</button>
			);
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
					name={name}
					aria-label={typeof Value !== 'string' ? name : undefined}
					type={'button'}
					className={classes}
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
					onClick={onClick}
					disabled={isDisabled()}>
					{typeof Value === 'string' ? Value : <Value />}
				</button>
			);
		case 'nav_logInOrOut':
			return (
				<button
					type={'button'}
					aria-label={name}
					name={name}
					className={
						'p-3 rounded-2xl transform transition motion-safe:hover:scale-110 hover:-translate-y-1 duration-150 ease-in-out text-2xl hover:bg-white hover:text-pink-500 hover:dark:text-pink-600'
					}
					onClick={onClick}
					disabled={editProfileModal ? true : false}>
					{typeof Value === 'string' ? Value : <Value />}
				</button>
			);
	}
	return <button />;
}

export default Button;
