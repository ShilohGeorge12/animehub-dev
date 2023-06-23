import { useContextApi } from '../../context';
import userProfile from '../../assets/images/user2.png';
import { FaMoon, FaBell } from 'react-icons/fa';
import { BiSun } from 'react-icons/bi';
import Button from '../../container/button';
import { MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AnimeList } from '../../container/animeList';
import { Rating } from '../../container/rating';
import { motion } from 'framer-motion';
import MetaData from '../../container/meta';

interface IProfileProps {}

function Profile(props: IProfileProps) {
	const {} = props;
	const naviTo = useNavigate();
	const {
		state: { user, loggedIn },
	} = useContextApi();

	const { image, username, animes, email, role, theme, createdAt, gender } = user;
	const profileImage = URL.createObjectURL(new Blob([new Uint8Array(image.data.data)], { type: image.contentType }));
	const Joined = new Date(createdAt).toDateString();

	const onUpgradeAcc = () => {
		toast.info('upgrade Account To Premium To Get All features', { position: 'bottom-right', autoClose: 3000, icon: FaBell });
	};
	const onEditProfil = (_e: MouseEvent<HTMLButtonElement>) => {
		naviTo('/profile/editprofile');
	};

	const calculateAverageRating = (ratings: number[]): number => {
		const sum = ratings.reduce((acc, rating) => acc + rating, 0);
		const average = sum / ratings.length;
		return Number(average.toFixed(2));
	};
	const arr: number[] = [];
	animes.map((anime) => arr.push(anime.rating));
	const average: number = calculateAverageRating(arr);

	return (
		<motion.section
			className='flex-1 grid grid-cols-1 md:grid-cols-4'
			initial={{ opacity: 0, translateX: '-100vw', translateZ: -100 }}
			animate={{ opacity: 1, translateX: '0vw', translateZ: 0 }}
			exit={{ opacity: 0, translateX: '100vw' }}
			transition={{ duration: 0.5 }}>
			<MetaData
				title='Profile'
				description='View Users animehub Profile'
				path='/profile'
			/>
			<div className='flex flex-col items-center gap-4'>
				<div className='w-full flex items-center justify-center'>
					<img
						src={loggedIn ? profileImage : userProfile}
						title={username}
						loading='lazy'
						className='w-1/3 md:w-2/4 mx-auto rounded-md'
					/>
				</div>
				<div className='w-full flex flex-col gap-1 text-center md:text-left md:px-4 dark:text-gray-300'>
					<p>{username}</p>
					<p>{email}</p>
					<p className='capitalize'>{gender}</p>
					<p>
						<strong>Joined @</strong> {Joined}
					</p>
					<div className='flex items-center justify-center md:justify-normal gap-4'>
						<strong>Theme: </strong>
						{theme === 'dark' && (
							<span className='text-xl p-1 bg-black text-white dark:bg-white dark:text-black rounded-lg'>
								<FaMoon />
							</span>
						)}
						{theme === 'light' && (
							<span className='text-xl p-[2px] bg-pink-500 text-white rounded-lg'>
								<BiSun />
							</span>
						)}
					</div>

					{role === 'BASIC' && (
						<div className='w-2/4 md:w-full mx-auto mt-1'>
							<Button
								type={'profile'}
								size='sm'
								Value={'upgrade to Premium Account!'}
								onClick={onUpgradeAcc}
							/>
						</div>
					)}

					<div className='flex items-center justify-center w-full mx-auto my-2'>
						<Button
							type={'profile'}
							size={'lg'}
							Value={'Edit Profile'}
							onClick={onEditProfil}
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center md:col-span-3'>
				<div className='w-[98%] border-2 border-pink-500 p-2 rounded-lg relative flex flex-col gap-3'>
					<p className='absolute -top-3 left-1 bg-slate-300 dark:bg-black text-gray-900 dark:text-white px-1'>Animes ({animes.length})</p>
					<ul className='list-none no-underline flex flex-col justify-center p-1 gap-1'>
						<li className=''>
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
		</motion.section>
	);
}

export default Profile;
