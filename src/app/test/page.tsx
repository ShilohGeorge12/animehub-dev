'use client';

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useEdgeStore } from '@/lib/edgestore';
import { EdgeStoreApiClientError } from '@edgestore/react/shared';
import { toast } from 'sonner';
import { formatFileSize } from '@edgestore/react/utils';

export default function UploadImage() {
	const defaultImage = '/others/user2.png';
	const [file, setFile] = useState<File>();
	const [selectedImage, setSelectedImage] = useState<{ name: string; url: string }>({ name: 'default', url: defaultImage });
	const { edgestore } = useEdgeStore();
	const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		if (!files) return;
		setSelectedImage({ name: files[0].name, url: URL.createObjectURL(files[0]) });
		setFile(files[0]);
	};

	const onSubmit = async () => {
		try {
			console.log({ selectedImage, file });
			if (!file) return;
			const res = await edgestore.videos.upload({ file });
			console.log(res.url);
			console.log(file.type.split('/')[1]);
		} catch (error) {
			if (error instanceof EdgeStoreApiClientError) {
				if (error.data.code === 'FILE_TOO_LARGE') {
					toast.error(`File too large. Max size is ${formatFileSize(error.data.details.maxFileSize)}`);
				}
				if (error.data.code === 'MIME_TYPE_NOT_ALLOWED') {
					toast.error(`File type not allowed. Allowed types are ${error.data.details.allowedMimeTypes.join(', ')}`);
				}
			}
		}
	};

	return (
		<section className='flex flex-col items-center justify-center w-full h-full gap-4'>
			<input
				type='file'
				name='image'
				id='image'
				hidden
				placeholder={'image'}
				accept='.png, .webp'
				required={true}
				onChange={onImageChange}
			/>

			<div
				className={
					'w-[90%] md:w-3/4 h-10 text-white text-sm md:text-base flex gap-2 items-center'
					// 'w-[90%] md:w-3/4 h-10 px-8 outline-none rounded-lg p-1 bg-transparent placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base'
				}>
				<Image
					src={selectedImage.url}
					alt=''
					className='w-12 rounded-[50%] object-cover'
					width={100}
					height={100}
				/>

				<label
					htmlFor='image'
					className='flex-1 h-full p-2 text-center align-middle transition duration-500 ease-in-out border-2 border-pink-500 rounded-md cursor-pointer hover:bg-pink-500 hover:border-pink-500'>
					{selectedImage.url === defaultImage ? 'Select An Image' : selectedImage.name}
				</label>
			</div>

			<button
				type='button'
				name={`upload image`}
				className={`p-2 rounded-md border-2 bg-pink-500/30 transition duration-500 ease-in-out hover:bg-pink-500 border-pink-500 text-white`}
				onClick={onSubmit}>
				Upload
			</button>
		</section>
	);
}
