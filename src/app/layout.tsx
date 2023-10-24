import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { env } from '@/env';
import Body from '@/components/body';
import { ContextProvider } from '@/context';

const inter = Inter({ subsets: ['latin'] });

const title = 'animehub-dev | Experience anime like never before';
const description = 'animehub: Your go-to for renting, streaming, and enjoying top-notch anime content. Discover new releases, dive into captivating storytelling.';
const vercelUrl = 'https://animehub-dev.vercel.app';
const url = env.VERCEL_URL !== 'null' ? vercelUrl : `http://localhost:${process.env.PORT ?? 5053}`;

export const metadata: Metadata = {
	metadataBase: new URL(url),
	title,
	description,
	keywords:
		'animehub, animehub-dev, Anime, Animehub, Naruto, naruto, One piece, Anime streaming, anime rental,	watch anime online, stream anime episodes, rent anime series, high-quality anime, anime rentals, latest anime releases, Anime recommendations, popular anime series, new anime episodes,	Anime streaming service, discover new anime, hottest anime shows, anime binge-watching, anime catalog, watch anime movies, stream popular anime, animehub-dev streaming',
	authors: [{ name: 'Shiloh George' }],
	icons: { icon: '/tv-32.png', apple: '/tv-150.png' },
	robots: 'index, follow',
	openGraph: {
		title,
		description,
		url,
		siteName: 'animehub-dev',
		images: [
			{
				url: '/tv-32.png',
			},
			{
				url: '/tv-64.png',
			},
		],
	},
	twitter: {
		card: 'summary',
		site: url,
		creator: 'Shiloh George',
		images: '/tv-150.png',
	},
	alternates: { canonical: url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<ContextProvider>
				<Body inter={inter}>{children}</Body>
			</ContextProvider>
		</html>
	);
}
