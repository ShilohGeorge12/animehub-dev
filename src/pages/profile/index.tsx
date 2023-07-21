import { useContextApi } from '../../context';
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

function Profile() {
	const naviTo = useNavigate();
	const {
		state: { user, loggedIn, editProfileModal },
		dispatch,
	} = useContextApi();

	const { image, username, animes, email, role, theme, createdAt, gender } = user;
	const profileImage = URL.createObjectURL(new Blob([new Uint8Array(image.data.data)], { type: image.contentType }));
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
		<motion.section
			className='w-full h-full grid grid-cols-1 md:grid-cols-4'
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
						alt={username}
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
							// onClick={() => naviTo('/profile/editprofile')}
							onClick={() => dispatch({ type: 'editProfileModalOpen', payload: { open: true } })}
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center md:col-span-3'>
				<div className='w-[98%] border-2 border-pink-500 p-2 rounded-lg relative flex flex-col gap-3'>
					<p className='absolute -top-3 left-1 dark:bg-black text-white px-1 filter backdrop-blur-sm'>Animes ({animes.length})</p>
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
			{editProfileModal && <Modal element={<EditProfileModal />} />}
		</motion.section>
	);
}

export default Profile;
