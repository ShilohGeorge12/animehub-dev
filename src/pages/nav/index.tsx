import { FaHome, FaUser, FaUnlock, FaLock } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useContextApi } from '../../context';
import { useLocation, useNavigate } from 'react-router-dom';
import { UrlPath } from '../../types';
import Button from '../../container/button';
interface INavProps {}

function Nav(props: INavProps) {
	const {} = props;
	const naviTo = useNavigate();
	const {
		state: { loggedIn },
		dispatch,
	} = useContextApi();
	const classes = {
		navBtnClasses: 'group relative text-white flex items-center justify-center',
		PClassess: 'hidden absolute transition delay-1000 duration-300 ease-in-out group-hover:flex -top-7 text-sm text-pink-600 dark:text-white font-bold',
		loginBtnClasses:
			'p-3 rounded-2xl transform transition motion-safe:hover:scale-110 hover:-translate-y-1 duration-150 ease-in-out text-2xl hover:bg-white hover:text-pink-500 hover:dark:text-pink-600',
	};
	const { pathname } = useLocation();
	const isPath = (path: UrlPath) => {
		if (pathname === path) {
			return 'bg-white text-pink-500 dark:text-pink-600 hover:shadow-3xl';
		}
		return '';
	}; // check for other scenerios
	const onClick = () => {
		if (!loggedIn) {
			naviTo('/login');
			return;
		}
		dispatch({ type: 'logOut', payload: { logOut: false } });
	};
	return (
		<nav className={`w-3/4 md:w-2/4 mx-auto p-1 flex items-center justify-around bg-pink-500 dark:bg-pink-600 rounded-2xl z-10`}>
			<div className={classes.navBtnClasses}>
				<p className={`${classes.PClassess} left-1`}>Home</p>
				<Button
					name={'home'}
					more={`${isPath('/')}`}
					onClick={() => naviTo('/')}
					Value={FaHome}
					type={'nav'}
				/>
			</div>
			<div className={classes.navBtnClasses}>
				<p className={`${classes.PClassess} left-1`}>Profile</p>
				<Button
					name={'profile'}
					more={`${isPath('/profile')}`}
					onClick={() => naviTo('profile')}
					Value={FaUser}
					type={'nav'}
				/>
			</div>
			<div className={classes.navBtnClasses}>
				<p className={`${classes.PClassess} left-1/4`}>Cart</p>
				<Button
					name={'cart'}
					more={`${isPath('/cart')}`}
					onClick={() => naviTo('cart')}
					Value={AiOutlineShoppingCart}
					type={'nav'}
				/>
			</div>
			<div className={classes.navBtnClasses}>
				<p className={`${classes.PClassess} -left-[2px]`}>Search</p>
				<Button
					name={'search'}
					more={`${isPath('/search')}`}
					onClick={() => naviTo('search')}
					Value={BiSearch}
					type={'nav'}
				/>
			</div>
			<div className={classes.navBtnClasses}>
				<p className={`${classes.PClassess} ${loggedIn ? '-left-[2px]' : 'left-1'}`}>{loggedIn ? 'LogOut' : 'LogIn'}</p>
				<button
					type={'button'}
					aria-label='log In-Or-Out'
					name='log In-Or-Out'
					className={classes.loginBtnClasses}
					onClick={onClick}>
					{loggedIn ? <FaUnlock /> : <FaLock />}
				</button>
			</div>
		</nav>
	);
}

export default Nav;
