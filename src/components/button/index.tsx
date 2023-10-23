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

const isDisabled = () => {
	const {
		state: { loggedIn, editProfileModal },
	} = useMyContext();
	if (!loggedIn) return true;
	if (editProfileModal) return true;
	return false;
};

export default function Button({}: ButtonProps) {
	return (
		<section className={``}>
			<div className=''></div>
			<div className=''></div>
		</section>
	);
}
export function ThemeBtn({ name, onClick, Value }: Omit<ButtonProps, 'size' | 'more'>) {
	return (
		<button
			type='button'
			name={name}
			aria-label={name}
			className={`p-1 md:p-2 bg-pink-500 text-white text-2xl rounded-xl transition duration-300 ease-in-out hover:translate-y-1 hover:scale-110 hover:bg-white hover:text-pink-500`}
			onClick={onClick}
			disabled={isDisabled()}>
			{typeof Value === 'string' ? Value : <Value />}
		</button>
	);
}
export function SearchBtn({ name, onClick, Value }: ButtonProps) {
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
	return (
		<button
			name={name}
			aria-label={typeof Value !== 'string' ? name : undefined}
			type={'button'}
			className={`p-3 rounded-2xl transform transition motion-safe:hover:scale-110 hover:-translate-y-1 duration-150 ease-in-out text-2xl ${more}`}
			onClick={onClick}
			disabled={isDisabled()}>
			{typeof Value === 'string' ? Value : <Value />}
		</button>
	);
}
export function VeiwAnimeBtn({ name, onClick, Value }: ButtonProps) {
	return (
		<button
			type={'button'}
			name={name}
			className='p-3 font-semibold text-white transition duration-300 bg-pink-500 w-fit rounded-xl hover:scale-110 hover:shadow-lg'
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
				'p-3 rounded-2xl transform transition motion-safe:hover:scale-110 hover:-translate-y-1 duration-150 ease-in-out text-2xl hover:bg-white hover:text-pink-500 hover:dark:text-pink-600'
			}
			onClick={onClick}
			disabled={editProfileModal ? true : false}>
			{typeof Value === 'string' ? Value : <Value />}
		</button>
	);
}
export function ProfilBtn({ name, onClick, Value, size }: Omit<ButtonProps, 'more'>) {
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
