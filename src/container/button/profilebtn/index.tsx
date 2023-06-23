import { IconType } from 'react-icons';
import { MouseEvent } from 'react';

interface IProfileProps {
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
	Value: IconType | string;
	size: 'lg' | 'md' | 'sm';
	isDisabled: () => boolean;
}

export function ProfileBtn(props: IProfileProps) {
	const { Value, onClick, size, isDisabled } = props;
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
			onClick={onClick}
			disabled={isDisabled()}
			className={`${padding} bg-pink-500 text-white rounded-xl font-semibold transition duration-500 ease-in-out hover:scale-110 hover:shadow-xl`}>
			{typeof Value === 'string' ? Value : <Value />}
		</button>
	);
}
