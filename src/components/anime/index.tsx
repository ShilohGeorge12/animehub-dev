import { AnimeType } from '../../types';
import { useNavigate } from 'react-router-dom';

interface IAnimeProps {
	animes: AnimeType[];
}

function Anime({ animes }: IAnimeProps) {
	const naviTo = useNavigate();
	return (
		<div className='w-full grid grid-cols-2 lg:grid-cols-4 place-items-center gap-4'>
			{animes &&
				Array.isArray(animes) &&
				animes.map((anime) => {
					const profileImage = URL.createObjectURL(new Blob([new Uint8Array(anime.image.data.data)], { type: anime.image.contentType }));

					return (
						<figure
							key={anime._id}
							className='group transition duration-1000 ease-in-out w-36 h-52 rounded-lg flex flex-col items-center justify-center gap-2'
							onClick={() => naviTo(`/anime/${anime._id}`)}>
							<img
								src={profileImage}
								title={anime.title}
								alt={anime.title}
								loading='lazy'
								className={`w-4/5 rounded-lg mx-auto transition duration-700 ease-in-out group-hover:scale-125`}
							/>
							<figcaption className='text-white text-sm font-bold text-ellipsis text-center group-hover:hidden group-hover:font-semibold overflow-hidden whitespace-nowrap w-[95%] mx-auto'>
								{anime.title}
							</figcaption>
						</figure>
					);
				})}
		</div>
	);
}

export default Anime;
