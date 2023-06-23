import { motion } from 'framer-motion';
import MetaData from '../../../container/meta';
import { useLocation } from 'react-router-dom';

function UpgradeToPremuim() {
	const { pathname } = useLocation();
	return (
		<motion.section
			className={`flex-1 flex flex-col`}
			initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
			animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
			exit={{ opacity: 0, translateZ: -100 }}
			transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
			<MetaData
				title={'Upgrade To Premium'}
				description={'Upgrade To Premium Account To Enjoy All Features'}
				path={pathname}
			/>
			upgrade To Premium
		</motion.section>
	);
}

export default UpgradeToPremuim;
