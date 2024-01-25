import { ProfileContent } from '@/components/profileContent';
import { Animation } from '@/components/animation';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Profile',
	robots: {
		index: false,
		follow: true,
	},
};

export default function Profile() {
	return (
		<Animation
			uniqueKey='Profile-animation-layer'
			className='grid w-full h-full grid-cols-1 overflow-y-scroll md:grid-cols-4 lg:pt-2'
			styles={{
				initial: { opacity: 0, translateX: '-100vw', translateZ: -100 },
				animate: { opacity: 1, translateX: '0vw', translateZ: 0 },
				exit: { opacity: 0, translateX: '100vw' },
				transition: { duration: 0.5 },
			}}>
			<ProfileContent />
		</Animation>
	);
}
