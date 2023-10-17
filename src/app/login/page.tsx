'use client';
import { useMyContext } from '@/context';
import { isUser, responseTypes } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, MouseEvent, ChangeEvent } from 'react';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { toast } from 'sonner';

export default function Login() {
	const initState = {
		username: '',
		password: '',
		email: '',
	};
	const { dispatch } = useMyContext();
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [viewPasword, setViewPasword] = useState<boolean>(true);
	const [details, setDetails] = useState<typeof initState>(initState);
	const [status, setStatus] = useState<'fetching' | 'idle'>('idle');
	const { push } = useRouter();
	const usernameRegex = /^[a-zA-Z_-]{2,}$/;
	const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/;
	const passwordRegex = /^[a-zA-Z@_-]{6,24}$/;

	const onViewPasword = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (viewPasword) {
			setViewPasword(false);
		} else {
			setViewPasword(true);
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setErrorMessage([]);
		const { username, email, password } = details;

		if (username === '' || email === '' || password === '') {
			setErrorMessage((prev) => [...prev, 'All Input Fields are required!!']);
			return;
		}
		let hasError: boolean = false;

		if (!usernameRegex.test(username)) {
			setErrorMessage((prev) => [...prev, `Username (${username}) must be at least 2 characters long and can only contain letters, @, _, or -.`]);
			hasError = true;
		}

		if (!emailRegex.test(email)) {
			setErrorMessage((prev) => [...prev, `Invalid email address (${email}). Please enter a valid email.`]);
			hasError = true;
		}

		if (!passwordRegex.test(password)) {
			setErrorMessage((prev) => [...prev, `Password must be 6-24 characters long and can only contain letters, @, _, or -.`]);
			hasError = true;
		}

		if (hasError) return;
		setStatus('fetching');

		const promise = async () => {
			const req = await fetch('/api/login', {
				method: 'POST',
				body: JSON.stringify(details),
			});
			const res = (await req.json()) as unknown as responseTypes;
			return res;
		};

		toast.promise(promise, {
			loading: 'sending login credencials...',
			success: (data: responseTypes) => {
				if ('error' in data) {
					setStatus('idle');
					return data.error;
				}

				if (isUser(data)) {
					setStatus('idle');
					dispatch({ type: 'logIn', payload: { isloggedIn: true, user: data } });
					push('/');
					return `${data.username} login was successfully`;
				}

				return 'login failed!';
			},
			error: (error: Error) => error.message,
		});
	};

	return (
		<section className='flex flex-col items-center w-full h-full gap-6 lg:gap-0'>
			{/* <MetaData
				title={'Login'}
				description={'Login To animehub.dev'}
				path={pathname}
			/> */}
			<p className='text-4xl font-semibold text-center text-white uppercase'>Log In</p>
			<div className='w-full md:w-[70%] lg:w-[60%] flex relative items-center justify-center'>
				<Image
					src={'/others/log-in-hime.webp'}
					alt='loginHime'
					loading='eager'
					title='login To Animehub-dev'
					width={100}
					height={100}
					className='hidden w-auto lg:-top-7 md:-top-6 lg:-left-9 md:-left-[41px] md:absolute md:flex lg:h-80 md:h-72'
				/>
				<form
					className={`bg-black bg-opacity-80 px-2 py-6 rounded-2xl md:top-6 lg:top-7 md:right-0 w-[95%] md:w-[84.4%] lg:w-[85.9%] flex flex-col items-center gap-6`}
					autoComplete='off'
					aria-autocomplete='none'>
					<input
						type='text'
						placeholder={'Username'}
						className={`w-[90%] md:w-3/4 h-10 px-8 outline-none border-b-2 border-white dark:border-pink-500 bg-transparent focus:border-b-4 placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base autofill:bg-transparent`}
						name='username'
						autoComplete='off'
						aria-autocomplete='none'
						required={true}
						value={details.username}
						onChange={onChange}
					/>
					<input
						type='text'
						placeholder={'Email'}
						className={`w-[90%] md:w-3/4 h-10 px-8 outline-none border-b-2 border-white dark:border-pink-500 bg-transparent focus:border-b-4 placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base`}
						name='email'
						autoComplete='off'
						aria-autocomplete='none'
						required={true}
						value={details.email}
						onChange={onChange}
					/>
					<div className='w-[90%] md:w-3/4 h-10 relative'>
						<input
							type={viewPasword ? 'text' : 'password'}
							placeholder={'Password'}
							className={`w-full h-full px-8 outline-none border-b-2 border-white dark:border-pink-500 bg-transparent focus:border-b-4 placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base`}
							name='password'
							autoComplete='off'
							required={true}
							aria-autocomplete='none'
							value={details.password}
							onChange={onChange}
						/>
						<button
							className={`absolute top-2 right-2 text-white`}
							onClick={onViewPasword}>
							{viewPasword ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>

					<button
						disabled={status === 'idle' ? false : true}
						className={`flex ${
							status === 'fetching' ? 'items-center gap-2' : ''
						} p-2 bg-pink-500 rounded-xl text-xl font-bold tracking-wider text-white transition duration-500 ease-in-out hover:scale-110 hover:shadow-xl disabled:bg-pink-700`}
						onClick={onSubmit}>
						Submit
						{status === 'fetching' && (
							<span className='animate-rotate'>
								<FaSpinner />
							</span>
						)}
					</button>
				</form>
			</div>
			{errorMessage.length > 0 && (
				<div className='flex flex-col gap-2 w-[60%] h-40 rounded-lg mt-3 bg-black/70 text-white p-3 items-center'>
					{errorMessage.map((error) => (
						<p
							className='text-base font-semibold tracking-wider'
							key={error}>
							{error}
						</p>
					))}
				</div>
			)}
		</section>
	);
}
