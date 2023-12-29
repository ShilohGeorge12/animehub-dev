'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Metadata } from 'next';

// const metaData: Metadata = {
// 	title: 'An Error Unexpected Error Occured!',
// 	description: 'An Error Unexpected Error Occured please reset or return to the home page',
// };

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	console.log(error.message);
	return (
		<motion.section
			className='flex flex-col items-center justify-center flex-1 w-full h-full'
			initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
			animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
			exit={{ opacity: 0, translateZ: -100 }}
			transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
			<section className='w-[95%] md:w-[50%] h-[60vh] flex flex-col items-center justify-center gap-8 md:flex-row bg-black/70 rounded-lg'>
				<Image
					src='/error.png'
					className='w-[65%] iphone_sm:w-[50%] iphone_md:w-[45%] lg:w-[40%] transition transform hover:translate-y-3 hover:-translate-x-5 hover:scale-110'
					loading='eager'
					title='error Something went wrong'
					alt='error Something went wrong'
					width={1000}
					height={1000}
				/>
				<section className='flex flex-col items-center gap-5'>
					<p className='text-2xl font-bold tracking-wider text-white capitalize iphone_sm:text-lg iphone_md:text-xl md:text-lg'> Something Went Wrong! </p>
					<button
						type='button'
						onClick={() => reset()}
						className='p-2 text-xl font-medium text-red-500 transition duration-500 ease-in-out bg-red-200 rounded-lg md:ext-lg hover:text-white hover:scale-110 hover:bg-red-500'>
						Try again
					</button>
				</section>
			</section>
		</motion.section>
	);
}
