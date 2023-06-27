import { useContext, useReducer, createContext, ReactNode } from 'react';
import { State, ReducerType, stateAction } from '../types';
import { useFetch } from '../hooks/fetch';
import { toast } from 'react-toastify';
import { AiFillInfoCircle } from 'react-icons/ai';

const initState: State = {
	theme: 'light',
	loggedIn: false,
	user: {
		_id: '',
		username: '',
		password: '',
		email: '',
		image: {
			data: { data: '' },
			contentType: '',
		},
		animes: [],
		role: 'BASIC',
		theme: 'light',
		gender: 'male',
		createdAt: new Date(),
	},
};

const MyContext = createContext({
	state: initState,
	dispatch(_val: stateAction) {},
	updateTheme() {},
});

const reducer: ReducerType = (state, action) => {
	switch (action.type) {
		case 'user':
			return { ...state, user: action.payload.user };
		case 'theme':
			return { ...state, theme: action.payload.theme };
		case 'userTheme':
			return { ...state, user: { ...state.user, theme: action.payload.userTheme } };
		case 'logIn':
			return { ...state, loggedIn: action.payload.logIn };
		case 'logOut':
			document.cookie = '';
			return { ...state, loggedIn: action.payload.logOut };
		default:
			return state;
	}
};

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initState);
	const updateTheme = () => {
		const dark = 'dark';
		const light = 'light';
		const {
			theme,
			loggedIn,
			user: { theme: userTheme },
		} = state;
		if (loggedIn) {
			switch (userTheme) {
				case 'light':
					dispatch({ type: 'userTheme', payload: { userTheme: dark } });
					updateDbTheme(dark);
					return;
				case 'dark':
					dispatch({ type: 'userTheme', payload: { userTheme: light } });
					updateDbTheme(light);
					return;
			}
		} else {
			switch (theme) {
				case 'light':
					dispatch({ type: 'theme', payload: { theme: dark } });
					return;
				case 'dark':
					dispatch({ type: 'theme', payload: { theme: light } });
					return;
			}
		}
	};

	const updateDbTheme = async (theme: 'light' | 'dark') => {
		const User = { theme };
		const userData = new FormData();
		Object.entries(User).forEach(([key, val]) => userData.append(key, val));
		const response = await useFetch(`users/${state.user._id}/theme`, 'PATCH', 'no-store', userData);
		if ('error' in response) {
			toast(response.error, {
				type: 'default',
				autoClose: 6000,
				position: 'bottom-right',
				className: `justify-center bg-red-600 rounded-xl`,
				bodyClassName: 'text-sm text-white ',
				closeButton: false,
				pauseOnHover: true,
				icon: (
					<span className='px-1 py-2 rounded-md text-white text-xl'>
						<AiFillInfoCircle />
					</span>
				),
			});
			return;
		}
	};

	return <MyContext.Provider value={{ state, dispatch, updateTheme }}>{children}</MyContext.Provider>;
};

export const useContextApi = () => useContext(MyContext);
