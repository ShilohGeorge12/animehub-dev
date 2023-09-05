import { motion } from 'framer-motion';
import MetaData from '../../../components/metaData';
import { useMyContext } from '../../../context';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { GiAlliedStar } from 'react-icons/gi';
import { useFetch } from '../../../hooks/fetch';
import { AnimeType, devUrl, isAnime, isError, isUser, prodUrl } from '../../../types';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { Rating } from '../../../components/rating';
import Button from '../../../components/button';
import { Image } from '@chakra-ui/image';
// import { AnimeImageLoading } from '../../../components/loading';
import { AnimeLoadingSkeleton } from '../../../components/loading';

function ViewAnime() {
	const { id } = useParams();
	const { pathname } = useLocation();
	const naviTo = useNavigate();
	const {
		state: {
			user: { _id, animes },
		},
		dispatch,
	} = useMyContext();
	const [anime, setAnime] = useState<AnimeType | null>(null);
	const [isSuccess, setIsSuccess] = useState<boolean>(true);
	const [screenSize, setScreenSize] = useState<number>(1024);
	const [hasAnime, setHasAnime] = useState<boolean>(false);

	useEffect(() => {
		const hasAnimeWithId = animes.find((anime) => anime._id === id) ?? false;
		hasAnimeWithId ? setHasAnime(true) : setHasAnime(false);

		setScreenSize(window.innerWidth);
		setIsSuccess(false);
		useFetch(`/animes/${id}`, 'GET', 'default')
			.then((response) => {
				if (isAnime(response)) {
					setAnime(response);
					setTimeout(() => setIsSuccess(true), 1000);
					return;
				}
				if ('error' in response) {
					toast.error(JSON.stringify(response.error));
					setIsSuccess(true);
				}
			})
			.catch((err) => {
				if (!isError(err)) return;
				toast.error(err.message);
			});
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
	const listItemClass = 'text-white font-bold';

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
			toast.error(msg);
			return;
		}
		if (isUser(deleteAnime)) {
			dispatch({ type: 'user', payload: { user: deleteAnime } });
			toast.success(`Removed ${anime.title} from your collection`);
		}
	};

	const onAdd = async () => {
		if (!anime) return;
		const response = await useFetch(`users/${_id}/${id}`, 'GET', 'no-store');
		if ('error' in response) {
			const msg = typeof response.error === 'string' ? response.error : JSON.stringify(response.error);
			toast.error(msg);
			setTimeout(() => naviTo('/profile/upgrade-to-premuim'), 3000);
			return;
		}
		const User = await useFetch(`users/${_id}`, 'GET', 'no-store');
		if (isUser(User)) {
			dispatch({ type: 'user', payload: { user: User } });
			toast.success(`Added ${anime.title} To your collection`);
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
				<div className='flex items-center justify-center w-full h-full'>
					<span className='text-5xl text-white transition duration-500 animate-rotate'>
						<ImSpinner9 />
					</span>
				</div>
			)}

			{isSuccess && anime && (
				<div className={'grid grid-cols-1 md:grid-cols-4'}>
					<div className='flex items-start col-span-1 gap-1 p-2 md:flex-col md:gap-8 md:items-center'>
						<Image
							src={import.meta.env.VITE_MODE === 'development' ? `${devUrl}/images/${anime.image}` : `${prodUrl}/images/${anime.image}`}
							title={anime.title}
							alt={anime.title}
							loading='eager'
							fallback={
								<AnimeLoadingSkeleton
									width='w-28'
									height='h-full'
								/>
							}
							className={'w-28 rounded-md transition duration-300 hover:scale-110'}
						/>

						<ul className='flex flex-col justify-center w-full gap-2 px-1 text-sm text-pink-600 no-underline list-none md:text-base'>
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
					<div className='flex flex-col gap-6 p-2 md:col-span-3'>
						<h3 className='text-3xl font-bold tracking-wider'>{anime.title}</h3>
						{screenSize > 414 ? (
							<p className='text-sm font-semibold tracking-wider'>{<ParseDecription />}</p>
						) : (
							<details className=''>
								<summary className='text-lg font-semibold'>{anime.title} Description</summary>
								<p className='w-full overflow-y-scroll text-sm font-semibold tracking-wider h-52 text-ellipsis'>{<ParseDecription />}</p>
							</details>
						)}

						<div className='flex flex-col gap-4'>
							{hasAnime && (
								<span className='flex items-center gap-2'>
									<span className='text-4xl text-yellow-500 transition duration-300 hover:scale-110'>
										<GiAlliedStar />
									</span>
									<p className='text-lg font-semibold'>You Have {anime.title} in Your Collection!</p>
								</span>
							)}
						</div>
						{hasAnime && (
							<Button
								type='ViewAnime'
								name='delete Anime'
								onClick={onDelete}
								Value={`Remove ${anime.title} From Your Collection`}
							/>
						)}
						{!hasAnime && (
							<Button
								name='Add Anime'
								type='ViewAnime'
								onClick={onAdd}
								Value={`Add ${anime.title} To Your Collection`}
							/>
						)}
					</div>
				</div>
			)}
		</motion.section>
	);
}

export default ViewAnime;
