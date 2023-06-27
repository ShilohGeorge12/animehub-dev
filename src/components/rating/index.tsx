import { FaStar, FaStarHalf } from 'react-icons/fa';

interface IRatingProps {
	rating: number;
	size?: string;
}

export function Rating(props: IRatingProps) {
	const { rating, size } = props;

	const classes = 'transition duration-300 hover:scale-125';
	const RenderStars = () => {
		const stars: JSX.Element[] = [];
		for (let i = 0; i <= Math.floor(rating - 1); i++) {
			stars.push(
				<span
					key={i}
					className={classes}>
					<FaStar />
				</span>
			);
		}
		if (rating % 1 !== 0) {
			stars.push(
				<span
					key={'half'}
					className={classes}>
					<FaStarHalf />
				</span>
			);
		}
		return stars;
	};
	return <span className={`text-yellow-500 ${size ? size : 'text-xl'} flex items-center gap-2`}>{<RenderStars />}</span>;
}
