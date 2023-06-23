import MetaData from '../../container/meta';
import { useContextApi } from '../../context';
import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/fetch';
import { AnimeType, isAnimes, isError } from '../../types';
import Anime from '../../container/anime';
import { toast } from 'react-toastify';
import notLoggedIn from '../../assets/images/login.png';
import usePagination from '../../hooks/pagination';
import { motion } from 'framer-motion';

interface IHomeProps {}

function Home(props: IHomeProps) {
	const {} = props;
	const {
		state: {
			theme,
			loggedIn,
			user: { theme: userTheme },
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
						toast.error(err.name, {
							pauseOnHover: true,
							position: 'bottom-right',
						});
					setIsSuccess(true);
				});
		}
	}, [loggedIn]);

	return (
		<motion.section
			className={`flex-1 relative`}
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
			<p className='text-2xl text-pink-600 dark:text-white font-bold text-center'>All Animes</p>
			{!loggedIn && (
				<div className='flex h-[80%] items-center justify-center'>
					<img
						src={notLoggedIn}
						alt='notLoggedIn'
						title='notLoggedIn'
					/>
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
