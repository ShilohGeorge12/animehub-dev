'use client';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
	const OnSearch = async () => {};
	return (
		<section className={`flex flex-col items-center w-full h-full gap-3 p-2`}>
			<form className={`w-4/5 md:w-2/4 flex flex-col items-center relative mx-auto h-fit text-white`}>
				<input
					type='text'
					// value={'query'}
					onChange={OnSearch}
					className={`w-full py-2 px-7 rounded-xl border-2 bg-black bg-opacity-70 border-black dark:bg-transparent border-opacity-25 dark:border-pink-500 outline-0 tracking-wider`}
				/>
				<span className='absolute text-pink-500 font-bold text-sm top-[14px] left-2'>
					<FaSearch />
				</span>
				{/* {!isSuccess && (
					<span className='absolute text-white font-bold text-sm top-[14px] right-2 animate-rotate'>
						<FaSpinner />
					</span>
				)}
				{isSuccess && query != '' && (
					<span className='absolute text-green-500 font-bold text-sm top-[14px] right-2'>
						<FaCheckCircle />
					</span>
				)} */}
			</form>
			<div className='flex flex-col items-center justify-center w-full gap-2'>
				{/* {isSuccess ? (
					<Anime animes={results} />
				) : (
					<div className='w-full min-h-[150px] flex flex-col items-center justify-end'>
						<span className='text-5xl text-white transition duration-500 animate-rotate'>
							<ImSpinner9 />
						</span>
					</div>
				)} */}
				{/* {isSuccess && query != '' && results.length === 0 && <p className='text-3xl'>"{query}" Not Found!</p>}
				<AnimeLoadingSkeleton
					width={'w-20'}
					height={'w-30'}
				/>
				<AnimeImageLoading /> */}
			</div>
		</section>
	);
}
