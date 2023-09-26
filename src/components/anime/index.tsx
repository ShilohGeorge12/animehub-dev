import { AnimeType, devUrl, prodUrl } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Image } from '@chakra-ui/image';
import { AnimeLoadingSkeleton } from '../loading';

interface IAnimeProps {
	animes: AnimeType[];
}

function Anime({ animes }: IAnimeProps) {
	const naviTo = useNavigate();

	return (
		<div className='grid w-full grid-cols-2 gap-4 lg:grid-cols-4 place-items-center'>
			{animes &&
				Array.isArray(animes) &&
				animes.map((anime) => (
					<figure
						key={anime._id}
						className='flex flex-col items-center justify-center gap-2 transition duration-1000 ease-in-out rounded-lg group w-36 h-52'
						onClick={() => naviTo(`/anime/${anime._id}`)}>
						<Image
							src={import.meta.env.VITE_MODE === 'development' ? `${devUrl}/images/${anime.image}` : `${prodUrl}/images/${anime.image}`}
							title={anime.title}
							alt={anime.title}
							loading='eager'
							fallback={
								<AnimeLoadingSkeleton
									width='w-28'
									height='h-40'
								/>
							}
							className={`w-4/5 rounded-lg mx-auto transition duration-700 ease-in-out group-hover:scale-125`}
						/>
						<figcaption className='text-white text-sm font-bold text-ellipsis text-center group-hover:hidden group-hover:font-semibold overflow-hidden whitespace-nowrap w-[95%] mx-auto'>
							{anime.title}
						</figcaption>
					</figure>
				))}
		</div>
	);
}

export default Anime;
