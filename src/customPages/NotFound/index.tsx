import { motion } from 'framer-motion';
import sadHime from '../../assets/images/others/sad-hime.webp';
import { useLocation, useNavigate } from 'react-router-dom';
import MetaData from '../../components/metaData';

function NotFound() {
	const naviTo = useNavigate();
	const { pathname } = useLocation();
	return (
		<motion.section
			className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-8`}
			initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
			animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
			exit={{ opacity: 0, translateZ: -100 }}
			transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
			<MetaData
				title={'404 | NotFound'}
				description={'404 Page NotFound'}
				path={pathname}
			/>
			<img
				src={sadHime}
				loading='eager'
				alt='sadhime'
				title='sadhime'
				className={`w-4/5 md:w-auto`}
			/>
			<div className='flex flex-col items-center gap-4'>
				<div className='flex gap-1 items-center text-xl'>
					<p className='bg-red-500 py-2 px-3 text-white rounded-lg transition duration-300 hover:scale-105'>{pathname}</p>
					<p className=''>is Not Found</p>
				</div>
				<button
					className={`p-2 bg-pink-500 text-white rounded-lg transition duration-500 hover:shadow-md hover:scale-110`}
					onClick={() => naviTo('/')}>
					Back To Home Page
				</button>
			</div>
		</motion.section>
	);
}

export default NotFound;
