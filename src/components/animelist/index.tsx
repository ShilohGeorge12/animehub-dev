'use client';
import Image from 'next/image';
import { AnimeType } from '../../types';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';

interface IAnimeListProps {
	animes: AnimeType[];
}

export function AnimeList(props: IAnimeListProps) {
	const { animes } = props;
	const { push } = useRouter();

	return (
		<section className={`w-full flex items-center overflow-x-scroll p-2 gap-3 `}>
			{animes.map((anime) => (
				<figure
					aria-label={anime.title}
					key={anime._id}
					className={`flex items-center`}
					onClick={() => push(`/anime/${anime._id}`)}>
					<Image
						src={`/cover/${anime.image}`}
						title={anime.title}
						alt={anime.title}
						loading='eager'
						className='w-20 text-white transition duration-300 ease-in-out bg-pink-500 rounded-md cursor-pointer hover:scale-110'
						width={100}
						height={100}
					/>
				</figure>
			))}
		</section>
	);
}

const AnimeLoadingSkeleton = ({ width, height }: { width: string; height: string }) => {
	return <div className={`${width} ${height} mx-auto transition duration-700 ease-in-out bg-pink-300 rounded-lg group-hover:scale-125 animate-pulse`} />;
};
