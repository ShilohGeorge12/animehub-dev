import { Routes, Route, useLocation } from 'react-router-dom';
import Auth from './custom/auth';
import Home from './pages/home';
import Cart from './pages/cart';
import Profile from './pages/profile';
import Search from './pages/search';
import ErrorPage from './custom/error';
import Login from './pages/login';
import EditProfile from './pages/profile/editProfile';
import ViewAnime from './pages/home/ViewAnime';
import NotFound from './custom/NotFound';
import UpgradeToPremuim from './pages/profile/upgradeToPremuim';

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
					element={<ViewAnime />}
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
					element={<EditProfile />}
				/>
				<Route
					path='profile/upgrade-to-premuim'
					element={<UpgradeToPremuim />}
				/>
			</Route>
			<Route
				path='login'
				element={<Login />}
			/>
			<Route
				path='*'
				element={<NotFound />}
			/>
		</Routes>
	);
};
