import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import { useContextApi } from './context';
import { useFetch } from './hooks/fetch';
import { isError, isUser } from './types';
import { AllRoutes } from './AllRoutes';
import Nav from './pages/nav';
import Header from './pages/header';
import Itachi from './assets/bg-dark/itachi-1024.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillDelete } from 'react-icons/ai';

function App() {
	const {
		state: {
			theme,
			user: { theme: userTheme },
			loggedIn,
		},
		dispatch,
	} = useContextApi();

	// toast('', {
	// 	type: 'default',
	// 	autoClose: 6000,
	// 	position: 'bottom-right',
	// 	className: `justify-center bg-red-600 rounded-xl`,
	// 	bodyClassName: 'text-sm text-white ',
	// 	closeButton: false,
	// 	pauseOnHover: true,
	// 	icon: (
	// 		<span className='px-1 py-2 rounded-md text-white text-xl'>
	// 			<AiFillDelete />
	// 		</span>
	// 	),
	// });

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
	const Image = () => {
		if (loggedIn) {
			return userTheme === 'dark' ? { backgroundImage: `url(${Itachi})` } : {};
		}
		return theme === 'dark' ? { backgroundImage: `url(${Itachi})` } : {};
	};

	return (
		<main className={`${loggedIn ? userTheme : theme} w-screen h-screen overflow-hidden`}>
			<div
				className='w-full h-full flex flex-col font-poppins transition-colors duration-200 bg-slate-300 dark:bg-black text-black dark:text-white bg-no-repeat bg-cover bg-center'
				style={Image()}>
				<ToastContainer
					autoClose={3000}
					theme={theme}
					hideProgressBar
					pauseOnHover
					newestOnTop
					position='bottom-right'
				/>
				<Router>
					<Header />
					<AllRoutes />
					<Nav />
				</Router>
			</div>
		</main>
	);
}

export default App;
