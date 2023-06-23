import { ChangeEvent, HTMLInputTypeAttribute, MutableRefObject } from 'react';

interface IInputProps {
	type: HTMLInputTypeAttribute;
	name: string;
	placeholder: string;
	value: string | number;
	min?: number;
	max?: number;
	accept?: string;
	fileRef?: MutableRefObject<HTMLInputElement | null>;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: IInputProps) {
	const { type, name, placeholder, value, onChange, min, max, accept, fileRef } = props;

	const classes = `w-3/4 p-3 bg-slate-200 rounded-lg placeholder:text-lg placeholder:font-semibold placeholder:tracking-wider text-slate-600 focus:border-gray-300 focus:outline-gray-400 transition duration-500 hover:scale-105 hover:-translate-y-1`;

	if (type === 'number') {
		return (
			<input
				id={name}
				type={type}
				name={name}
				min={min}
				max={max}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				autoComplete={'false'}
				className={classes}
			/>
		);
	}

	if (type === 'file') {
		return (
			<input
				id={name}
				ref={fileRef}
				type={type}
				name={name}
				accept={accept}
				placeholder={placeholder}
				onChange={onChange}
				autoComplete={'false'}
				className={classes}
			/>
		);
	}

	return (
		<input
			id={name}
			type={type}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			autoComplete={'false'}
			className={classes}
		/>
	);
}

export default Input;
