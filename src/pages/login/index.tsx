import { useLocation, useNavigate } from 'react-router-dom';
import loginHime from '../../assets/images/others/log-in-hime.webp';
import MetaData from '../../components/metaData';
import { useContextApi } from '../../context';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BiErrorCircle } from 'react-icons/bi';
import { useState, MouseEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { isUser } from '../../types';
import { useFetch } from '../../hooks/fetch';
import { useNotification } from '../../hooks/toast';

interface ILoginProps {}

function Login(props: ILoginProps) {
	const {} = props;
	const initState = {
		username: '',
		password: '',
		email: '',
	};
	const [viewPasword, setViewPasword] = useState<boolean>(false);
	const [details, setDetails] = useState<typeof initState>(initState);
	const { dispatch } = useContextApi();
	const { pathname } = useLocation();
	const naviTo = useNavigate();

	const onViewPasword = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (viewPasword) {
			setViewPasword(false);
		} else {
			setViewPasword(true);
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (details.email === '' || details.password === '' || details.username === '') {
			useNotification('No field should be empty!', {
				position: 'top-center',
				bg: 'red',
				icon: BiErrorCircle,
			});
			return;
		}

		const data = new FormData();
		Object.entries(details).forEach(([key, val]) => data.append(key, val));
		const response = await useFetch('login', 'POST', 'no-store', data);
		if (isUser(response)) {
			dispatch({ type: 'user', payload: { user: response } });
			dispatch({ type: 'logIn', payload: { logIn: true } });
			setDetails(initState);
			naviTo('/');
			return;
		}
		if ('error' in response) toast.error(response.error, { position: 'top-center', pauseOnHover: true });
	};

	return (
		<section className='w-full h-full flex flex-col items-center gap-6 lg:gap-0'>
			<MetaData
				title={'Login'}
				description={'Login To animehub.dev'}
				path={pathname}
			/>
			<p className='text-2xl text-gray-700 dark:text-white font-semibold text-center'>Log In</p>
			<div className='w-full md:w-[70%] lg:w-[60%] flex relative'>
				<img
					src={loginHime}
					alt='loginHime'
					loading='eager'
					title='login To Animehub-dev'
					className='hidden md:flex h-52 md:h-72 lg:h-80 z-10'
				/>
				<form
					className={`flex flex-col items-center gap-6 md:absolute md:top-6 lg:top-7 md:right-0 md:w-[84.4%] lg:w-[85.9%] bg-black bg-opacity-80 px-2 py-6 rounded-2xl`}
					autoComplete='off'
					aria-autocomplete='none'>
					<input
						type='text'
						placeholder={'Username'}
						className={`w-[90%] md:w-3/4 h-10 px-8 outline-none border-b-2 border-white dark:border-pink-500 bg-transparent focus:border-b-4 placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base autofill:bg-transparent`}
						name='username'
						autoComplete='off'
						aria-autocomplete='none'
						required={true}
						value={details.username}
						onChange={onChange}
					/>
					<input
						type='text'
						placeholder={'Email'}
						className={`w-[90%] md:w-3/4 h-10 px-8 outline-none border-b-2 border-white dark:border-pink-500 bg-transparent focus:border-b-4 placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base`}
						name='email'
						autoComplete='off'
						aria-autocomplete='none'
						required={true}
						value={details.email}
						onChange={onChange}
					/>
					<div className='w-[90%] md:w-3/4 h-10 relative'>
						<input
							type={viewPasword ? 'text' : 'password'}
							placeholder={'Password'}
							className={`w-full h-full px-8 outline-none border-b-2 border-white dark:border-pink-500 bg-transparent focus:border-b-4 placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base`}
							name='password'
							autoComplete='off'
							required={true}
							aria-autocomplete='none'
							value={details.password}
							onChange={onChange}
						/>
						<button
							className={`absolute top-2 right-2 text-white`}
							onClick={onViewPasword}>
							{viewPasword ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>

					<button
						className='p-2 bg-pink-500 rounded-xl text-xl font-bold tracking-wider text-white transition duration-500 ease-in-out hover:scale-110 hover:shadow-xl'
						onClick={onSubmit}>
						Submit
					</button>
				</form>
			</div>
		</section>
	);
}

export default Login;
