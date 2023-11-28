'use client';
import { createPortal } from 'react-dom';
import { useMyContext } from '../context';
import { usePathname, useRouter } from 'next/navigation';

interface ModalType {
	element: JSX.Element;
}

export const Modal = ({ element }: ModalType) => {
	const {
		dispatch,
		state: { signUpErrorMessage },
	} = useMyContext();
	const pathname = usePathname();
	const Div = document.getElementById('modal') as HTMLDivElement;
	const onClose = () => {
		if (pathname.includes('/signup')) {
			dispatch({ type: 'signUpErrorModalClose', payload: { close: false } });
			return;
		}
	};

	return createPortal(
		<section
			onClick={onClose}
			className={`w-full h-screen absolute top-0 left-0 font-semibold flex items-center justify-center cursor-pointer`}>
			{element}
		</section>,
		Div
	);
};
