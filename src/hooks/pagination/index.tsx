import { useEffect, useState } from 'react';
import { PaginationType, isAnimes } from '../../types';
import { useFetch } from '../fetch';
import { toast } from 'react-toastify';

const usePagination: PaginationType = (options) => {
	const { animes, setAnimes, limitPerPage, totalAnimes, setLimitPerPage, setTotalAnimes, setIsSuccess } = options;
	const [Page, setPage] = useState<number>(1);

	const onPageChange = (page: number) => {
		setIsSuccess(false);
		useFetch(`animes?page=${page - 1}&perpage=${limitPerPage}`, 'GET', 'force-cache')
			.then((res) => {
				if ('error' in res) toast.error(res.error);
				if (isAnimes(res)) {
					setAnimes(res.animes);
					setTotalAnimes(res.totalAnimes);
					setIsSuccess(true);
				}
			})
			.catch((err: Error) => toast.error(err.message));
		setPage(page);
	};

	const startIndex = (1 - 1) * limitPerPage;
	const endIndex = startIndex + limitPerPage;
	const paginatedData = animes.slice(startIndex, endIndex);
	const len = Math.ceil(totalAnimes / limitPerPage);
	const pages = Array.from({ length: len }, (_, i) => i + 1);

	const widthChecks = () => {
		if (window.innerWidth <= 400) {
			setLimitPerPage(4);
			return;
		}
		if (window.innerWidth <= 800) {
			setLimitPerPage(6);
			return;
		}
		if (window.innerWidth >= 800 && window.innerWidth <= 960) {
			setLimitPerPage(4);
			return;
		}
		if (window.innerWidth <= 1024) {
			setLimitPerPage(8);
			return;
		} else {
			setLimitPerPage(8);
			return;
		}
	};

	useEffect(() => {
		window.addEventListener('resize', widthChecks);
		return () => {
			widthChecks();
			window.removeEventListener('resize', widthChecks);
		};
	}, [window.innerWidth]);

	useEffect(() => {
		widthChecks();
	}, []);

	const PaginatedNav = () => {
		return (
			<ul className='w-fit flex rounded-lg mx-auto overflow-hidden last:border-r-0 last:border-white'>
				{pages.map((page) => (
					<li
						key={page}
						className={`flex items-center justify-center w-9 h-9 transition duration-700 ease-in-out text-lg hover:text-2xl ${
							page === Page ? 'bg-pink-500 dark:bg-pink-600 text-white' : 'bg-white dark:bg-neutral-900 text-pink-500'
						}`}>
						<button
							type='button'
							className='w-full h-full font-bold'
							onClick={() => onPageChange(page)}>
							{page}
						</button>
					</li>
				))}
			</ul>
		);
	};

	return [PaginatedNav, paginatedData];
};

export default usePagination;
