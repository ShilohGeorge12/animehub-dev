import { useEffect, useState } from 'react';

export function AnimeImageLoading() {
	return <div className='w-[144px] h-[208px] transition duration-500 ease-in-out bg-slate-400 dark:bg-gray-600 rounded-lg animate-pulse' />;
}

export function AnimeComponentLoading() {
	const [len, setLen] = useState<number>(8);

	useEffect(() => {
		window.addEventListener('load', lenChecks);
		return () => {
			lenChecks();
			window.removeEventListener('resize', lenChecks);
		};
	}, [window.innerWidth]);

	const lenChecks = () => {
		if (window.innerWidth <= 400) {
			setLen(4);
			return;
		}
		if (window.innerWidth <= 800) {
			setLen(6);
			return;
		}
		if (window.innerWidth >= 800 && window.innerWidth <= 960) {
			setLen(4);
			return;
		}
		if (window.innerWidth <= 1024) {
			setLen(8);
			return;
		} else {
			setLen(8);
		}
	};

	const arr = Array.from({ length: len }, (_, i) => i + 1);
	return (
		<section className='w-full flex flex-col items-center gap-4'>
			<div className='w-full h-[432px] grid grid-cols-2 lg:grid-cols-4 place-items-center gap-4'>
				{arr.map((image) => (
					<AnimeImageLoading key={image} />
				))}
			</div>
			{/* <PaginationNavBar /> */}
		</section>
	);
}
