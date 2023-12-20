'use client';
import { Helmet } from 'react-helmet-async';

interface metaProps {
	title: string;
	description: string;
	path: string;
	// theme?: 'light' | 'dark';
}

function MetaData(props: metaProps) {
	const { title, description, path } = props;
	// const UrlPath =  ? `http://localhost:5053${path}` : `https://animehub-dev.netlify.app${path}`;
	return (
		<Helmet>
			<title>{title}</title>
			<meta
				name='description'
				content={description}
			/>
			<meta
				name='Author'
				content='George Shiloh'
			/>
			<meta
				name='color-scheme'
				content={'dark'}
			/>
			<meta
				name='theme-color'
				content={'dark'}
			/>
			<meta
				property={'og:title'}
				content={title}
			/>
			<meta
				property='og:description'
				content={description}
			/>
			<meta
				property='og:url'
				content={path}
			/>
			<meta
				name='twitter:title'
				content={title}
			/>
			<meta
				name='twitter:description'
				content={description}
			/>
			<link
				rel='canonical'
				href={path}
			/>
		</Helmet>
	);
}
export default MetaData;
