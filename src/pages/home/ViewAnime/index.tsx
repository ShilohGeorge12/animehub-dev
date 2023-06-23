import { motion } from 'framer-motion';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MetaData from '../../../container/meta';
import { Fragment, useEffect, useState } from 'react';
import { GiAlliedStar } from 'react-icons/gi';
import { GoInfo } from 'react-icons/go';
import { AiFillDelete } from 'react-icons/ai';
import { useFetch } from '../../../hooks/fetch';
import { AnimeType, isAnime, isError, isUser } from '../../../types';
import { BiErrorCircle } from 'react-icons/bi';
import { ImSpinner9 } from 'react-icons/im';
import { Rating } from '../../../container/rating';
import { useContextApi } from '../../../context';
import { toast } from 'react-toastify';

function ViewAnime() {
	const { id } = useParams();
	const { pathname } = useLocation();
	const naviTo = useNavigate();
	const {
		state: {
			user: { _id, animes },
		},
		dispatch,
	} = useContextApi();
	const [anime, setAnime] = useState<AnimeType | null>(null);
	const [isSuccess, setIsSuccess] = useState<boolean>(true);
	const [screenSize, setScreenSize] = useState<number>(1024);
	const [hasAnime, setHasAnime] = useState<boolean>(false);

	const autoClose = 2500;
	useEffect(() => {
		const hasAnimeWithId = animes.find((anime) => anime._id === id) ?? false;
		hasAnimeWithId ? setHasAnime(true) : setHasAnime(false);

		window.addEventListener('resize', () => setScreenSize(window.innerWidth));
		setIsSuccess(false);
		useFetch(`/animes/${id}`, 'GET', 'default')
			.then((response) => {
				if (isAnime(response)) {
					setAnime(response);
					setTimeout(() => setIsSuccess(true), 1000);
					return;
				}
				if ('error' in response) {
					toast(JSON.stringify(response.error), {
						type: 'default',
						autoClose,
						position: 'bottom-right',
						className: `justify-center bg-red-600 rounded-xl`,
						bodyClassName: 'text-sm text-white ',
						closeButton: false,
						pauseOnHover: true,
						icon: (
							<span className='px-1 py-2 rounded-md text-white text-xl'>
								<BiErrorCircle />
							</span>
						),
					});
					setIsSuccess(true);
				}
			})
			.catch((err) => {
				if (!isError(err)) return;
				toast(err.message, {
					type: 'default',
					autoClose,
					position: 'bottom-right',
					className: `justify-center bg-red-600 rounded-xl`,
					bodyClassName: 'text-sm text-white ',
					closeButton: false,
					pauseOnHover: true,
					icon: (
						<span className='px-1 py-2 rounded-md text-white text-xl'>
							<BiErrorCircle />
						</span>
					),
				});
			});
		return () => {
			window.removeEventListener('resize', () => setScreenSize(window.innerWidth));
		};
	}, []);

	useEffect(() => {
		const hasAnimeWithId = animes.find((anime) => anime._id === id) ?? false;
		hasAnimeWithId ? setHasAnime(true) : setHasAnime(false);
	}, [animes]);

	useEffect(() => {
		window.addEventListener('resize', () => setScreenSize(window.innerWidth));
		return () => {
			window.removeEventListener('resize', () => setScreenSize(window.innerWidth));
		};
	}, [window.innerWidth]);

	const Title = isSuccess && anime ? anime.title : 'anime';
	const Description = isSuccess && anime ? anime.description : 'anime description';
	const listItemClass = 'text-pink-500 font-bold';

	const ParseDecription = () => {
		if (isSuccess && anime) {
			return anime.description
				.replace(/\\u2014/g, ' ')
				.replace(/\\"/g, '"')
				.split('\\n')
				.map((line, index) => (
					<Fragment key={index}>
						{line}
						<br />
					</Fragment>
				));
		}
		return [<></>];
	};

	const onDelete = async () => {
		if (!anime) return;
		const deleteAnime = await useFetch(`users/${_id}/${id}`, 'DELETE', 'no-store');
		if ('error' in deleteAnime) {
			const msg = typeof deleteAnime.error === 'string' ? deleteAnime.error : JSON.stringify(deleteAnime.error);
			toast(msg, {
				type: 'default',
				autoClose: 6000,
				position: 'bottom-right',
				className: `justify-center bg-red-600 rounded-xl`,
				bodyClassName: 'text-sm text-white ',
				closeButton: false,
				pauseOnHover: true,
				icon: (
					<span className='px-1 py-2 rounded-md text-white text-xl'>
						<AiFillDelete />
					</span>
				),
			});
			return;
		}
		if (isUser(deleteAnime)) {
			dispatch({ type: 'user', payload: { user: deleteAnime } });
			toast(`Removed ${anime.title} from your collection`, {
				type: 'default',
				autoClose,
				position: 'bottom-right',
				className: `justify-center bg-green-600 rounded-xl`,
				bodyClassName: 'text-sm text-white ',
				closeButton: false,
				pauseOnHover: true,
				icon: (
					<span className='px-1 py-2 rounded-md text-white text-xl'>
						<GoInfo />
					</span>
				),
			});
		}
	};

	const onAdd = async () => {
		if (!anime) return;
		const response = await useFetch(`users/${_id}/${id}`, 'GET', 'no-store');
		if ('error' in response) {
			const msg = typeof response.error === 'string' ? response.error : JSON.stringify(response.error);
			toast(msg, {
				type: 'default',
				autoClose,
				position: 'top-center',
				className: `justify-center bg-red-600 rounded-xl`,
				bodyClassName: 'text-sm text-white ',
				closeButton: false,
				pauseOnHover: true,
				icon: (
					<span className='px-1 py-2 rounded-md text-white text-xl'>
						<AiFillDelete />
					</span>
				),
			});
			setTimeout(() => naviTo('/profile/upgrade-to-premuim'), 3000);
			return;
		}
		const User = await useFetch(`users/${_id}`, 'GET', 'no-store');
		if (isUser(User)) {
			dispatch({ type: 'user', payload: { user: User } });
			toast(`Added ${anime.title} To your collection`, {
				type: 'default',
				autoClose,
				position: 'bottom-right',
				className: `justify-center bg-green-600 rounded-xl`,
				bodyClassName: 'text-sm text-white ',
				closeButton: false,
				pauseOnHover: true,
				icon: (
					<span className='px-1 py-2 rounded-md text-white text-xl'>
						<GoInfo />
					</span>
				),
			});
		}
	};

	return (
		<motion.section
			className={`flex-1 flex flex-col`}
			initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
			animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
			exit={{ opacity: 0, translateZ: -100 }}
			transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
			<MetaData
				title={Title}
				description={Description}
				path={pathname}
			/>
			{!isSuccess && (
				<div className='w-full h-full flex items-center justify-center'>
					<span className='text-5xl text-pink-500 dark:text-white transition duration-500 animate-rotate'>
						<ImSpinner9 />
					</span>
				</div>
			)}

			{isSuccess && anime && (
				<div className={'grid grid-cols-1 md:grid-cols-4'}>
					<div className='col-span-1 flex md:flex-col gap-1 md:gap-8 items-start md:items-center p-2'>
						<img
							src={URL.createObjectURL(new Blob([new Uint8Array(anime.image.data.data)], { type: anime.image.contentType }))}
							title={anime.title}
							alt={anime.title}
							className={'w-28 rounded-md transition duration-300 hover:scale-110'}
						/>

						<ul className='list-none no-underline w-full flex flex-col justify-center px-1 gap-2 text-sm md:text-base'>
							<li className='flex gap-2'>
								Stars:
								<Rating
									size='text-sm'
									rating={anime.rating}
								/>
							</li>
							<li>
								Ratings: <span className={listItemClass}>{anime.rating}</span>
							</li>

							<li>
								Episodes: <span className={listItemClass}>{anime.episodes}</span>
							</li>

							<li>
								Duration: <span className={listItemClass}>{anime.duration}</span>
							</li>

							<li>
								Status: <span className={listItemClass}>{anime.status}</span>
							</li>
							<li>
								Airing: <span className={listItemClass}>{anime.airing ? 'currently Airing' : 'Not Airing'}</span>
							</li>
							<li>
								Aired: <span className={listItemClass}>{anime.aired}</span>
							</li>

							<li>
								Year Released: <span className={listItemClass}>{anime.year}</span>
							</li>

							<li>
								Seasons: <span className={listItemClass}>{anime.season}</span>
							</li>
						</ul>
					</div>
					<div className=' md:col-span-3 flex flex-col gap-6 p-2'>
						<h3 className='text-3xl font-bold tracking-wider'>{anime.title}</h3>
						{screenSize > 414 ? (
							<p className='text-sm font-semibold tracking-wider'>{<ParseDecription />}</p>
						) : (
							<details className=''>
								<summary className='text-lg font-semibold'>{anime.title} Description</summary>
								<p className='text-sm font-semibold tracking-wider w-full h-52 text-ellipsis overflow-y-scroll'>{<ParseDecription />}</p>
							</details>
						)}

						<div className='flex flex-col gap-4'>
							{hasAnime && (
								<span className='flex items-center gap-2'>
									<span className='text-4xl text-yellow-500 transition duration-300 hover:scale-110'>
										<GiAlliedStar />
									</span>
									<p className='text-lg font-semibold text-pink-600'>You Have {anime.title} in Your Collection!</p>
								</span>
							)}
						</div>
						{hasAnime && (
							<button
								type='button'
								className='w-fit bg-pink-500 text-white p-3 rounded-xl transition duration-300 hover:scale-110 hover:shadow-lg font-semibold '
								onClick={onDelete}>
								Remove {anime.title} From Your Collection
							</button>
						)}
						{!hasAnime && (
							<button
								type='button'
								className='w-fit bg-pink-500 text-white p-3 rounded-xl transition duration-300 hover:scale-110 hover:shadow-lg font-semibold '
								onClick={onAdd}>
								Add {anime.title} To Your Collection
							</button>
						)}
					</div>
				</div>
			)}
		</motion.section>
	);
}

export default ViewAnime;
