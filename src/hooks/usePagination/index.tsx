'use client';
import { useMyContext } from '@/context';
import { FetchingStatus, PaginationType, isAnimes, isAuthStatus, responseTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const usePagination: PaginationType = (options) => {
	const { animes, setAnimes, limitPerPage, totalAnimes, setTotalAnimes } = options;
	const [Page, setPage] = useState<number>(1);
	const [status, setStatus] = useState<FetchingStatus>('idle');
	const { push } = useRouter();
	const { dispatch } = useMyContext();

	const onPageChange = async (page: number) => {
		setStatus('fetching');
		fetch(`/api/animes?page=${page - 1}&perpage=${limitPerPage}`)
			.then((req) => req.json())
			.then((res: responseTypes) => {
				if ('error' in res) {
					const error = typeof res.error === 'string' ? res.error : res.error[0];
					toast.error(error);
					dispatch({ type: 'logOut', payload: { isloggedIn: false } });
					push('/login');
					return;
				}

				if (isAuthStatus(res) && res.authStatus === 'invalid token') {
					dispatch({ type: 'logOut', payload: { isloggedIn: false } });
					push('/login');
					return;
				}

				if (isAnimes(res)) {
					setAnimes(res.animes);
					setTotalAnimes(res.totalAnimes);
				}
			})
			.catch((err: Error) => toast.error(err.message))
			.finally(() => setStatus('idle'));
		setPage(page);
	};

	const startIndex = (1 - 1) * limitPerPage;
	const endIndex = startIndex + limitPerPage;
	const paginatedData = animes.slice(startIndex, endIndex);
	const len = Math.ceil(totalAnimes / limitPerPage);
	const pages = Array.from({ length: len }, (_, i) => i + 1);

	const PaginatedNav = () => {
		return (
			<ul className='flex mx-auto overflow-hidden rounded-lg w-fit last:border-r-0 last:border-white'>
				{pages.map((page) => (
					<li
						key={page}
						className={`flex items-center justify-center px-2 py-[6px] transition duration-700 ease-in-out text-lg hover:scale-110 ${
							page === Page ? 'bg-pink-500 text-white' : 'bg-white text-pink-500'
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

	return [PaginatedNav, paginatedData, status];
};
