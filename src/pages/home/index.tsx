import MetaData from '../../components/metaData';
import { useContextApi } from '../../context';
import notLoggedIn from '../../assets/images/others/lock.png';
import { motion } from 'framer-motion';
import Anime from '../../components/anime';
import { useEffect, useState } from 'react';
import { AnimeType, isAnimes, isError } from '../../types';
import usePagination from '../../hooks/pagination';
import { useFetch } from '../../hooks/fetch';
import { toast } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im';

function Home() {
	const {
		state: {
			loggedIn,
			user: { theme: userTheme },
			theme,
		},
	} = useContextApi();
	const [animes, setAnimes] = useState<AnimeType[]>([]);
	const [limitPerPage, setLimitPerPage] = useState<number>(8);
	const [totalAnimes, setTotalAnimes] = useState<number>(0);
	const [isSuccess, setIsSuccess] = useState<boolean>(true);

	const [PaginationNav, paginatedAnimes] = usePagination({
		animes,
		limitPerPage,
		totalAnimes,
		setAnimes,
		setLimitPerPage,
		setTotalAnimes,
		setIsSuccess,
	});

	useEffect(() => {
		if (loggedIn) {
			setIsSuccess(false);
			useFetch(`animes?page=0&perpage=${limitPerPage}`, 'GET', 'no-cache')
				.then((response) => {
					if (isAnimes(response)) {
						setAnimes(response.animes);
						setTotalAnimes(response.totalAnimes);
						setTimeout(() => setIsSuccess(true), 500);
					}
				})
				.catch((err) => {
					if (isError(err)) toast(err.message);
					setIsSuccess(true);
				});
		}
	}, [loggedIn]);

	return (
		<motion.section
			className={`w-full h-full relative`}
			initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
			animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
			exit={{ opacity: 0, translateZ: -100 }}
			transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
			<MetaData
				title='animehub-dev | Experience anime like never before'
				description='animehub: Your go-to for renting, streaming, and enjoying top-notch anime content. Discover new releases, dive into captivating storytelling.'
				path={'/'}
				theme={loggedIn ? userTheme : theme}
			/>
			<article className='hidden'>
				<h2>
					Welcome to <strong>AnimeHub-Dev</strong>, your ultimate destination for renting, watching, and streaming high-quality anime content. Immerse yourself in a world
					of captivating
				</h2>
				storytelling, vibrant characters, and visually stunning animations. At AnimeHub-Dev, we pride ourselves on providing a seamless and immersive anime streaming
				experience. Our extensive collection boasts a diverse range of anime series and movies, carefully curated to cater to all anime enthusiasts. Whether you're a
				seasoned fan or just starting your anime journey, we have something for everyone.
				<h3>
					Discover the latest and hottest anime releases on our platform. Stay up to date with the most anticipated shows, explore new genres, and indulge in your
					favorite anime genres.
				</h3>
				Our intuitive recommendation system suggests personalized picks based on your preferences, ensuring you never miss out on hidden gems. Experience anime like never
				before with our exceptional video quality. We prioritize delivering crystal-clear visuals and immersive audio, allowing you to fully appreciate the intricate
				details and vibrant colors of each frame. Whether you're streaming on your computer, smartphone, or smart TV, AnimeHub-Dev ensures a seamless viewing experience
				across all devices. Renting anime series has never been easier. With AnimeHub-Dev, you can access an extensive catalog of titles available for rental. Enjoy the
				flexibility of choosing what to watch and when to watch it. Whether you prefer marathoning through a whole season or savoring one episode at a time, the choice is
				yours.
				<h4>
					Join our passionate community of anime lovers and engage in discussions, reviews, and recommendations. Connect with fellow fans, share your thoughts, and embark
					on a collective journey through the vast world of anime. Don't miss out on the excitement.
				</h4>
				Unlock a world of captivating stories, unforgettable characters, and breathtaking visuals at AnimeHub-Dev. Start your anime adventure today and let us be your
				trusted companion on this exhilarating journey.
			</article>
			<p className='text-2xl text-white font-bold text-center'>All Animes</p>
			{!loggedIn && (
				<div className='flex flex-col h-[80%] items-center justify-center gap-4'>
					<img
						src={notLoggedIn}
						alt='Not LoggedIn'
						title='Not LoggedIn'
						className='md:w-1/5 w-1/2 transition duration-300 hover:scale-110'
					/>
					<p className='text-3xl font-bold tracking-wider'>Your Logged Out!</p>
				</div>
			)}
			<div className={`flex flex-col gap-3 items-center justify-center`}>
				{loggedIn && (
					<>
						{isSuccess ? (
							<Anime animes={paginatedAnimes} />
						) : (
							<div className='w-full min-h-[250px] flex flex-col items-center justify-end'>
								<span className='text-5xl text-white transition duration-500 animate-rotate'>
									<ImSpinner9 />
								</span>
							</div>
						)}
						<div className='absolute bottom-2 left-1/6'>
							<PaginationNav />
						</div>
					</>
				)}
			</div>
		</motion.section>
	);
}

export default Home;
