import { motion } from 'framer-motion';

interface IAnimesProps {}

function Cart(props: IAnimesProps) {
	const {} = props;

	return (
		<motion.section
			className='w-full h-full'
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
			transition={{ duration: 0.9, type: 'spring', damping: 10, stiffness: 150 }}></motion.section>
	);
}

export default Cart;
