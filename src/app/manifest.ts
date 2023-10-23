import { MetadataRoute } from 'next';
import { env } from '@/env';

export default function manifest(): MetadataRoute.Manifest {
	return {
		scope: '/',
		lang: 'en',
		name: 'animehub',
		description:
			'animehub is your ultimate destination for renting, watching, and streaming high-quality anime content. Explore our extensive catalog of latest and hottest anime releases, discover new series, and immerse yourself in the world of captivating storytelling.',
		short_name: 'animehub-dev',
		start_url: '/',
		display: 'standalone',
		theme_color: 'rgb(203 213 225)',
		background_color: 'rgb(203 213 225)',
		icons: [
			{
				src: '/favicon.ico',
				sizes: '32x32',
				type: 'image/x-icon',
			},
			{
				src: '/tv-32.png',
				sizes: '32x32',
				type: 'image/png',
			},
			{
				src: '/tv-64.png',
				sizes: '64x64',
				type: 'image/png',
			},
			{
				src: '/tv-150.png',
				sizes: '150x150',
				type: 'image/png',
			},
			{
				src: '/tv-256.png',
				sizes: '256x256',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/tv-512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
		protocol_handlers: [
			{
				protocol: 'web+animehub',
				url: env.VERCEL_URL !== 'null' ? 'https://animehub-dev.vercel.app/%s' : `http://localhost:${process.env.PORT ?? 5053}/%s`,
			},
		],
	};
}
