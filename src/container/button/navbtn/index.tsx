import { IconType } from 'react-icons';
import { MouseEvent } from 'react';

interface INavbtnProps {
	more: string;
	Value: string | IconType;
	isDisabled: () => boolean;
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Navbtn(props: INavbtnProps) {
	const { more, Value, onClick, isDisabled } = props;
	return (
		<button
			className={`p-3 rounded-2xl transform transition motion-safe:hover:scale-110 hover:-translate-y-1 duration-150 ease-in-out text-2xl ${more}`}
			type={'button'}
			onClick={onClick}
			disabled={isDisabled()}>
			{typeof Value === 'string' ? Value : <Value />}
		</button>
	);
}
