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
import { BiErrorCircle } from 'react-icons/bi';

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
					if (isError(err))
						toast(err.message, {
							type: 'default',
							autoClose: 6000,
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
				title='animehub.dev'
				description='This is AnimeHub where you can get all animes of different genres and categories.'
				path={'/'}
				theme={loggedIn ? userTheme : theme}
			/>
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
			<div className='flex flex-col gap-3 items-center justify-center'>
				{loggedIn && (
					<>
						<Anime
							animes={paginatedAnimes}
							isSuccess={isSuccess}
							key={'AnimesComponent'}
						/>
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
