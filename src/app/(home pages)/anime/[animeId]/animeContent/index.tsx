'use client';
import { VeiwAnimeBtn } from '@/components/button';
import { useMyContext } from '@/context';
import { AnimeType, isError, isUser, responseTypes } from '@/types';
import { useEffect, useState } from 'react';
import { GiAlliedStar } from 'react-icons/gi';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { IoIosAddCircle } from 'react-icons/io';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
	const { push } = useRouter();

	const onDelete = async () => {
		if (!anime) return;
		const req = await fetch(`/api/users/${_id}/${anime._id}`, {
			method: 'DELETE',
		});
		const deletedAnime = (await req.json()) as responseTypes;
		if (isError(deletedAnime)) {
			const msg = typeof deletedAnime.error === 'string' ? deletedAnime.error : JSON.stringify(deletedAnime.error);
			toast.error(msg, { duration: 7000 });
			return;
		}
		if (isUser(deletedAnime)) {
			dispatch({ type: 'user', payload: { user: deletedAnime } });
			toast.success(`Removed ${anime.title} from your collection`, { duration: 6000 });
		}
	};

	const onAdd = async () => {
		if (!anime) return;
		const req = await fetch(`/api/users/${_id}/${anime._id}`);
		const response = (await req.json()) as responseTypes;
		if (isError(response)) {
			const msg = typeof response.error === 'string' ? response.error : JSON.stringify(response.error);
			toast.error(msg, { duration: 15000 });
			setTimeout(() => push('/profile/upgrade-to-premuim'), 3000);
			return;
		}
		const ReqUser = await fetch(`/api/users/${_id}`);
		const User = (await ReqUser.json()) as responseTypes;
		if (isUser(User)) {
			dispatch({ type: 'user', payload: { user: User } });
			toast.success(`Added ${anime.title} To your collection`);
		}
	};

	useEffect(() => {
		const hasAnimeWithId = animes.find((anime) => anime._id === animeId) ?? false;
		hasAnimeWithId ? setHasAnime(true) : setHasAnime(false);
	}, [animes, animeId]);

	return (
		<>
			{/* <div className='flex flex-col gap-2'> */}
			{hasAnime && (
				<span className='flex items-center gap-2'>
					<span className='p-1 text-4xl text-yellow-500 transition duration-300 rounded-md w-xl:text-5xl iphone_sm:text-2xl hover:scale-110'>
						<GiAlliedStar />
					</span>
					<p className='font-semibold iphone_sm:text-sm md:text-lg'>Presently in Your Collection!</p>
				</span>
			)}
			{/* </div> */}
			<div className='grid items-center justify-start grid-cols-2 gap-4 md:grid-cols-3 md:gap-6'>
				{hasAnime && (
					<section className='flex flex-col justify-center gap-2'>
						<VeiwAnimeBtn
							name='delete Anime'
							onClick={onDelete}
							Value={RiDeleteBin2Line}
						/>

						<p className='invisible text-xs peer-hover:transition peer-hover:duration-1000 peer-hover:ease-in-out peer-hover:visible'>Remove From Collection</p>
					</section>
				)}
				{!hasAnime && (
					<section className='flex flex-col justify-center gap-2'>
						<VeiwAnimeBtn
							name='Add Anime'
							onClick={onAdd}
							Value={IoIosAddCircle}
						/>

						<p className='invisible text-xs peer-hover:transition peer-hover:duration-1000 peer-hover:ease-in-out peer-hover:visible'>Add To Collection</p>
					</section>
				)}
			</div>
		</>
	);
}
