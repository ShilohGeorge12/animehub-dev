'use client';

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordInputProps {
	name: string;
}

export const PasswordInput = ({ name }: PasswordInputProps) => {
	const [viewPasword, setViewPasword] = useState<boolean>(false);

	const onViewPassword = () => {
		if (viewPasword) {
			setViewPasword(false);
			return;
		}

		setViewPasword(true);
	};

	return (
		<section className='w-[90%] md:w-3/4 h-10 relative'>
			<input
				type={viewPasword ? 'text' : 'password'}
				placeholder={name}
				name={name}
				aria-autocomplete='none'
				autoComplete='off'
				className={`w-full h-full px-8 outline-none border-b-2 border-pink-500 bg-transparent focus:border-b-4  placeholder:text-pink-500 placeholder:text-xl text-white text-base`}
				// value={details.password}
				// onChange={onChange}
			/>
			<button
				type='button'
				className={`absolute top-2 right-2 text-white`}
				onClick={onViewPassword}>
				{viewPasword ? <FaEyeSlash /> : <FaEye />}
			</button>
		</section>
	);
};
