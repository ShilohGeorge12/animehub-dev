import { useMyContext } from '../../context';
import userProfile from '../../assets/images/others/user2.png';
import { FaMoon } from 'react-icons/fa';
import { BiSun } from 'react-icons/bi';
import Button from '../../components/button';
import { useNavigate } from 'react-router-dom';
import { AnimeList } from '../../components/animeList';
import { Rating } from '../../components/rating';
import { motion } from 'framer-motion';
import MetaData from '../../components/metaData';
import { EditProfileModal } from './editProfileModal';
import { Modal } from '../../modal';
import { devUrl, prodUrl } from '../../types';

function Profile() {
	const naviTo = useNavigate();
	const {
		state: { user, loggedIn, editProfileModal },
		dispatch,
	} = useMyContext();

	const { image, username, animes, email, role, theme, createdAt, gender } = user;
	const Joined = new Date(createdAt).toDateString();

	const profileImage = import.meta.env.VITE_MODE === 'development' ? `${devUrl}/images/${image}` : `${prodUrl}/images/${image}`;

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
			className='grid w-full h-full grid-cols-1 md:grid-cols-4'
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
				<div className='flex items-center justify-center w-full'>
					<img
						src={loggedIn ? profileImage : userProfile}
						title={username}
						alt={username}
						loading='lazy'
						className='w-1/3 mx-auto rounded-md md:w-2/4'
					/>
				</div>
				<div className='flex flex-col w-full gap-1 text-center md:text-left md:px-4 dark:text-gray-300'>
					<p>{username}</p>
					<p>{email}</p>
					<p className='capitalize'>{gender}</p>
					<p>
						<strong>Joined @</strong> {Joined}
					</p>
					<div className='flex items-center justify-center gap-4 md:justify-normal'>
						<strong>Theme: </strong>
						{theme === 'dark' && (
							<span className='p-1 text-xl text-white bg-black rounded-lg dark:bg-white dark:text-black'>
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
						<div className='w-2/4 mx-auto mt-1 md:w-full'>
							<Button
								type={'profile'}
								name={'upgrade to Premium Account!'}
								size='sm'
								Value={'upgrade to Premium Account!'}
								onClick={() => naviTo('/profile/upgrade-to-premuim')}
							/>
						</div>
					)}

					<div className='flex items-center justify-center w-full mx-auto my-2'>
						<Button
							type={'profile'}
							size={'lg'}
							name={'Edit Profile'}
							Value={'Edit Profile'}
							onClick={() => dispatch({ type: 'editProfileModalOpen', payload: { open: true } })}
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center md:col-span-3'>
				<div className='w-[98%] border-2 border-pink-500 p-2 rounded-lg relative flex flex-col gap-3'>
					<p className='absolute px-1 text-white -top-3 left-1 dark:bg-black filter backdrop-blur-sm'>Animes ({animes.length})</p>
					<ul className='flex flex-col justify-center gap-1 p-1 no-underline list-none'>
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
			{editProfileModal && <Modal element={<EditProfileModal />} />}
		</motion.section>
	);
}

export default Profile;
