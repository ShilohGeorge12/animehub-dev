import { ChangeEvent, useState } from 'react';
import { useMyContext } from '../../../context';
import z from 'zod';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface IEditProfileModalProps {}

export function EditProfileModal(props: IEditProfileModalProps) {
	const {} = props;
	const {
		state: {
			user: { username, email, image: userImage },
		},
		dispatch,
	} = useMyContext();
	const userProfileStateSchema = z.object({
		username: z
			.string({ invalid_type_error: 'username must be string' })
			.min(2, { message: 'username must not be smaller than 2 charachters' })
			.max(25, { message: 'username must not be greater than 25 charachters' }),
		email: z.string({ invalid_type_error: 'email must be string' }).email({ message: 'Invalid email address' }),
		// image: z.any(),
		image: z.union([z.instanceof(File), z.null()]),
		password: z.string({ invalid_type_error: 'email must be string' }).max(24).trim().default(''),
		confirmPassword: z.string({ invalid_type_error: 'email must be string' }).max(24).trim().default(''),
	});
	const initState: z.infer<typeof userProfileStateSchema> = { username, email, password: '', confirmPassword: '', image: null };
	const [userProfile, setUserProfile] = useState<z.infer<typeof userProfileStateSchema>>(initState);
	const [viewPasword, setViewPasword] = useState<boolean>(false);
	const [viewConfirmPasword, setViewConfirmPasword] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(true);
	const [imageSrc, setImageSrc] = useState<string>(URL.createObjectURL(new Blob([new Uint8Array(userImage.data.data)], { type: userImage.contentType })));

	const onClose = () => dispatch({ type: 'editProfileModalClose', payload: { close: false } });
	const onChange = (e: ChangeEvent<HTMLInputElement>) => setUserProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { files, name } = e.target;
		if (files) {
			setUserProfile((prev) => ({ ...prev, [name]: files[0] }));
			setImageSrc(URL.createObjectURL(files[0]));
		}
	};
	const onSubmit = async () => {
		const userData = new FormData();
		setIsSuccess(false);
		if (!userProfileStateSchema.safeParse(userProfile).success) {
			toast.error(`use the Correct Format for each field`);
			setIsSuccess(true);
			return;
		}
		if (userProfile.password !== userProfile.confirmPassword) {
			toast.error(`The passwords provided don't match!`);
			setIsSuccess(true);
			return;
		}
		const passwordRegex = /^[a-zA-Z0-9@_-]+$/;
		if (userProfile.password != '' && passwordRegex.test(userProfile.password) === false && passwordRegex.test(userProfile.confirmPassword) === false) {
			toast.error('password must contain letters, numbers and/or Special charachters like @, -, _');
			setIsSuccess(true);
			console.log('pasword');
			return;
		}
		if (passwordRegex.test(userProfile.password) && passwordRegex.test(userProfile.confirmPassword)) {
			userData.append('password', userProfile.password);
			console.log('done password');
		}
		if (userProfile.username !== username) {
			userData.append('username', userProfile.username);
			console.log('done username');
		}
		if (userProfile.email !== email) {
			userData.append(`email`, userProfile.email);
			console.log('done email');
		}
		if (userProfile.image !== null) {
			userData.append('image', userProfile.image);
			console.log('done image');
		}

		for (var pair of userData.entries()) {
			console.log(pair[0] + ': ' + pair[1]);
		}
		setIsSuccess(true);
		// console.log(userProfile);
	};

	return (
		<form
			onClick={(e) => e.stopPropagation()}
			className={'relative w-full md:w-3/4 p-4 rounded-xl flex flex-col items-center gap-4 bg-black bg-opacity-90 dark:text-pink-500'}>
			<h1 className='font-bold text-2xl md:text-4xl'>Edit Profile</h1>
			<button
				type='button'
				onClick={onClose}
				className={`absolute top-4 left-3 px-2 py-1 rounded-lg transition duration-300 ease-in-out text-white bg-pink-600 hover:scale-110 hover:bg-white hover:text-pink-600 text-2xl`}>
				X
			</button>
			<input
				type='text'
				placeholder={'Username'}
				className={`w-[90%] md:w-3/4 h-10 px-8 outline-none border-b-2 border-white dark:border-pink-500 bg-transparent focus:border-b-4 placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base autofill:bg-transparent`}
				name='username'
				autoComplete='off'
				aria-autocomplete='none'
				value={userProfile.username}
				onChange={onChange}
			/>
			<input
				type='text'
				placeholder={'Email'}
				className={`w-[90%] md:w-3/4 h-10 px-8 outline-none border-b-2 border-white dark:border-pink-500 bg-transparent focus:border-b-4 placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base`}
				name={'email'}
				autoComplete='off'
				aria-autocomplete='none'
				value={userProfile.email}
				onChange={onChange}
			/>
			<div className='w-[90%] md:w-3/4 h-10 relative'>
				<input
					type={viewPasword ? 'text' : 'password'}
					placeholder={'new Password'}
					className={`w-full h-full px-8 outline-none border-b-2 border-white dark:border-pink-500 bg-transparent focus:border-b-4 placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base`}
					name='password'
					autoComplete='off'
					aria-autocomplete='none'
					value={userProfile.password}
					onChange={onChange}
				/>
				<button
					type='button'
					className={`absolute top-2 right-2 text-white`}
					onClick={() => (viewPasword ? setViewPasword(false) : setViewPasword(true))}>
					{viewPasword ? <FaEyeSlash /> : <FaEye />}
				</button>
			</div>
			<div className='w-[90%] md:w-3/4 h-10 relative'>
				<input
					type={viewConfirmPasword ? 'text' : 'password'}
					placeholder={'confirm Password'}
					className={`w-full h-full px-8 outline-none border-b-2 border-white dark:border-pink-500 bg-transparent focus:border-b-4 placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base`}
					name='confirmPassword'
					autoComplete='off'
					aria-autocomplete='none'
					value={userProfile.confirmPassword}
					onChange={onChange}
				/>
				<button
					type='button'
					className={`absolute top-2 right-2 text-white`}
					onClick={() => (viewConfirmPasword ? setViewConfirmPasword(false) : setViewConfirmPasword(true))}>
					{viewConfirmPasword ? <FaEyeSlash /> : <FaEye />}
				</button>
			</div>
			<div className='flex items-center justify-center gap-2 w-full'>
				<input
					type='file'
					accept='image/*'
					name='image'
					placeholder='Change Profile Image(format: webp)'
					title='image format = webp'
					className={`flex items-center justify-center w-[70%] md:w-3/4 text-base border-2 dark:border-pink-500 rounded-md cursor-pointer  focus:outline-none text-white`}
					onChange={onFileChange}
				/>
				<img
					src={imageSrc}
					alt={'current profile Image'}
					title='current profile Image'
					className={'h-12 rounded-lg'}
				/>
			</div>

			<button
				type='button'
				onClick={onSubmit}
				disabled={isSuccess ? false : true}
				className={`flex ${
					!isSuccess ? 'items-center gap-2' : ''
				} transition duration-300 ease-in-out px-4 py-2 rounded-md bg-pink-600 text-white hover:rounded-xl hover:scale-110 hover:bg-white hover:text-pink-600 font-bold tracking-wider text-lg`}>
				Submit
				{!isSuccess && (
					<span className='animate-rotate'>
						<FaSpinner />
					</span>
				)}
			</button>
			<p className='capitalize text-gray-400 font-semibold tracking-wider text-sm md:text-base'>leave any Field or value you don't want to change</p>
		</form>
	);
}
