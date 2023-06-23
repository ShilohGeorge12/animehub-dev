import { useNavigate } from 'react-router-dom';
import { AnimeType } from '../../types';

interface IAnimeListProps {
	animes: AnimeType[];
}

export function AnimeList(props: IAnimeListProps) {
	const { animes } = props;
	const naviTo = useNavigate();

	return (
		<div className={`w-full flex items-center  ${animes.length > 3 ? 'overflow-x-scroll' : 'overflow-auto'} p-2 gap-3 `}>
			{animes.map((anime) => (
				<div
					key={anime._id}
					className={`flex items-center`}
					onClick={() => naviTo(`/anime/${anime._id}`)}>
					<img
						src={anime.image && anime.image.data ? URL.createObjectURL(new Blob([new Uint8Array(anime.image.data.data)], { type: anime.image.contentType })) : ''}
						title={anime.title}
						className='w-20 rounded-md bg-pink-500 text-white transition duration-300 ease-in-out hover:scale-110 cursor-pointer'
					/>
				</div>
			))}
		</div>
	);
}
