import { Helmet } from 'react-helmet-async';

interface ImetaProps {
	title: string;
	description: string;
	path: string;
	theme?: 'light' | 'dark';
}

function MetaData(props: ImetaProps) {
	const { title, description, path, theme } = props;
	const UrlPath = `http://localhost:5051${path}`;
	// const UrlPath = `https://animehub-dev.netlify.app${path}`;
	return (
		<Helmet>
			<title>{title}</title>
			<meta
				name='description'
				content={description}
			/>
			<meta
				http-equiv='Author'
				content='George Shiloh'
			/>
			<meta
				http-equiv='content-language'
				content='en-us'
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
