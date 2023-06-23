import { Helmet } from 'react-helmet-async';

interface ImetaProps {
	title: string;
	description: string;
	path: string;
	theme?: 'light' | 'dark';
}

function MetaData(props: ImetaProps) {
	const { title, description, path, theme } = props;


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
				name="color-scheme"
				content={ theme ?? "light dark"}
			/>
			<link rel='canonical' href={`http://localhost:5051${path}`} />
		</Helmet>
	);
};
export default MetaData;
