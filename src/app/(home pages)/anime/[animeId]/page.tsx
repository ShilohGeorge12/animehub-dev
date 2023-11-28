import { MongoDB } from '@/db';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import Image from 'next/image';
import { Rating } from '@/components/rating';
import { AnimeContent } from './animeContent';
import { AnimeType } from '@/types';
import { Metadata } from 'next/types';

export const metadata: Metadata = {};

export default async function AnimePage({ params: { animeId } }: { params: { animeId: string } }) {
	const anime = await getAnime(animeId);
	if ('error' in anime) {
		notFound();
	}

	const listItemClass = 'text-white font-bold';
	const ParseDecription = () => {
		if (anime) {
			return anime.description
				.replace(/\\u2014/g, ' ')
				.replace(/\\"/g, '"')
				.split('\\n')
				.map((line, index) => (
					<Fragment key={index}>
						{line}
						<br />
					</Fragment>
				));
		}
		return [<></>];
	};

	return (
		<section className={`flex flex-col w-full h-full gap-6 lg:gap-0 overflow-y-auto`}>
			<div className={'grid grid-cols-1 md:grid-cols-4'}>
				<div className='flex items-start col-span-1 gap-1 p-2 md:flex-col md:gap-8 md:items-center'>
					<Image
						src={`/cover/${anime.image}`}
						title={anime.title}
						alt={anime.title}
						loading='eager'
						height={100}
						width={100}
						priority
						className={'w-28 rounded-md transition duration-300 hover:scale-110'}
					/>

					<ul className='flex flex-col justify-center w-full gap-2 px-1 text-sm font-semibold text-pink-300 no-underline list-none md:text-base'>
						<li className='flex gap-2'>
							Stars:
							<Rating
								size='text-sm'
								rating={anime.rating}
							/>
						</li>
						<li>
							Ratings: <span className={listItemClass}>{anime.rating}</span>
						</li>

						<li>
							Episodes: <span className={listItemClass}>{anime.episodes}</span>
						</li>

						<li>
							Duration: <span className={listItemClass}>{anime.duration}</span>
						</li>

						<li>
							Status: <span className={listItemClass}>{anime.status}</span>
						</li>
						<li>
							Airing: <span className={listItemClass}>{anime.airing ? 'currently Airing' : 'Not Airing'}</span>
						</li>
						<li>
							Aired: <span className={listItemClass}>{anime.aired}</span>
						</li>

						<li>
							Year Released: <span className={listItemClass}>{anime.year}</span>
						</li>

						<li>
							Seasons: <span className={listItemClass}>{anime.season}</span>
						</li>
					</ul>
				</div>
				<div className='flex flex-col gap-3 p-2 md:gap-6 md:col-span-3'>
					<h3 className='text-xl font-bold tracking-wider md:text-3xl'>{anime.title}</h3>
					<p className='hidden text-sm font-semibold tracking-wider '>{<ParseDecription />}</p>
					<details className='hidden h-md:flex h-sm:flex'>
						<summary className='text-lg font-semibold'>{anime.title} Description</summary>
						<p className='w-[96%] mx-auto overflow-y-scroll text-sm font-semibold tracking-wider h-sm:h-44 h-md:h-60 text-ellipsis '>{<ParseDecription />}</p>
					</details>
					<AnimeContent
						anime={anime}
						animeId={animeId}
					/>
				</div>
			</div>
		</section>
	);
}

const getAnime = async (animeId: string) => {
	const anime = await MongoDB.getAnimeModel().findOne({ _id: animeId }).select('-__v');

	if (!anime) {
		return { error: 'Anime Not Found!' };
	}

	const animeToReturn = JSON.stringify(anime.toJSON());
	return JSON.parse(animeToReturn) as AnimeType;
};
