// import type { carType } from '../../types';
import z from 'zod';

export const validateCar = z.object({
	src: z.array(z.string()),
	title: z.string().refine((value) => /^[a-zA-Z0-9\s]{2,30}$/.test(value), {
		message: 'Car title must be 2 to 30 characters and may contain only letters, numbers, and spaces.',
	}),
	price: z
		.string()
		.min(2)
		.refine((value) => /^0-9$/.test(value), {
			message: 'Price Must be a valid price with 0-9 digits',
		}),
	mileage: z
		.string()
		.min(2)
		.refine((value) => /^0-9$/.test(value), {
			message: 'Mileage Must be a vaild number betwwen 0-9.',
		}),
	vehicleReg: z
		.string()
		.min(2)
		.refine((value) => /^[a-zA-Z0-9\s]{9}$/.test(value), {
			message: 'Vehicle registration number must be exactly 9 characters and may only contain letters, numbers, and spaces.',
		}),
	make: z
		.string()
		.min(2)
		.refine((value) => /^[a-zA-Z\s]{2,}$/.test(value), {
			message: 'Vehicle Make must be at least 2 characters and may only contain letters and spaces.',
		}),
	model: z
		.string()
		.min(4)
		.max(4)
		.refine((value) => /^[0-9]{4}$/.test(value), {
			message: '`year` Must be a valid Calender Year',
		}),
	status: z
		.string()
		.min(1)
		.refine((value) => /^[0-9]{11}$/.test(value), {
			message: 'Faults/Missing Parts .',
		}),
});
