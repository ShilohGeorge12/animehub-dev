import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ContextProvider } from './context/index.tsx';
import './index.css';
import 'react-toastify/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<HelmetProvider>
			<ContextProvider>
				<AnimatePresence mode='wait'>
					<App />
				</AnimatePresence>
			</ContextProvider>
		</HelmetProvider>
	</React.StrictMode>
);
