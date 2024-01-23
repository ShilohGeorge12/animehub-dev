'use client';
import { default as Video } from 'react-player';
import { toast } from 'sonner';

export const VideoPlayer = () => {
	return (
		<Video
			url={'file:///home/shiloh-george/Videos/Attack-on-titans-1.mp4'}
			controls
			onError={(e: Error) => toast.error(e.message)}
			width={300}
			height={150}
		/>
	);
};
