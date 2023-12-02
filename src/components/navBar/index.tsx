'use client';

import { useMyContext } from '@/context';
import { usePathname, useRouter } from 'next/navigation';
import { FaHome, FaUser, FaUnlock, FaLock } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { UrlPath, responseTypes } from '@/types';
import { LogInOrOutBtn, NavBtn } from '../button';
import { toast } from 'sonner';

export default function Nav() {
	const { push } = useRouter();
	const {
		state: {
			loggedIn,
			user: { email, username, password },
		},
		dispatch,
	} = useMyContext();
	const classes = {
		navBtnClasses: 'group relative text-white flex items-center justify-center',
		PClassess: 'hidden absolute transition delay-1000 duration-300 ease-in-out group-hover:flex -top-7 text-sm text-white font-bold',
		loginBtnClasses:
			'p-2 rounded-xl transform transition motion-safe:hover:scale-105 hover:-translate-y-1 duration-150 ease-in-out text-xl hover:bg-white hover:text-pink-500 hover:dark:text-pink-600',
	};
	const pathname = usePathname();
	const isPath = (path: UrlPath, subPaths: string) => {
		if (pathname === path || pathname.includes(subPaths)) {
			return 'bg-white text-pink-500 dark:text-pink-600 hover:shadow-3xl';
		}
		return '';
	}; // check for other scenerios

	const onClick = async () => {
		if (!loggedIn) {
			push('/login');
			return;
		}
		const promise = async () => {
			const req = await fetch('/api/logout', {
				method: 'POST',
				body: JSON.stringify({ username, password, email }),
			});

			return (await req.json()) as unknown as responseTypes;
		};

		toast.promise(promise, {
			loading: 'Signing User Out...',
			success(response) {
				if ('error' in response) {
					const errorMessage = Array.isArray(response.error) ? response.error.join('\n') : response.error;
					return errorMessage;
				}

				dispatch({ type: 'logOut', payload: { isloggedIn: false } });
				push('/');
				return `user ${username} is successfully signed out.`;
			},
			error: (error: Error) => error.message,
		});
	};

	return (
		<nav className={`h-12 p-2 w-3/4 md:w-2/4 mx-auto flex items-center justify-around bg-pink-500 dark:bg-pink-600 rounded-2xl z-10`}>
			<div className={classes.navBtnClasses}>
				<p className={`${classes.PClassess} left-1`}>Home</p>
				<NavBtn
					name={'home'}
					more={`${isPath('/', 'anime')}`}
					onClick={() => push('/')}
					Value={FaHome}
				/>
			</div>
			<div className={classes.navBtnClasses}>
				<p className={`${classes.PClassess} left-1`}>Profile</p>
				<NavBtn
					name={'profile'}
					more={`${isPath('/profile', '/profile')}`}
					onClick={() => push('/profile')}
					Value={FaUser}
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
				<NavBtn
					name={'search'}
					more={`${isPath('/search', 'search')}`}
					onClick={() => push('/search')}
					Value={BiSearch}
				/>
			</div>
			<div className={classes.navBtnClasses}>
				<p className={`${classes.PClassess} ${loggedIn ? '-left-[2px]' : 'left-1'}`}>{loggedIn ? 'SignOut' : 'SignIn'}</p>
				<LogInOrOutBtn
					name='log In-Or-Out'
					Value={loggedIn ? FaUnlock : FaLock}
					onClick={onClick}
					// onClick={() => toast('onClick', { description: 'You Clicked OnClick' })}
				/>
			</div>
		</nav>
	);
}
