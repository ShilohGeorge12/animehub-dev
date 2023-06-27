import { motion } from 'framer-motion';
import { ChangeEvent, useState } from 'react';
import { FaSearch, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { useFetch } from '../../hooks/fetch';
import { AnimeType, isSearchResult } from '../../types';
// import Anime from '../../container/anime';
import { toast } from 'react-toastify';
import MetaData from '../../components/metaData';

interface ISearchProps {}

function Search(props: ISearchProps) {
	const {} = props;
	const [query, setQuery] = useState<string>('');
	const [isSuccess, setIsSuccess] = useState<boolean>(true);
	const [results, setResults] = useState<AnimeType[]>([]);

	const OnSearch = async (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setIsSuccess(false);
		setQuery(value);
		if (value === '' || /^\s/.test(value)) {
			setResults([]);
			setTimeout(() => setIsSuccess(true), 1000);
			return;
		}
		const response = await useFetch(`/search?value=${value}`, 'GET', 'default');
		if ('error' in response) {
			setResults([]);
			toast.info(response.error, { position: 'top-center' });
			setTimeout(() => setIsSuccess(true), 1000);
			return;
		}
		if (isSearchResult(response)) {
			setResults(response.results);
			setTimeout(() => setIsSuccess(true), 1000);
			return;
		}
	};

	return (
		<motion.section
			className='w-full h-full flex flex-col p-2 gap-3 items-center'
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
			transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
			<MetaData
				title='Search'
				description='Search For Your Favourite Animes Here! in AnimeHub.dev!'
				path='/search'
			/>
			<form className={`w-4/5 md:w-2/4 flex flex-col items-center relative mx-auto h-fit`}>
				<input
					type='text'
					value={query}
					onChange={OnSearch}
					className={`w-full py-2 px-7 rounded-xl dark:text-white bg-transparent border-2 border-pink-500 outline-0 tracking-wider`}
				/>
				<span className='absolute text-pink-500 font-bold text-sm top-[14px] left-2'>
					<FaSearch />
				</span>
				{!isSuccess && (
					<span className='absolute text-white font-bold text-sm top-[14px] right-2 animate-rotate'>
						<FaSpinner />
					</span>
				)}
				{isSuccess && query != '' && (
					<span className='absolute text-green-500 font-bold text-sm top-[14px] right-2'>
						<FaCheckCircle />
					</span>
				)}
			</form>
			<div className='w-full flex flex-col gap-2 items-center justify-center'>
				{/* <Anime
					animes={results}
					isSuccess={isSuccess}
				/> */}
			</div>
		</motion.section>
	);
}

export default Search;
