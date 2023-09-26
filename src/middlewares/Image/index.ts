import multer from 'multer';
import ImageError from '../Error/Custom/index.js';

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'dist/public/images');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
	fileFilter: (_, file, cb) => {
		const fileTypes = /webp/;
		const mimeType = fileTypes.test(file.mimetype);
		const extName = fileTypes.test(file.originalname.toLowerCase());
		if (mimeType && extName) {
			return cb(null, true);
		} else {
			return cb(new ImageError('Only webp images are allowed!'));
		}
	},
	storage: storage,
});

export default upload;
