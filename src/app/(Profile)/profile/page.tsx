import { ProfileContent } from '@/components/profileContent';

export default function Profile() {
	return (
		<section className={`grid w-full h-full grid-cols-1 md:grid-cols-4 overflow-y-scroll lg:pt-2`}>
			<ProfileContent />
		</section>
	);
}
