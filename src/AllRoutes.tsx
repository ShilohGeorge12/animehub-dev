import { Routes, Route, useLocation } from 'react-router-dom';
import Auth from './custom/auth';
import Home from './pages/home';
import Profile from './pages/profile';
import Search from './pages/search';
import Cart from './pages/cart';
import Login from './pages/login';
import EditProfile from './pages/profile/editProfile';
import ViewAnime from './pages/home/ViewAnime';
import UpgradeToPremuim from './pages/profile/upgradeToPremuim';
import ErrorPage from './custom/error';
import NotFound from './custom/NotFound';

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
					path='cart'
					element={<ErrorPage page={<Cart />} />}
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
