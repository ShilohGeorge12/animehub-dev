'use client';
import { IconType } from 'react-icons';
import { MouseEvent } from 'react';
import { useMyContext } from '../../context';

interface ButtonProps {
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
	name: string;
	Value: IconType | string;
	size: 'lg' | 'md' | 'sm';
	more: string;
	// type: 'header_theme' | 'profile' | 'search' | 'nav' | 'nav_logInOrOut' | 'ViewAnime';
}

export function ThemeBtn({ name, onClick, Value }: Omit<ButtonProps, 'size' | 'more'>) {
	const {
		state: { editProfileModal },
	} = useMyContext();
	const isDisabled = () => {
		// if (!loggedIn) return true;
		if (editProfileModal) return true;
		return false;
	};

	return (
		<button
			type='button'
			name={name}
			aria-label={name}
			className={`p-1 md:p-2 bg-pink-500 text-white text-2xl rounded-xl transition duration-300 ease-in-out hover:translate-y-1 hover:scale-110 hover:bg-white`}
			onClick={onClick}
			disabled={isDisabled()}>
			{typeof Value === 'string' ? Value : <Value />}
		</button>
	);
}
export function SearchBtn({ name, onClick, Value }: ButtonProps) {
	const {
		state: { loggedIn, editProfileModal },
	} = useMyContext();
	const isDisabled = () => {
		if (!loggedIn) return true;
		if (editProfileModal) return true;
		return false;
	};
	return (
		<button
			name={name}
			onClick={onClick}
			disabled={isDisabled()}
			className={`p-2 bg-pink-500 text-white rounded-xl font-semibold transition duration-500 ease-in-out hover:scale-110 hover:shadow-xl`}>
			{typeof Value === 'string' ? Value : <Value />}
		</button>
	);
}
export function NavBtn({ name, onClick, Value, more }: Omit<ButtonProps, 'size'>) {
	const {
		state: { loggedIn, editProfileModal },
	} = useMyContext();
	const isDisabled = () => {
		if (!loggedIn && name !== 'home') return true;
		if (editProfileModal) return true;
		return false;
	};
	return (
		<button
			name={name}
			aria-label={typeof Value !== 'string' ? name : undefined}
			type={'button'}
			className={`p-2 rounded-xl transform transition motion-safe:hover:scale-105 hover:-translate-y-1 duration-150 ease-in-out text-xl ${more}`}
			onClick={onClick}
			disabled={isDisabled()}>
			{typeof Value === 'string' ? Value : <Value />}
		</button>
	);
}
export function VeiwAnimeBtn({ name, onClick, Value }: Pick<ButtonProps, 'name' | 'onClick' | 'Value'>) {
	const {
		state: { loggedIn, editProfileModal },
	} = useMyContext();
	const isDisabled = () => {
		if (!loggedIn) return true;
		if (editProfileModal) return true;
		return false;
	};
	return (
		<button
			type={'button'}
			name={name}
			className='p-2 text-3xl font-semibold text-white transition duration-300 ease-in-out bg-pink-500 peer hover:bg-white hover:text-pink-500 w-fit rounded-xl hover:scale-110 hover:shadow-lg'
			onClick={onClick}
			disabled={isDisabled()}>
			{typeof Value === 'string' ? Value : <Value />}
		</button>
	);
}
export function LogInOrOutBtn({ name, Value, onClick }: Omit<ButtonProps, 'size' | 'more'>) {
	const {
		state: { editProfileModal },
	} = useMyContext();
	return (
		<button
			type={'button'}
			aria-label={name}
			name={name}
			className={
				'p-2 rounded-xl transform transition motion-safe:hover:scale-105 hover:-translate-y-1 duration-150 ease-in-out text-xl hover:bg-white hover:text-pink-600'
			}
			onClick={onClick}
			disabled={editProfileModal ? true : false}>
			{typeof Value === 'string' ? Value : <Value />}
		</button>
	);
}
export function ProfilBtn({ name, onClick, Value, size }: Omit<ButtonProps, 'more'>) {
	const {
		state: { loggedIn, editProfileModal },
	} = useMyContext();
	const isDisabled = () => {
		if (!loggedIn) return true;
		// if (editProfileModal) return true;
		return false;
	};

	let padding: string;

	switch (size) {
		case 'lg':
			padding = 'md:w-full py-2 px-14';
			break;
		case 'md':
			padding = 'p-2';
			break;
		case 'sm':
			padding = 'p-1 md:w-full md:py-2';
			break;
	}

	return (
		<button
			name={name}
			onClick={onClick}
			disabled={isDisabled()}
			className={`${padding} bg-pink-500 text-white rounded-xl font-semibold transition duration-500 ease-in-out hover:scale-110 hover:shadow-xl`}>
			{typeof Value === 'string' ? Value : <Value />}
		</button>
	);
}
