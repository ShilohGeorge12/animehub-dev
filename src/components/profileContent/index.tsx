'use client';

import Image from 'next/image';
import { useMyContext } from '@/context';
// import { FaMoon } from 'react-icons/fa';
// import { BiSun } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { Rating } from '../rating';
import { AnimeList } from '../animelist';
import { ProfilBtn } from '../button';
import { useEffect, useRef, useState } from 'react';
import { IoMdClose, IoMdRefresh } from 'react-icons/io';
import { EditProfile } from '../editProfile';
import { type editProfileInitState } from '@/types';

export function ProfileContent() {
	const { push } = useRouter();
	const {
		state: { user },
		dispatch,
	} = useMyContext();

	const { animes, createdAt, email, gender, image, role, username } = user;
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const editProfileInitState: editProfileInitState = {
		username: user.username,
		email: user.email,
		gender: user.gender,
		image: user.image,
		password: '',
	};

	const [details, setDetails] = useState<typeof editProfileInitState>(editProfileInitState);

	useEffect(() => {
		isDialogOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
	}, [isDialogOpen]);

	const Joined = new Date(createdAt).toDateString();

	const calculateAverageRating = (ratings: number[]): number => {
		const sum = ratings.reduce((acc, rating) => acc + rating, 0);
		const average = sum / ratings.length;
		return Number(average.toFixed(2));
	};

	const arr: number[] = [];
	animes.map((anime) => arr.push(anime.rating));
	const average: number = calculateAverageRating(arr);

	return (
		<>
			<div className='flex flex-col items-center gap-4'>
				<div className='flex items-center justify-center w-full'>
					<Image
						src={`/others/${image}`}
						title={username}
						alt={`${username}-profile-image`}
						loading='lazy'
						className='w-1/3 mx-auto rounded-md md:w-2/4'
						width={100}
						height={100}
					/>
				</div>
				<div className='flex flex-col w-full gap-1 text-center text-gray-300 md:text-left md:px-4'>
					<p>{username}</p>
					<p>{email}</p>
					<p className='capitalize'>{gender}</p>
					<p>
						<strong>Joined @</strong> {Joined}
					</p>
					{/* <div className='flex items-center justify-center gap-4 md:justify-normal'>
						<strong>Theme: </strong>
						{userTheme === 'dark' && (
							<span className='p-1 text-xl text-black bg-white rounded-lg'>
								<FaMoon />
							</span>
						)}
						{userTheme === 'light' && (
							<span className='text-xl p-[2px] bg-pink-500 text-white rounded-lg'>
								<BiSun />
							</span>
						)}
					</div> */}

					{role === 'BASIC' && (
						<div className='w-2/4 mx-auto mt-1 md:w-full'>
							<ProfilBtn
								name={'upgrade to Premium Account!'}
								size='sm'
								Value={'upgrade to Premium Account!'}
								onClick={() => push('/profile/upgrade-to-premuim')}
							/>
						</div>
					)}

					<div className='flex items-center justify-center w-full mx-auto my-2'>
						<ProfilBtn
							size={'lg'}
							name={'Edit Profile'}
							Value={'Edit Profile'}
							onClick={() => setIsDialogOpen(true)}
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center md:col-span-3'>
				<div className='w-[98%] border-2 border-pink-500 p-2 ml-[6px] md:ml-0 rounded-lg relative flex flex-col gap-3'>
					<p className='absolute px-1 text-white bg-black -top-3 left-1 filter backdrop-blur-sm'>Animes ({animes.length})</p>
					<ul className='flex flex-col justify-center gap-1 p-1 no-underline list-none'>
						<li>
							<Rating rating={average} />
						</li>
						<li className='flex items-center gap-4'>
							<p className='flex justify-self-start'>Avg Rating: </p>
							<p className='flex justify-self-end'>{average}</p>
						</li>
					</ul>
					<AnimeList animes={animes} />
				</div>
			</div>

			<dialog
				ref={dialogRef}
				className='w-[95%] md:w-[55%] min-h-[60vh] text-red-500 text-sm bg-gray-100/90 rounded-xl backdrop-blur'>
				<section className='flex flex-col gap-4 md:gap-7'>
					<div className='relative flex w-full p-2 text-white bg-pink-500'>
						<button
							type='button'
							name={`close edit profile Modal`}
							className={`peer/close flex self-end rounded-lg text-2xl p-1 bg-white text-pink-500 hover:bg-red-400 hover:text-white transition duration-500 ease-in-out hover:scale-105`}
							onClick={() => setIsDialogOpen(false)}>
							<IoMdClose />
						</button>
						<span className='absolute hidden text-sm text-pink-500 top-12 left-2 peer-hover/close:flex'>Minimize</span>
						<h1 className='flex items-center justify-center flex-1 text-xl font-semibold'>Update Profile</h1>
						<button
							type='button'
							name={`reset edit profile to default`}
							className={`peer/reset flex self-end rounded-lg text-2xl p-1 bg-white text-pink-500 hover:bg-green-400 hover:text-white transition duration-500 ease-in-out hover:scale-105`}
							onClick={() => setDetails(editProfileInitState)}>
							<IoMdRefresh />
						</button>
						<span className='absolute hidden text-sm text-pink-500 top-12 right-2 peer-hover/reset:flex'>Reset Profile to Default</span>
					</div>
					<EditProfile
						user={user}
						setDetails={setDetails}
						details={details}
						dispatch={dispatch}
						setIsDialogOpen={setIsDialogOpen}
					/>
				</section>
			</dialog>
		</>
	);
}
