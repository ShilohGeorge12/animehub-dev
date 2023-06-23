import { Fragment } from 'react';
import { AnimeImageLoading } from '../../custom/loading';
import { AnimeType } from '../../types';
import { useNavigate } from 'react-router-dom';

interface IAnimeProps {
	animes: AnimeType[];
	isSuccess: boolean;
}

function Anime({ animes, isSuccess }: IAnimeProps) {
	const naviTo = useNavigate();
	return (
		<div className='w-full grid grid-cols-2 lg:grid-cols-4 place-items-center gap-4'>
			{animes &&
				Array.isArray(animes) &&
				animes.map((anime, index) => {
					const profileImage = URL.createObjectURL(new Blob([new Uint8Array(anime.image.data.data)], { type: anime.image.contentType }));

					return (
						<Fragment key={index}>
							{isSuccess ? (
								<div
									key={anime._id}
									className='group transition duration-1000 ease-in-out w-36 h-52 bg-pink-500 dark:bg-transparent border border-slate-300 dark:border-gray-800 hover:border-none hover:bg-transparent rounded-lg flex flex-col items-center justify-center gap-2'
									onClick={() => naviTo(`/anime/${anime._id}`)}>
									<img
										src={profileImage}
										title={anime.title}
										alt={anime.title}
										className={`w-4/5 rounded-lg mx-auto transition duration-700 ease-in-out group-hover:scale-125`}
										loading='lazy'
									/>
									<p className='text-white dark:text-white text-sm font-bold text-ellipsis text-center group-hover:hidden group-hover:font-semibold overflow-hidden whitespace-nowrap w-[95%] mx-auto'>
										{anime.title}
									</p>
								</div>
							) : (
								<AnimeImageLoading />
							)}
						</Fragment>
					);
				})}
		</div>
	);
}

export default Anime;
