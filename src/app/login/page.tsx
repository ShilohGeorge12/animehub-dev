'use client';
import { Animation } from '@/components/animation';
import { useMyContext } from '@/context';
import { PASSWORD_FORMAT_MESSAGE, PASSWORD_REGEX, USERNAME_REGEX, isUser, responseTypes } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, MouseEvent, ChangeEvent, useLayoutEffect } from 'react';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { toast } from 'sonner';

export default function Login() {
	const initState = {
		username: '',
		password: '',
		// email: '',
	};

	const {
		dispatch,
		state: { loggedIn },
	} = useMyContext();
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [viewPasword, setViewPasword] = useState<boolean>(false);
	const [details, setDetails] = useState<typeof initState>(initState);
	const [status, setStatus] = useState<'fetching' | 'idle'>('idle');
	const { push } = useRouter();

	useLayoutEffect(() => {
		if (loggedIn) {
			dispatch({ type: 'logOut', payload: { isloggedIn: false } });
		}
	}, []);
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
		const { username, password } = details;

		if (username === '' || password === '') {
			setErrorMessage((prev) => [...prev, 'All Input Fields are required!!']);
			return;
		}
		let hasError: boolean = false;

		if (!USERNAME_REGEX.test(username)) {
			setErrorMessage((prev) => [...prev, `Username (${username}) must be at least 2 characters long and can only contain letters, @, _, or -.`]);
			hasError = true;
		}

		// if (!emailRegex.test(email)) {
		// 	setErrorMessage((prev) => [...prev, `Invalid email address (${email}). Please enter a valid email.`]);
		// 	hasError = true;
		// }

		if (!PASSWORD_REGEX.test(password)) {
			setErrorMessage((prev) => [...prev, PASSWORD_FORMAT_MESSAGE]);
			hasError = true;
		}

		if (hasError) return;
		setStatus('fetching');

		const promise = async () => {
			const body = {
				username: details.username.trim(),
				password: details.password.trim(),
				// email: details.email.trim(),
			};

			const req = await fetch('/api/login', {
				method: 'POST',
				body: JSON.stringify(body),
			});
			const res = (await req.json()) as unknown as responseTypes;
			return res;
		};

		toast.promise(promise, {
			loading: 'sending login credencials...',
			success: (data: responseTypes) => {
				if ('error' in data) {
					setStatus('idle');
					throw new Error(typeof data.error === 'string' ? data.error : '');
					// return data.error;
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
		// <section className='flex flex-col items-center w-full h-full gap-6 lg:gap-0'>
		<Animation
			className='flex flex-col items-center w-full h-full gap-6 lg:gap-0'
			uniqueKey={'Login-Animation-Layer'}
			styles={{
				initial: { opacity: 0, scale: 0 },
				animate: { opacity: 1, scale: 1 },
				exit: { opacity: 0, scale: 0 },
				transition: { type: 'spring', damping: 10, stiffness: 100 },
			}}>
			<>
				<p className='text-4xl font-semibold text-center text-white uppercase'>Sign In</p>
				<div className='w-full md:w-[70%] lg:w-[60%] flex relative items-center justify-center'>
					<Image
						src={'/others/log-in-hime.webp'}
						alt='loginHime'
						loading='eager'
						title='login To Animehub-dev'
						width={100}
						height={100}
						className='hidden w-auto lg:-top-7 md:-top-6 lg:-left-9 md:-left-[41px] md:absolute md:flex lg:h-80 md:h-72 z-10'
					/>
					<form
						className={`bg-black/80 dark:bg-zinc-900/80 backdrop-blur px-2 py-6 rounded-2xl md:top-6 lg:top-7 md:right-0 w-[95%] md:w-[84.4%] lg:w-[85.9%] flex flex-col items-center gap-6`}
						autoComplete='off'
						aria-autocomplete='none'>
						<input
							type='text'
							placeholder={'Username'}
							className={`w-[90%] md:w-3/4 h-10 px-8 outline-none border-b-2 border-pink-500 bg-transparent focus:border-b-4 placeholder:text-pink-500 placeholder:text-xl text-white text-base autofill:bg-transparent`}
							name='username'
							autoComplete='off'
							required={true}
							value={details.username}
							onChange={onChange}
						/>
						<div className='w-[90%] md:w-3/4 h-10 relative'>
							<input
								type={viewPasword ? 'text' : 'password'}
								placeholder={'Password'}
								className={`w-full h-full px-8 outline-none border-b-2 border-pink-500 bg-transparent focus:border-b-4 placeholder:text-pink-500 placeholder:text-xl text-white text-base`}
								name='password'
								autoComplete='off'
								required={true}
								value={details.password}
								onChange={onChange}
							/>
							<button
								className={`absolute top-2 right-2 text-white`}
								onClick={onViewPasword}>
								{viewPasword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>

						<div className='flex items-center md:w-[90%] w-[95%] px-6'>
							<Link
								href={'/forget-password'}
								className='flex items-center justify-center text-xs underline transition duration-500 ease-in-out hover:scale-105 w-fit'>
								forget password
							</Link>
						</div>

						<button
							disabled={status === 'idle' ? false : true}
							className={`flex ${
								status === 'fetching' ? 'items-center gap-2' : ''
							} p-2 bg-pink-500 rounded-xl text-xl font-bold tracking-wider text-white transition duration-500 ease-in-out hover:scale-110 hover:shadow-xl disabled:bg-pink-700`}
							onClick={onSubmit}>
							Sign In
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
			</>
		</Animation>
		// </section>
	);
}
