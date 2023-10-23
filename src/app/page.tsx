import { HomeContent } from '@/components/homeContent';

export default async function Home() {
	return (
		<section className={`w-full h-full relative`}>
			<article className='hidden'>
				{/* <h2>
					Welcome to <strong>AnimeHub-Dev</strong>, your ultimate destination for renting, watching, and streaming high-quality anime content. Immerse yourself in a world
					of captivating
				</h2>
				storytelling, vibrant characters, and visually stunning animations. At AnimeHub-Dev, we pride ourselves on providing a seamless and immersive anime streaming
				experience. Our extensive collection boasts a diverse range of anime series and movies, carefully curated to cater to all anime enthusiasts. Whether you&apos;re a
				seasoned fan or just starting your anime journey, we have something for everyone.
				<h3>
					Discover the latest and hottest anime releases on our platform. Stay up to date with the most anticipated shows, explore new genres, and indulge in your
					favorite anime genres.
				</h3>
				Our intuitive recommendation system suggests personalized picks based on your preferences, ensuring you never miss out on hidden gems. Experience anime like never
				before with our exceptional video quality. We prioritize delivering crystal-clear visuals and immersive audio, allowing you to fully appreciate the intricate
				details and vibrant colors of each frame. Whether you&apos;re streaming on your computer, smartphone, or smart TV, AnimeHub-Dev ensures a seamless viewing experience
				across all devices. Renting anime series has never been easier. With AnimeHub-Dev, you can access an extensive catalog of titles available for rental. Enjoy the
				flexibility of choosing what to watch and when to watch it. Whether you prefer marathoning through a whole season or savoring one episode at a time, the choice is
				yours.
				<h4>
					Join our passionate community of anime lovers and engage in discussions, reviews, and recommendations. Connect with fellow fans, share your thoughts, and embark
					on a collective journey through the vast world of anime. Don&apos;t miss out on the excitement.
				</h4>
				Unlock a world of captivating stories, unforgettable characters, and breathtaking visuals at AnimeHub-Dev. Start your anime adventure today and let us be your
				trusted companion on this exhilarating journey. */}
				{/* <h2>
					Welcome to <strong>AnimeHub-Dev</strong>: Your Ultimate Destination for Renting, Watching, and Streaming High-Quality <em>Animes</em>
				</h2>
				<p>
					Immerse yourself in a world of captivating storytelling, vibrant characters, and visually stunning animations. At AnimeHub-Dev, we pride ourselves on providing
					a seamless and immersive anime streaming experience. Our extensive collection boasts a diverse range of anime series and movies, carefully curated to cater to
					all anime enthusiasts. Whether you&apos;re a seasoned fan or just starting your anime journey, we have something for everyone.
				</p>

				<h3>
					Discover the Latest and Hottest <em>Animes</em> on Our Platform
				</h3>
				<p>
					Stay up to date with the most anticipated shows, explore new genres, and indulge in your favorite anime genres. Our intuitive recommendation system suggests
					personalized picks based on your preferences, ensuring you never miss out on hidden gems. Experience anime like never before with our exceptional video quality.
					We prioritize delivering crystal-clear visuals and immersive audio, allowing you to fully appreciate the intricate details and vibrant colors of each frame.
					Whether you&apos;re streaming on your computer, smartphone, or smart TV, AnimeHub-Dev ensures a seamless viewing experience across all devices.
				</p>

				<h4>Easy Anime Series Rental and Community Engagement</h4>
				<p>
					Renting anime series has never been easier. With AnimeHub-Dev, you can access an extensive catalog of titles available for rental. Enjoy the flexibility of
					choosing what to watch and when to watch it. Whether you prefer marathoning through a whole season or savoring one episode at a time, the choice is yours. Join
					our passionate community of anime lovers and engage in discussions, reviews, and recommendations. Connect with fellow fans, share your thoughts, and embark on a
					collective journey through the vast world of anime. Don&apos;t miss out on the excitement.
				</p>

				<h5>Unlock a World of Captivating Stories, Unforgettable Characters, and Breathtaking Visuals at AnimeHub-Dev</h5>
				<p>Start your anime adventure today and let us be your trusted companion on this exhilarating journey.</p> */}

				<h2>
					Welcome to <strong>AnimeHub-Dev</strong>: Your Ultimate Destination for Renting, Watching, and Streaming High-Quality <em>Animes</em>
				</h2>
				<p>
					Immerse yourself in a world of captivating storytelling, vibrant characters, and visually stunning animations. At AnimeHub-Dev, we take pride in offering a
					seamless and immersive anime streaming experience. Our vast collection features a diverse range of anime series and movies, thoughtfully selected to cater to
					all anime enthusiasts. Whether you&apos;re a seasoned fan or just embarking on your anime journey, we have something tailored for everyone.
				</p>

				<h3>
					Discover the Latest and Hottest <em>Animes</em> on Our Platform
				</h3>
				<p>
					Stay updated with the most anticipated shows, explore new genres, and indulge in your favorite anime categories. Our intuitive recommendation system suggests
					personalized picks based on your preferences, ensuring you never miss out on hidden gems. Experience anime like never before with our outstanding video quality.
					We prioritize delivering crystal-clear visuals and immersive audio, allowing you to fully appreciate the intricate details and vibrant colors of each frame.
					Whether you&apos;re streaming on your computer, smartphone, or smart TV, AnimeHub-Dev guarantees a seamless viewing experience across all devices.
				</p>

				<h4>Easy Anime Series Rental and Community Engagement</h4>
				<p>
					Renting anime series has never been more convenient. With AnimeHub-Dev, you can access an extensive catalog of titles available for rental. Enjoy the
					flexibility of choosing what to watch and when to watch it. Whether you prefer binge-watching a whole season or savoring one episode at a time, the choice is
					yours. Join our passionate community of anime lovers and participate in discussions, reviews, and recommendations. Connect with fellow fans, share your
					thoughts, and embark on a collective journey through the vast world of anime. Don&apos;t miss out on the excitement.
				</p>

				<h5>Unlock a World of Captivating Stories, Unforgettable Characters, and Breathtaking Visuals at AnimeHub-Dev</h5>
				<p>Start your anime adventure today and let us be your trusted companion on this exhilarating journey.</p>
			</article>
			<p className='text-2xl font-bold text-center text-white'>All Animes</p>
			<HomeContent />
		</section>
	);
}
