import { motion } from 'framer-motion';
import MetaData from '../../../components/metaData';
import { useLocation } from 'react-router-dom';

interface IEditProfileProps {}

function EditProfile(props: IEditProfileProps) {
	const {} = props;
	const { pathname } = useLocation();
	return (
		<motion.section
			className={`w-full h-full flex flex-col`}
			initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
			animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
			exit={{ opacity: 0, translateZ: -100 }}
			transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
			<MetaData
				title={'Upgrade To Premium'}
				description={'Upgrade To Premium Account To Enjoy All Features'}
				path={pathname}
			/>
			Edit Profile
		</motion.section>
	);
}

export default EditProfile;
