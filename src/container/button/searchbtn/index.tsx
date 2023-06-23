import { IconType } from 'react-icons';
import { MouseEvent } from 'react';

interface ISearchbtnProps {
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
	Value: IconType | string;
	isDisabled: () => boolean;
}

export function Searchbtn(props: ISearchbtnProps) {
	const { Value, onClick, isDisabled } = props;

	return (
		<button
			onClick={onClick}
			disabled={isDisabled()}
			className={`p-2 bg-pink-500 text-white rounded-xl font-semibold transition duration-500 ease-in-out hover:scale-110 hover:shadow-xl`}>
			{typeof Value === 'string' ? Value : <Value />}
		</button>
	);
}
