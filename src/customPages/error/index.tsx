import React from 'react';
import { Link } from 'react-router-dom';

interface State {
	hasError: boolean;
}
interface ErrorType {
	page: React.ReactNode;
}

class ErrorPage extends React.Component<ErrorType, State> {
	constructor(props: ErrorType) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_error: Error) {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.log({ error, errorInfo });
	}

	toHomePage = () => {};

	render() {
		if (this.state.hasError) {
			return (
				<section className='w-full h-full flex items-center justify-center gap-4'>
					<img
						src='/error.png'
						className='w-1/4 transform transition hover:translate-y-3 hover:-translate-x-5 hover:scale-110'
						loading='eager'
						title='error 404'
						alt='error 404'
						width={''}
						height={''}
					/>
					<div>
						<p className='text-lg text-gray-500 dark:text-gray-200 capitalize tracking-wider font-bold animate-pulse duration-700'> Something Went Wrong! </p>
						<button
							type='button'
							className='transition duration-300 ease-in-out text-2xl bg-pink-500 hover:bg-white text-white hover:text-pink-500 hover:scale-110 hover:rounded-md rounded-2xl p-2 capitalize'>
							<Link to={'/'}>home</Link>
						</button>
					</div>
				</section>
			);
		}
		return this.props.page;
	}
}
export default ErrorPage;
