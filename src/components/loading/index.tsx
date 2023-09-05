export const AnimeLoadingSkeleton = ({ width, height }: { width: string; height: string }) => {
	return <div className={`${width} ${height} mx-auto transition duration-700 ease-in-out bg-pink-300 rounded-lg group-hover:scale-125 animate-pulse`} />;
};
export function AnimeImageLoading() {
	return <div className={'w-[144px] h-[208px] transition duration-500 ease-in-out bg-pink-300 dark:bg-pink-500 rounded-lg animate-pulse'} />;
}
