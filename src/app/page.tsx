// import Image from 'next/image'
import { HomeContent } from '@/components/homeContent';
import { MongoDB } from '@/db';
import { COOKIE_NAME, MAX_AGE } from '@/types';
import { serialize } from 'cookie';
import { redirect } from 'next/navigation';
import Jwt from 'jsonwebtoken';
import { env } from '@/env';

const login = async () => {
	const loginDetails = {
		username: 'Guest',
		password: 'guest@animehub',
		email: 'guest@animehub.dev',
	};
	const { email, username } = loginDetails;
	const user = await MongoDB.getUserModel().findOne({ username, email }).select('-password -__v');
	if (!user) {
		redirect('/login');
	}
	const secret = env.SECRET;
	try {
		const storedToken = Jwt.verify(user.authkey, secret);
		console.log(user.authkey);
	} catch (error) {
		if (error && error instanceof Error && error.name === 'TokenExpiredError') {
			// res.status(401).json({ authStatus: error.message, user: {} });
			redirect('/login');
		}
	}
};

export default async function Home() {
	return (
		<section className={`w-full h-full relative`}>
			<article className='hidden'>
				{/* <h2>
					Welcome to <strong>AnimeHub-Dev</strong>, your ultimate destination for renting, watching, and streaming high-quality anime content. Immerse yourself in a world
					of captivating
				</h2>
				storytelling, vibrant characters, and visually stunning animations. At AnimeHub-Dev, we pride ourselves on providing a seamless and immersive anime streaming
				experience. Our extensive collection boasts a diverse range of anime series and movies, carefully curated to cater to all anime enthusiasts. Whether you're a
				seasoned fan or just starting your anime journey, we have something for everyone.
				<h3>
					Discover the latest and hottest anime releases on our platform. Stay up to date with the most anticipated shows, explore new genres, and indulge in your
					favorite anime genres.
				</h3>
				Our intuitive recommendation system suggests personalized picks based on your preferences, ensuring you never miss out on hidden gems. Experience anime like never
				before with our exceptional video quality. We prioritize delivering crystal-clear visuals and immersive audio, allowing you to fully appreciate the intricate
				details and vibrant colors of each frame. Whether you're streaming on your computer, smartphone, or smart TV, AnimeHub-Dev ensures a seamless viewing experience
				across all devices. Renting anime series has never been easier. With AnimeHub-Dev, you can access an extensive catalog of titles available for rental. Enjoy the
				flexibility of choosing what to watch and when to watch it. Whether you prefer marathoning through a whole season or savoring one episode at a time, the choice is
				yours.
				<h4>
					Join our passionate community of anime lovers and engage in discussions, reviews, and recommendations. Connect with fellow fans, share your thoughts, and embark
					on a collective journey through the vast world of anime. Don't miss out on the excitement.
				</h4>
				Unlock a world of captivating stories, unforgettable characters, and breathtaking visuals at AnimeHub-Dev. Start your anime adventure today and let us be your
				trusted companion on this exhilarating journey. */}
				<h2>
					Welcome to <strong>AnimeHub-Dev</strong>: Your Ultimate Destination for Renting, Watching, and Streaming High-Quality <em>Animes</em>
				</h2>
				<p>
					Immerse yourself in a world of captivating storytelling, vibrant characters, and visually stunning animations. At AnimeHub-Dev, we pride ourselves on providing
					a seamless and immersive anime streaming experience. Our extensive collection boasts a diverse range of anime series and movies, carefully curated to cater to
					all anime enthusiasts. Whether you're a seasoned fan or just starting your anime journey, we have something for everyone.
				</p>

				<h3>
					Discover the Latest and Hottest <em>Animes</em> on Our Platform
				</h3>
				<p>
					Stay up to date with the most anticipated shows, explore new genres, and indulge in your favorite anime genres. Our intuitive recommendation system suggests
					personalized picks based on your preferences, ensuring you never miss out on hidden gems. Experience anime like never before with our exceptional video quality.
					We prioritize delivering crystal-clear visuals and immersive audio, allowing you to fully appreciate the intricate details and vibrant colors of each frame.
					Whether you're streaming on your computer, smartphone, or smart TV, AnimeHub-Dev ensures a seamless viewing experience across all devices.
				</p>

				<h4>Easy Anime Series Rental and Community Engagement</h4>
				<p>
					Renting anime series has never been easier. With AnimeHub-Dev, you can access an extensive catalog of titles available for rental. Enjoy the flexibility of
					choosing what to watch and when to watch it. Whether you prefer marathoning through a whole season or savoring one episode at a time, the choice is yours. Join
					our passionate community of anime lovers and engage in discussions, reviews, and recommendations. Connect with fellow fans, share your thoughts, and embark on a
					collective journey through the vast world of anime. Don't miss out on the excitement.
				</p>

				<h5>Unlock a World of Captivating Stories, Unforgettable Characters, and Breathtaking Visuals at AnimeHub-Dev</h5>
				<p>Start your anime adventure today and let us be your trusted companion on this exhilarating journey.</p>
			</article>
			<p className='text-2xl font-bold text-center text-white'>All Animes</p>
			<HomeContent />
		</section>
	);
}

// const handleLogin = async ({email, password, username}: { username: string, email: string, password: string }) => {

// 	const user = await MongoDB.getUserModel().findOne({ email, username }).select('-__v -authkey').populate('animes', '-__v');

// 		if (!user) {
// 			// return NextResponse.json({ error: `User with email ${email} was not found!` }, { status: 404 });
// 		}

// 		const result = await bcrypt.compare(password, user.password);
// 		if (!result) {
// 			return NextResponse.json({ error: 'Password is In-Correct!' }, { status: 400 });
// 		}

// 		const details: Omit<User, 'password' | 'authkey'> & { _id: Types.ObjectId } = {
// 			_id: user._id,
// 			username,
// 			email,
// 			gender: user.gender,
// 			image: user.image,
// 			animes: user.animes,
// 			role: user.role,
// 			theme: user.theme,
// 			createdAt: user.createdAt,
// 		};

// 		const sercret = env.SECRET;
// 		const signedJwt = Jwt.sign({ token: email }, sercret, { expiresIn: MAX_AGE });
// 		user.authkey = signedJwt;
// 		await user.save();

// 		const serialized = serialize(COOKIE_NAME, signedJwt, {
// 			httpOnly: true,
// 			maxAge: MAX_AGE,
// 			path: '/',
// 		});
// };
