import { BrowserRouter as Router } from 'react-router-dom';
import itachi1024 from './assets/images/bg/itachi-1024.jpg';
import luffyFull from './assets/images/bg/luffy-sun-god.webp';
import luffy1024 from './assets/images/bg/luffy-sun-god1024.webp';
import luffy768 from './assets/images/bg/luffy-sun-god768.webp';
import luffy414 from './assets/images/bg/luffy-sun-god414.webp';
import { AllRoutes } from './AllRoutes';
import Nav from './pages/nav';
import Header from './pages/header';
import { useContextApi } from './context';
import { useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { isError, isUser } from './types';
import { toast } from 'react-toastify';
import { useFetch } from './hooks/fetch';

function App() {
	const {
		state: {
			theme,
			user: { theme: userTheme },
			loggedIn,
		},
		dispatch,
	} = useContextApi();

	const autoLogin = async () => {
		const loginDetails = {
			username: 'Guest',
			password: 'guest@animehub',
			email: 'guest@animehub.dev',
		};
		const data = new FormData();
		Object.entries(loginDetails).forEach(([key, val]) => data.append(key, val));
		const response = await useFetch('login', 'POST', 'no-store', data, true);
		if (isUser(response)) {
			dispatch({ type: 'user', payload: { user: response } });
			dispatch({ type: 'logIn', payload: { logIn: true } });
			return;
		}
		if ('error' in response) {
			const errorMessage = Array.isArray(response.error) ? response.error.join('\n') : response.error;
			toast(errorMessage, {
				type: 'default',
				autoClose: 6000,
				position: 'bottom-right',
				className: `justify-center bg-red-600 rounded-xl`,
				bodyClassName: 'text-sm text-white ',
				closeButton: false,
				pauseOnHover: true,
				icon: (
					<span className='px-1 py-2 rounded-md text-white text-xl'>
						<AiFillDelete />
					</span>
				),
			});
		}
	};
	useEffect(() => {
		autoLogin().catch((err) => {
			if (isError(err))
				toast(err.message, {
					type: 'default',
					autoClose: 6000,
					position: 'bottom-right',
					className: `justify-center bg-red-600 rounded-xl`,
					bodyClassName: 'text-sm text-white ',
					closeButton: false,
					pauseOnHover: true,
					icon: (
						<span className='px-1 py-2 rounded-md text-white text-xl'>
							<AiFillDelete />
						</span>
					),
				});
		});
	}, []);

	const imageSrcSet = () => {
		if (loggedIn) return userTheme === 'light' ? `${luffy414} 420w, ${luffy768} 768w, ${luffy1024} 1024w` : ``;
		return theme === 'light' ? `${luffy414} 420w, ${luffy768} 768w, ${luffy1024} 1024w` : ``;
	};
	const imageSrc = () => {
		if (loggedIn) return userTheme === 'light' ? luffyFull : itachi1024;
		return theme === 'light' ? luffyFull : itachi1024;
	};

	const imageBrightness = () => {
		if (loggedIn) return userTheme === 'dark' ? 'brightness-50' : 'brightness-75';
		return theme === 'dark' ? 'brightness-50' : 'brightness-75';
	};

	return (
		<section className={`w-screen h-screen ${loggedIn ? userTheme : theme} overflow-hidden `}>
			<img
				src={imageSrc()}
				srcSet={imageSrcSet()}
				sizes={'(max-width: 420) 22vw, (max-width: 1024) 53.5vw, 100vw'}
				alt={luffyFull}
				className={`fixed top-0 left-0 w-full h-full transition duration-300 ease-in-out overflow-hidden object-cover ${imageBrightness()}`}
			/>
			<main className={`relative w-full h-full flex flex-col items-center font-semibold font-poppins text-white dark:text-white`}>
				<Router>
					<Header />
					<AllRoutes />
					<Nav />
				</Router>
			</main>
		</section>
	);
}

export default App;
