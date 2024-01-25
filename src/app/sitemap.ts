import { MongoDB } from '@/db';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const animes = await MongoDB.getAnimeModel().find().select('-__v');
	if (!animes) return [];

	const animeEntries: MetadataRoute.Sitemap = animes.map((anime) => ({ url: `${process.env.PUBLIC_BASE_URL}/anime/${anime._id.toString()}` }));

	return [
		{
			url: `${process.env.PUBLIC_BASE_URL}`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/profile`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/search`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/login`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/signup`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/upgrade-to-premuim`,
		},
		...animeEntries,
	];
}
