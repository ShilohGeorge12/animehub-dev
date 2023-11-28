'use client';
import { VeiwAnimeBtn } from '@/components/button';
import { useMyContext } from '@/context';
import { AnimeType } from '@/types';
import { useEffect, useState } from 'react';
import { GiAlliedStar } from 'react-icons/gi';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { IoIosAddCircle } from 'react-icons/io';
import { toast } from 'sonner';

interface animeContentProp {
	animeId: string;
	anime: AnimeType;
}

export function AnimeContent({ animeId, anime }: animeContentProp) {
	const {
		state: {
			user: { _id, animes },
		},
		dispatch,
	} = useMyContext();
	const [hasAnime, setHasAnime] = useState<boolean>(false);

	const onDelete = async () => {
		if (!anime) return;
		// const deleteAnime = await useFetch(`users/${_id}/${id}`, 'DELETE', 'no-store');
		// if ('error' in deleteAnime) {
		// 	const msg = typeof deleteAnime.error === 'string' ? deleteAnime.error : JSON.stringify(deleteAnime.error);
		// 	toast.error(msg);
		// 	return;
		// }
		// if (isUser(deleteAnime)) {
		// 	dispatch({ type: 'user', payload: { user: deleteAnime } });
		toast.success(`Removed ${anime.title} from your collection`);
		// }
	};

	const onAdd = async () => {
		if (!anime) return;
		// const response = await useFetch(`users/${_id}/${id}`, 'GET', 'no-store');
		// if ('error' in response) {
		// 	const msg = typeof response.error === 'string' ? response.error : JSON.stringify(response.error);
		// 	toast.error(msg);
		// 	setTimeout(() => naviTo('/profile/upgrade-to-premuim'), 3000);
		// 	return;
		// }
		// const User = await useFetch(`users/${_id}`, 'GET', 'no-store');
		// if (isUser(User)) {
		// 	dispatch({ type: 'user', payload: { user: User } });
		toast.success(`Added ${anime.title} To your collection`);
		// }
	};

	useEffect(() => {
		const hasAnimeWithId = animes.find((anime) => anime._id === animeId) ?? false;
		hasAnimeWithId ? setHasAnime(true) : setHasAnime(false);
	}, [animes]);

	return (
		<>
			<div className='flex flex-col gap-4'>
				{hasAnime && (
					<span className='flex items-center gap-2'>
						<span className='p-1 text-4xl text-yellow-500 transition duration-300 rounded-md hover:scale-110'>
							<GiAlliedStar />
						</span>
						<p className='text-lg font-semibold'>Presently in Your Collection!</p>
					</span>
				)}
			</div>
			<div className='grid items-center justify-start grid-cols-2 gap-4 md:grid-cols-3 md:gap-6'>
				{hasAnime && (
					<div className='flex flex-col justify-center gap-2'>
						<VeiwAnimeBtn
							name='delete Anime'
							onClick={onDelete}
							Value={RiDeleteBin2Line}
						/>

						<p className='invisible text-xs peer-hover:transition peer-hover:duration-1000 peer-hover:ease-in-out peer-hover:visible'>Remove From Collection</p>
					</div>
				)}
				{!hasAnime && (
					<div className='flex flex-col justify-center gap-2'>
						<VeiwAnimeBtn
							name='Add Anime'
							onClick={onAdd}
							Value={IoIosAddCircle}
						/>

						<p className='invisible text-xs peer-hover:transition peer-hover:duration-1000 peer-hover:ease-in-out peer-hover:visible'>Add To Collection</p>
					</div>
				)}
			</div>
		</>
	);
}
