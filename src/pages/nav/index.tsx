import { FaHome, FaUser, FaUnlock, FaLock } from 'react-icons/fa';
import { BiInfoCircle, BiSearch } from 'react-icons/bi';
// import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useContextApi } from '../../context';
import { useLocation, useNavigate } from 'react-router-dom';
import { UrlPath } from '../../types';
import Button from '../../components/button';
import { useFetch } from '../../hooks/fetch';
import { toast } from 'react-toastify';

function Nav() {
	const naviTo = useNavigate();
	const {
		state: { loggedIn },
		dispatch,
	} = useContextApi();
	const classes = {
		navBtnClasses: 'group relative text-white flex items-center justify-center',
		PClassess: 'hidden absolute transition delay-1000 duration-300 ease-in-out group-hover:flex -top-7 text-sm text-white font-bold',
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
	const onClick = async () => {
		if (!loggedIn) {
			naviTo('/login');
			return;
		}
		const response = await useFetch('logOut', 'GET', 'no-store');
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
						<BiInfoCircle />
					</span>
				),
			});
			return;
		}

		dispatch({ type: 'logOut', payload: { logOut: false } });
	};
	return (
		<nav className={`h-16 p-2 w-3/4 md:w-2/4 mx-auto flex items-center justify-around bg-pink-500 dark:bg-pink-600 rounded-2xl z-10`}>
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
			{/* <div className={classes.navBtnClasses}>
				<p className={`${classes.PClassess} left-1/4`}>Cart</p>
				<Button
					name={'cart'}
					more={`${isPath('/cart')}`}
					onClick={() => naviTo('cart')}
					Value={AiOutlineShoppingCart}
					type={'nav'}
				/>
			</div> */}
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
