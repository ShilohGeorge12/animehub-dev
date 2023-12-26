import Image from 'next/image';
import { AnimeType, FetchingStatus } from '../../types';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

interface AnimeProps {
	animes: AnimeType[];
	status: FetchingStatus;
}

export function Anime({ animes, status }: AnimeProps) {
	const { push } = useRouter();

	return (
		<div className='grid w-full h-[80%] w-xsm:grid-cols-1 iphone_sm:h-[450px] iphone_md:h-[660px] iphone_lg:h-[660px] md:h-full grid-cols-2 gap-4 overflow-y-scroll md:grid-cols-3 lg:grid-cols-4 place-items-center'>
			{animes &&
				Array.isArray(animes) &&
				animes.map((anime) => (
					<Fragment key={anime._id}>
						{status === 'fetching' && (
							<span className='flex transition duration-1000 ease-in-out rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500 w-36 h-52' />
						)}

						{status === 'idle' && (
							<figure
								className='flex flex-col items-center justify-center gap-2 transition duration-1000 ease-in-out rounded-lg group w-36 h-52'
								onClick={() => push(`/anime/${anime._id}`)}>
								<Image
									src={`/cover/${anime.image}`}
									title={anime.title}
									alt={anime.title}
									loading='eager'
									width={100}
									height={100}
									placeholder='blur'
									blurDataURL='data:U4H0*O0400t0D##8%$Kj0w^*8_rJ3G^iFK#m'
									className={`w-4/5 rounded-lg mx-auto transition duration-700 ease-in-out group-hover:scale-125`}
								/>
								<figcaption className='text-white text-sm font-bold text-ellipsis text-center group-hover:hidden group-hover:font-semibold overflow-hidden whitespace-nowrap w-[95%] mx-auto'>
									{anime.title}
								</figcaption>
							</figure>
						)}
					</Fragment>
				))}
		</div>
	);
}
