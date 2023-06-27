import MetaData from '../../components/metaData';
import { useContextApi } from '../../context';
import notLoggedIn from '../../assets/images/others/lock.png';
import { motion } from 'framer-motion';

function Home() {
	const {
		state: {
			loggedIn,
			user: { theme: userTheme },
			theme,
		},
	} = useContextApi();
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
						Logged In
						{/* <Anime
							animes={paginatedAnimes}
							isSuccess={isSuccess}
							key={'AnimesComponent'}
						/>
						<div className='absolute bottom-2 left-1/6'>
							<PaginationNav />
						</div> */}
					</>
				)}
			</div>
		</motion.section>
	);
}

export default Home;
