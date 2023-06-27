import { Routes, Route, useLocation } from 'react-router-dom';
import ErrorPage from './customPages/error';
import Auth from './customPages/auth';
import NotFound from './customPages/NotFound';
import Home from './pages/home';
import ViewAnime from './pages/home/viewAnime';
import Profile from './pages/profile';
import EditProfile from './pages/profile/editProfile';
import Search from './pages/search';
import UpgradeToPremuim from './pages/profile/upgradeToPremuim';
import Login from './pages/login';

export const AllRoutes = () => {
	const location = useLocation();

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
					path='profile/editprofile'
					element={<ErrorPage page={<EditProfile />} />}
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
