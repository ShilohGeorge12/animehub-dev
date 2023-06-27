import { BrowserRouter as Router } from 'react-router-dom';
import itachi1024 from './assets/images/bg/itachi-1024.jpg';
import luffyFull from './assets/images/bg/luffy-sun-god.webp';
import luffy1024 from './assets/images/bg/luffy-sun-god1024.webp';
import luffy768 from './assets/images/bg/luffy-sun-god768.webp';
import luffy414 from './assets/images/bg/luffy-sun-god414.webp';
import { AllRoutes } from './AllRoutes';
import Nav from './pages/nav';
import Header from './pages/header';
import { useContextApi } from './context';

function App() {
	const {
		state: {
			loggedIn,
			theme,
			user: { theme: userTheme },
		},
	} = useContextApi();

	const imageSrcSet = () => {
		if (loggedIn) return userTheme === 'light' ? `${luffy414} 420w, ${luffy768} 768w, ${luffy1024} 1024w` : ``;
		return theme === 'light' ? `${luffy414} 420w, ${luffy768} 768w, ${luffy1024} 1024w` : ``;
	};
	const imageSrc = () => {
		if (loggedIn) return userTheme === 'light' ? luffyFull : itachi1024;
		return theme === 'light' ? luffyFull : itachi1024;
	};

	const imageBrightness = () => {
		if (loggedIn) return userTheme === 'dark' ? 'brightness-50' : 'brightness-75';
		return theme === 'dark' ? 'brightness-50' : 'brightness-75';
	};

	return (
		<section className={`w-screen h-screen ${loggedIn ? userTheme : theme} overflow-hidden `}>
			<img
				src={imageSrc()}
				srcSet={imageSrcSet()}
				sizes={'(max-width: 420) 22vw, (max-width: 1024) 53.5vw, 100vw'}
				alt={luffyFull}
				className={`fixed top-0 left-0 w-full h-full transition duration-300 ease-in-out overflow-hidden object-cover ${imageBrightness()}`}
			/>
			<main className={`relative w-full h-full flex flex-col items-center font-semibold font-poppins text-white`}>
				<Router>
					<Header />
					<AllRoutes />
					<Nav />
				</Router>
			</main>
		</section>
	);
}

export default App;
