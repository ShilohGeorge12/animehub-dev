import { useContextApi } from '../../context';
import { FaMoon } from 'react-icons/fa';
import { BiSun } from 'react-icons/bi';
import userProfile from '../../assets/images/others/user2.png';

function Header() {
	const {
		state: {
			loggedIn,
			theme,
			user: { image, username, theme: userTheme },
		},
		updateTheme,
	} = useContextApi();
	const profileImage = image && image.data ? URL.createObjectURL(new Blob([new Uint8Array(image.data.data)], { type: image.contentType })) : '';

	const IsTheme = () => {
		if (loggedIn) {
			return userTheme === 'light' ? <BiSun /> : <FaMoon />;
		}
		return theme === 'light' ? <BiSun /> : <FaMoon />;
	};

	return (
		<header className='grid grid-cols-3 items-center gap-4 p-2 md:w-[99%] mx-auto mt-[2px]'>
			<div className='flex items-center gap-4'>
				<img
					src={'/tv-64.png'}
					title='animehub-image'
					alt='animehub-image'
					loading='eager'
					className='w-10 md:w-11 object-cover'
				/>
				<h1 className='text-3xl font-bold text-transparent animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 bg-clip-text '>animehub</h1>
			</div>
			<div className=''></div>
			<div className='flex items-center justify-end gap-4'>
				<button
					type='button'
					name='theme'
					aria-label='theme'
					className={`p-1 md:p-2 bg-pink-500 text-white text-2xl rounded-xl transition duration-300 ease-in-out hover:translate-y-1 hover:scale-110 dark:hover:bg-white dark:hover:text-pink-500`}
					onClick={updateTheme}>
					<IsTheme />
				</button>
				<img
					src={loggedIn ? profileImage : userProfile}
					alt='profile'
					title={`${username} Image` ?? 'profileImage'}
					className='w-10 md:w-12 rounded-2xl object-center'
					loading='lazy'
				/>
				{loggedIn && <p className={`hidden md:flex capitalize text-sm text-white justify-self-end`}>{username}</p>}
			</div>
		</header>
	);
}

export default Header;
