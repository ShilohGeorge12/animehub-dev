import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ErrorPage from './components/error';
import Auth from './components/auth';
import NotFound from './components/NotFound';
import Home from './pages/home';
import ViewAnime from './pages/home/viewAnime';
import Profile from './pages/profile';
import Search from './pages/search';
import UpgradeToPremuim from './pages/profile/upgradeToPremuim';
import Login from './pages/login';
import { useEffect } from 'react';
import { useMyContext } from './context';
import { useFetch } from './hooks/fetch';
import { isAnError, isAuthStatus, isError } from './types';
import { toast } from 'react-toastify';

export const AllRoutes = () => {
	const location = useLocation();
	const { dispatch } = useMyContext();
	const naviTo = useNavigate();

	useEffect(() => {
		useFetch('verify-auth', 'GET', 'no-store')
			.then((res) => {
				if (isError(res)) {
					// const error = typeof res.error === 'string' ? res.error : res.error[0];
					// toast.error(error);
					return;
				}

				if (isAuthStatus(res)) {
					if (res.authStatus === 'jwt expired') {
						dispatch({ type: 'logOut', payload: { isloggedIn: false } });
						naviTo('/login');
						return;
					}

					if (res.authStatus === 'Still Valid') {
						console.log(res.user);
						dispatch({ type: 'logIn', payload: { isloggedIn: true, user: res.user } });
						naviTo('/');
						return;
					}
				}
			})
			.catch((error) => {
				if (isAnError(error)) {
					toast.error(error.message);
				}
			});
	}, []);

	return (
		<Routes
			location={location}
			key={location.pathname}>
			<Route
				path='/'
				element={<ErrorPage page={<Home />} />}
			/>
			<Route element={<Auth />}>
				<Route
					path='/anime/:id'
					element={<ErrorPage page={<ViewAnime />} />}
				/>
				<Route
					path='profile'
					element={<ErrorPage page={<Profile />} />}
				/>
				<Route
					path='search'
					element={<ErrorPage page={<Search />} />}
				/>
				<Route
					path='profile/upgrade-to-premuim'
					element={<ErrorPage page={<UpgradeToPremuim />} />}
				/>
			</Route>
			<Route
				path='login'
				element={<ErrorPage page={<Login />} />}
			/>
			<Route
				path='*'
				element={<NotFound />}
			/>
		</Routes>
	);
};
