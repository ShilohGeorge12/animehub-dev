'use client';
// import { useMyContext } from '@/context';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdErrorOutline } from 'react-icons/md';
import { toast } from 'sonner';

interface SignUpUser {
	username: string;
	email: string;
	password: string;
	gender: 'male' | 'female' | 'Specify Your Gender';
	image: File | '';
}

export default function SignUp() {
	const initState: SignUpUser = {
		username: '',
		password: '',
		email: '',
		gender: 'Specify Your Gender',
		image: '',
	};

	const defaultImage = '/others/user2.png';
	const [details, setdetails] = useState<SignUpUser>(initState);
	const [selectedImage, setSelectedImage] = useState<{ name: string; url: string }>({ name: 'default', url: defaultImage });
	const [viewPasword, setViewPasword] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [isErrorMsgModalOpen, setIsErrorMsgModalOpen] = useState<boolean>(false);
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [status, setStatus] = useState<'idle' | 'fetching'>('idle');

	const usernameRegex = /^[a-zA-Z\s_-]{2,}$/;
	const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/;
	const passwordRegex = /^[a-zA-Z0-9@_-]{6,24}$/;

	const { push } = useRouter();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setdetails((prev) => ({ ...prev, [name]: value }));
	};
	const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		if (!files) return; //setSelectedImage(defaultImage);
		setSelectedImage({ name: files[0].name, url: URL.createObjectURL(files[0]) });
		setdetails((prev) => ({ ...prev, [name]: files[0] }));
	};

	const onViewPasword = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (viewPasword) {
			setViewPasword(false);
		} else {
			setViewPasword(true);
		}
	};

	const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setErrorMessage([]);
		const { username, email, password, gender, image } = details;
		if (username === '' || email === '' || password === '') {
			setErrorMessage((prev) => [...prev, 'All Input Fields are required!!']);
			setIsErrorMsgModalOpen(true);
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
			setErrorMessage((prev) => [...prev, `Password must be 6-24 characters long and can only contain letters, numbers, @, _, or -.`]);
			hasError = true;
		}

		if (gender === 'Specify Your Gender') {
			setErrorMessage((prev) => [...prev, `Please Specify Your Gender`]);
			hasError = true;
		}

		if (image === '') {
			setErrorMessage((prev) => [...prev, `Please Upload an Image`]);
			hasError = true;
		}

		if (hasError) {
			setIsErrorMsgModalOpen(true);
			return;
		}

		setStatus('fetching');
		const body = {
			username: details.username.trim(),
			password: details.password.trim(),
			email: details.email.trim(),
			gender: details.gender,
			image: details.image,
		};

		const formData = new FormData();
		Object.entries(body).forEach(([key, val]) => formData.append(key, val));

		const req = await fetch('/api/newuser', {
			method: 'POST',
			body: formData,
		});

		const res = await req.json();

		if (res.error !== undefined) {
			toast.error(res.error);
			setStatus('idle');
			return;
		}
		console.log(res);
		setdetails(initState);
		setStatus('idle');
		push('/');
	};

	useEffect(() => (isErrorMsgModalOpen ? dialogRef.current?.showModal() : dialogRef.current?.close()), [isErrorMsgModalOpen]);

	return (
		<section className='flex flex-col items-center w-full h-full gap-3 lg:gap-0'>
			{/* <MetaData
			title={'Login'}
			description={'Login To animehub.dev'}
			path={pathname}
		/> */}
			<p className='text-xl font-semibold tracking-wider text-center text-white md:text-3xl'>Create an Account</p>
			<div className='w-full md:w-[70%] lg:w-[60%] flex relative items-center justify-center'>
				<Image
					src={'/others/register-hime.webp'}
					alt='signupHime'
					loading='eager'
					title='Sign Up In Animehub-dev'
					width={300}
					height={300}
					className='z-10 hidden w-auto lg:bottom-1 md:bottom-1 lg:-left-6 md:-left-8 md:absolute md:flex lg:h-80 md:h-72'
				/>
				<form
					className={`bg-black/80 dark:bg-zinc-900/80 backdrop-blur px-2 py-6 rounded-2xl md:top-6 lg:top-7 md:right-0 w-[95%] md:w-[84.4%] lg:w-[85.9%] flex flex-col items-center gap-6`}
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
						type='email'
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

					<select
						name='gender'
						id='gender'
						className={`w-[90%] md:w-3/4 h-10 px-8 outline-none border-2 rounded-lg border-white bg-black/80  dark:border-pink-500 placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base`}
						onChange={(e) => setdetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))}>
						<option value='Specify Your Gender'>Specify Your Gender</option>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</select>

					<input
						type='file'
						name='image'
						id='image'
						hidden
						placeholder={'image'}
						accept='.png, .webp'
						required={true}
						onChange={onImageChange}
					/>

					<div
						className={
							'w-[90%] md:w-3/4 h-10 text-white text-sm md:text-base flex gap-2 items-center'
							// 'w-[90%] md:w-3/4 h-10 px-8 outline-none rounded-lg p-1 bg-transparent placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base'
						}>
						<Image
							src={selectedImage.url}
							alt=''
							className='w-12 rounded-[50%] object-cover'
							width={100}
							height={100}
						/>

						<label
							htmlFor='image'
							className='flex-1 h-full p-2 text-center align-middle transition duration-500 ease-in-out border-2 border-white rounded-md cursor-pointer dark:border-pink-500 hover:bg-pink-500 hover:border-pink-500'>
							{selectedImage.url === defaultImage ? 'Select An Image' : selectedImage.name}
						</label>
					</div>

					<button
						disabled={status === 'idle' ? false : true}
						className={`flex ${
							status === 'fetching' ? 'items-center gap-2' : ''
						} p-2 bg-pink-500 rounded-xl text-xl font-bold tracking-wider text-white transition duration-500 ease-in-out hover:scale-110 hover:shadow-xl disabled:bg-pink-700`}
						onClick={onSubmit}>
						Sign Up
						{status === 'fetching' && (
							<span className='animate-rotate'>
								<FaSpinner />
							</span>
						)}
					</button>
				</form>
			</div>
			<dialog
				ref={dialogRef}
				onClick={() => setIsErrorMsgModalOpen(false)}
				className='w-[95%] md:w-[55%] text-red-500 bg-gray-100/90 rounded-xl backdrop-blur'>
				<section
					onClick={(e) => e.stopPropagation()}
					className='flex flex-col gap-4 md:gap-7'>
					<div className='flex w-full p-2 text-white bg-pink-500'>
						<button
							type='button'
							name={`close Modal`}
							className={`flex self-end rounded-lg text-2xl p-1 bg-white text-pink-500 hover:text-red-500 transition duration-500 ease-in-out hover:scale-105`}
							onClick={() => setIsErrorMsgModalOpen(false)}>
							<IoMdClose />
						</button>
						<h1 className='flex items-center justify-center flex-1 text-xl font-semibold'>Errors Encountered</h1>
					</div>

					<div className={`grid  grid-cols-1 ${errorMessage.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-4 justify-items-center text-xs min-h-[150px]`}>
						{errorMessage.map((error) => (
							<p
								className='text-base font-semibold tracking-wider'
								key={error}>
								{error}
							</p>
						))}
					</div>
				</section>
			</dialog>
			{errorMessage.length > 0 && !isErrorMsgModalOpen && (
				<button
					type='button'
					name={`view errors`}
					className={`bg-red-500 rounded-xl p-1 absolute md:top-35 md:right-1/4 text-4xl animate-bounce hover:shadow-lg transition duration-500 ease-in-out hover:shadow-red-500`}
					onClick={() => setIsErrorMsgModalOpen(true)}>
					<MdErrorOutline />
				</button>
			)}
		</section>
	);
}
