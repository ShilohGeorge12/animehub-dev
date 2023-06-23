import { ToastType } from '../../types';
import { toast } from 'react-toastify';

export const useNotification: ToastType = (content, options) => {
	const { bg, position, icon: Icon } = options;
	const toastContent = Array.isArray(content) ? content.join('\n') : content;
	toast(toastContent, {
		type: 'info',
		autoClose: 6000,
		position,
		className: `justify-center bg-${bg}-600 rounded-xl`,
		bodyClassName: 'text-sm text-white ',
		closeButton: false,
		pauseOnHover: true,
		icon(_props) {
			return (
				<span className='px-1 py-2 rounded-md text-white text-xl'>
					<Icon />
				</span>
			);
		},
	});
};

export const useShowToast: ToastType = (content, options) => {
	const Toast = () => {
		const toastContent = Array.isArray(content) ? content.join('\n') : content;
		const { bg, position, icon: Icon } = options;

		toast(toastContent, {
			position: position || 'bottom-right',
			autoClose: 6000,
			className: `justify-center bg-${bg}-600 rounded-xl`,
			bodyClassName: 'text-sm text-white',
			closeButton: false,
			pauseOnHover: true,
			hideProgressBar: true,
			icon: Icon,
		});
	};

	return Toast();
};
