import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { env } from '@/env';
import BodyComponent from '@/components/bodyComponent';
import { ContextProvider } from '@/context';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Image from 'next/image';
import { Toaster } from 'sonner';
// import { EdgeStoreProvider } from '@/lib/edgestore';

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
	const itachi1024 = '/bg/itachi-1024.jpg';

	return (
		<html lang='en'>
			<body className={`${inter.className} w-screen h-screen overflow-hidden `}>
				{/* <EdgeStoreProvider> */}
				<ContextProvider>
					<Image
						src={itachi1024}
						sizes={'(max-width: 420) 22vw, (max-width: 1024) 53.5vw, 100vw'}
						title={'__'}
						alt={'__'}
						className={`fixed top-0 left-0 w-full h-full transition duration-300 ease-in-out overflow-hidden object-cover brightness-50`}
						width={100}
						height={100}
						priority
					/>
					<BodyComponent>{children}</BodyComponent>
					<Toaster
						richColors
						position='bottom-left'
						duration={4000}
						closeButton
						theme={'dark'}
					/>
				</ContextProvider>
			</body>
			{env.VERCEL_URL !== 'null' && <SpeedInsights />}
			{/* </EdgeStoreProvider> */}
		</html>
	);
}
