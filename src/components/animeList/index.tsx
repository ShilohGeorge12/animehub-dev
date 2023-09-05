import { useNavigate } from 'react-router-dom';
import { AnimeType, devUrl, prodUrl } from '../../types';
import { Image } from '@chakra-ui/image';
import { AnimeLoadingSkeleton } from '../loading';

interface IAnimeListProps {
	animes: AnimeType[];
}

export function AnimeList(props: IAnimeListProps) {
	const { animes } = props;
	const naviTo = useNavigate();

	return (
		<div className={`w-full flex items-center overflow-x-scroll p-2 gap-3 `}>
			{animes.map((anime) => (
				<figure
					key={anime._id}
					className={`flex items-center`}
					onClick={() => naviTo(`/anime/${anime._id}`)}>
					<Image
						src={import.meta.env.VITE_MODE === 'development' ? `${devUrl}/images/${anime.image}` : `${prodUrl}/images/${anime.image}`}
						title={anime.title}
						alt={anime.title}
						loading='eager'
						fallback={
							<AnimeLoadingSkeleton
								width='w-20'
								height='h-full'
							/>
						}
						className='w-20 text-white transition duration-300 ease-in-out bg-pink-500 rounded-md cursor-pointer hover:scale-110'
					/>
				</figure>
			))}
		</div>
	);
}
