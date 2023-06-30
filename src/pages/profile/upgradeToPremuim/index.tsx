import { motion } from 'framer-motion';
import MetaData from '../../../components/metaData';
import { useLocation } from 'react-router-dom';

function UpgradeToPremuim() {
	const { pathname } = useLocation();
	return (
		<motion.section
			className={`flex-1 flex flex-col`}
			initial={{ opacity: 0, translateX: '-100vw', translateZ: -100 }}
			animate={{ opacity: 1, translateX: '0vw', translateZ: 0 }}
			exit={{ opacity: 0, translateX: '100vw' }}
			transition={{ duration: 0.5 }}>
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
