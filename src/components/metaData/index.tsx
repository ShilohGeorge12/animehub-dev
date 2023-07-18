import { Helmet } from 'react-helmet-async';

interface ImetaProps {
	title: string;
	description: string;
	path: string;
	theme?: 'light' | 'dark';
}

function MetaData(props: ImetaProps) {
	const { title, description, path, theme } = props;
	const UrlPath = import.meta.env.VITE_MODE === 'development' ? `http://localhost:5051${path}` : `https://animehub-dev.netlify.app${path}`;
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
				content={theme ?? 'light dark'}
			/>
			<meta
				name='theme-color'
				content={theme ?? 'light dark'}
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
				content={UrlPath}
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
				href={UrlPath}
			/>
		</Helmet>
	);
}
export default MetaData;
