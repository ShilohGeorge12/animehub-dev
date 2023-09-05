import { createPortal } from 'react-dom';
import { useMyContext } from './context';

interface ModalType {
	element: JSX.Element;
}

export const Modal = ({ element }: ModalType) => {
	const {
		dispatch,
		state: {
			editProfileModal,
			theme,
			user: { theme: userTheme },
			loggedIn,
		},
	} = useMyContext();
	const Div = document.getElementById('modal') as HTMLDivElement;
	const onClose = () => {
		if (editProfileModal) {
			dispatch({ type: 'editProfileModalClose', payload: { close: false } });
		}
		return;
	};

	return createPortal(
		<section
			onClick={onClose}
			className={`${loggedIn ? userTheme : theme} w-full h-screen absolute top-0 left-0 font-semibold flex items-center justify-center`}>
			{element}
		</section>,
		Div
	);
};
