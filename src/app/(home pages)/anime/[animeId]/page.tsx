import { MongoDB } from '@/db';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import Image from 'next/image';
import { Rating } from '@/components/rating';
import { AnimeContent } from './animeContent';
import { AnimeType, isError } from '@/types';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
	params: { animeId: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
	const _id = params.animeId;

	const anime = await getAnime(_id);

	if (isError(anime)) return {};

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: anime.title,
		description: anime.description,
		openGraph: {
			images: [`/cover/${anime.image}`, ...previousImages],
		},
	};
}

export default async function AnimePage({ params: { animeId } }: { params: { animeId: string } }) {
	const anime = await getAnime(animeId);
	if (isError(anime)) notFound();

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
			<section className={'grid grid-cols-1 md:grid-cols-4'}>
				<section className='flex items-start col-span-1 gap-1 p-2 md:flex-col md:gap-8 md:items-center'>
					<Image
						src={`/cover/${anime.image}`}
						title={anime.title}
						alt={anime.title}
						loading='eager'
						height={100}
						width={100}
						priority
						className={'iphone_sm:w-24 w-xl:w-44 rounded-md transition duration-300 hover:scale-110'}
					/>

					<ul className='flex flex-col justify-center w-full gap-2 px-1 font-semibold text-pink-400 no-underline list-none iphone_sm:text-xs w-xl:text-3xl md:text-base'>
						<li className='flex gap-2'>
							Stars:
							<Rating
								size='text-xs w-xl:text-2xl'
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
							Year Released:{' '}
							<time
								dateTime={`${anime.year}`}
								className={listItemClass}>
								{anime.year}
							</time>
						</li>

						<li>
							Seasons: <span className={listItemClass}>{anime.season}</span>
						</li>
					</ul>
				</section>
				<div className='flex flex-col gap-3 p-2 md:gap-6 md:col-span-3'>
					<h3 className='hidden font-bold tracking-wider md:flex md:text-3xl w-xl:text-4xl'>{anime.title}</h3>
					<p className='hidden overflow-auto text-sm font-semibold tracking-wider rounded w-lg:flex w-lg:h-32 w-xl:h-auto w-xl:overflow-visible w-xl:pr-2 w-xl:text-xl bg-black/60'>
						{<ParseDecription />}
					</p>
					<details className='hidden iphone_lg:flex iphone_sm:flex'>
						<summary className='text-lg font-semibold'>{anime.title}</summary>
						<p className='w-[96%] mx-auto overflow-y-scroll text-xs font-semibold tracking-wider iphone_sm:h-44 h-md:h-60 text-ellipsis'>{<ParseDecription />}</p>
					</details>
					<AnimeContent
						anime={anime}
						animeId={animeId}
					/>
				</div>
			</section>
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
