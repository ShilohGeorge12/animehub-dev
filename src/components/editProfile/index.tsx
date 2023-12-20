'use client';
import { validateUpdateProfile } from '@/lib/validateUpdateProfile';
import { isUser, type ErrorMessage, type UserType, type editProfileInitState, type responseTypes, stateAction, isError } from '@/types';
import Image from 'next/image';
import { type Dispatch, type SetStateAction, useState, Fragment, ChangeEvent, MouseEvent } from 'react';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { toast } from 'sonner';

interface EditProfileProps {
	user: UserType;
	details: editProfileInitState;
	setDetails: Dispatch<SetStateAction<editProfileInitState>>;
	dispatch: (_val: stateAction) => void;
	setIsDialogOpen: (value: SetStateAction<boolean>) => void;
}

export function EditProfile({ user, details, setDetails, dispatch, setIsDialogOpen }: EditProfileProps) {
	const [viewPasword, setViewPasword] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<{ name: string; url: string }>({
		name: 'default Image',
		url: typeof details.image === 'string' ? details.image : '',
	});
	const [status, setStatus] = useState<'idle' | 'fetching'>('idle');
	const [error, setError] = useState<ErrorMessage>([{ path: 'null', message: 'null' }]);

	const onViewPasword = () => {
		if (viewPasword) {
			setViewPasword(false);
			return;
		}
		setViewPasword(true);
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDetails((prev) => ({ ...prev, [name]: value }));
	};

	const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		if (!files) return;
		setSelectedImage({ name: files[0].name, url: URL.createObjectURL(files[0]) });
		setDetails((prev) => ({ ...prev, [name]: files[0] }));
	};

	const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setError([]);
		const result = validateUpdateProfile({ details, user, setError });

		if (result === 'error') {
			console.log('error occured');
			return;
		}

		const formdata = new FormData();

		const body: Partial<typeof details> = {};

		if (details.password.length > 6) body.password = details.password;
		if (details.username !== user.username) body.username = details.username;
		if (details.email !== user.email) body.email = details.email;
		if (details.gender !== user.gender) body.gender = details.gender;
		if (details.image !== user.image) body.image = details.image;

		if (Object.keys(body).length === 0) return;
		setStatus('fetching');
		Object.entries(body).forEach(([key, val]) => formdata.append(key, val));

		const req = await fetch(`/api/users/${user._id}`, {
			method: 'PATCH',
			body: formdata,
		});

		const res = (await req.json()) as responseTypes;

		if (isError(res)) {
			const error = typeof res.error === 'string' ? res.error : res.error.join(', ');
			toast.error(error);
			setStatus('idle');
			return;
		}

		if (isUser(res)) {
			dispatch({ type: 'user', payload: { user: res } });
			setStatus('idle');
			setIsDialogOpen(false);
		}
	};

	return (
		<form className={`flex flex-col items-center gap-6 md:mb-6 mb-4`}>
			<div className='flex flex-col items-center justify-center w-full gap-1'>
				<input
					type='text'
					placeholder={'Username'}
					className={`w-[90%] md:w-3/4 h-10 px-8 outline-none border-b-2 border-pink-500 bg-transparent focus:border-b-4 placeholder:text-pink-500 placeholder:text-xl text-pink-500 text-base autofill:bg-transparent`}
					name='username'
					autoComplete='off'
					aria-autocomplete='none'
					value={details.username}
					onChange={onChange}
				/>

				{error.map((error) => (
					<Fragment key={error.path + 'error message'}>{error.path === 'username' && <span className='w-[90%] text-sm text-center'> {error.message} </span>}</Fragment>
				))}
			</div>

			<div className='flex flex-col items-center justify-center w-full gap-1'>
				<input
					type='email'
					placeholder={'Email'}
					className={`w-[90%] md:w-3/4 h-10 px-8 outline-none border-b-2 border-pink-500 bg-transparent focus:border-b-4 placeholder:text-pink-500 placeholder:text-xl text-pink-500 text-base autofill:bg-transparent`}
					name='email'
					autoComplete='off'
					aria-autocomplete='none'
					value={details.email}
					onChange={onChange}
				/>

				{error.map((error) => (
					<Fragment key={error.path + 'error message'}>{error.path === 'email' && <span className='w-[90%] text-sm text-center'>{error.message}</span>}</Fragment>
				))}
			</div>

			<div className='w-[90%] md:w-3/4 min-h-10 relative flex flex-col items-center justify-center gap-1 '>
				<input
					type={viewPasword ? 'text' : 'password'}
					placeholder={'Password'}
					className={`w-full h-10 px-8 outline-none border-b-2 border-pink-500 bg-transparent focus:border-b-4 placeholder:text-pink-500  placeholder:text-xl text-pink-500 text-base autofill:bg-none`}
					name='password'
					autoComplete='off'
					aria-autocomplete='none'
					value={details.password}
					onChange={onChange}
				/>
				<button
					type='button'
					className={`absolute top-2 right-2 text-pink-500`}
					onClick={onViewPasword}>
					{viewPasword ? <FaEyeSlash /> : <FaEye />}
				</button>

				{error.map((error) => (
					<Fragment key={error.path + 'error message'}>
						{error.path === 'password' && (
							<span
								key={error.path}
								className='w-full text-sm text-center'>
								{error.message}
							</span>
						)}
					</Fragment>
				))}
			</div>

			<select
				name='gender'
				id='gender'
				className={`w-[90%] md:w-3/4 h-10 px-8 outline-none border-2 rounded-lg border-pink-500 bg-pink-500 placeholder:text-white placeholder:text-xl text-white text-base`}
				value={details.gender}
				onChange={(e) => setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))}>
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
				onChange={onImageChange}
				// value={details.image}
			/>

			<div
				className={
					'w-[90%] md:w-3/4 h-10 text-pink-500 text-sm md:text-base flex gap-2 items-center'
					// 'w-[90%] md:w-3/4 h-10 px-8 outline-none rounded-lg p-1 bg-transparent placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base'
				}>
				<Image
					src={selectedImage.name === 'default Image' ? `/users/${selectedImage.url}` : selectedImage.url}
					alt='profile image'
					className='w-12 rounded-[50%] object-cover'
					width={100}
					height={100}
				/>

				<label
					htmlFor='image'
					className='flex-1 h-full p-2 text-center align-middle transition duration-500 ease-in-out border-2 border-pink-500 rounded-md cursor-pointer hover:text-white hover:bg-pink-500 hover:border-pink-500'>
					{selectedImage.name === 'default Image' ? 'Update Profile Image' : selectedImage.name}
				</label>
			</div>

			<button
				type='button'
				disabled={status === 'idle' ? false : true}
				className={`flex ${
					status === 'fetching' ? 'items-center gap-2 bg-pink-600' : 'bg-pink-500'
				} w-1/2 h-10 flex justify-center items-center   rounded-xl text-base font-bold tracking-wider text-white transition duration-500 ease-in-out hover:scale-110 hover:shadow-xl disabled:bg-pink-700`}
				onClick={onSubmit}>
				Update Profile
				{status === 'fetching' && (
					<span className='text-2xl animate-rotate'>
						<FaSpinner />
					</span>
				)}
			</button>
		</form>
	);
}
