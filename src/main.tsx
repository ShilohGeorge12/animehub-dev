import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import '/Poppins-Regular.ttf';
import { ContextProvider } from './context/index.tsx';
import { AnimatePresence, motion } from 'framer-motion';

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
