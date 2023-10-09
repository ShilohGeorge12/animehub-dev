// db.ts
import mongoose, { Connection, Model, Schema } from 'mongoose';
import { env } from '@/env';
import { carType } from '@/types';

class Database {
	private static instance: Database;
	private connection!: Connection;
	private carModel: Model<carType>;

	private constructor() {
		this.connect();
		this.carModel = this.createCarModel();
	}

	private connect() {
		mongoose.set('strictQuery', false);
		this.connection = mongoose.createConnection(env.DATABASE_URL, {
			writeConcern: { w: 'majority' },
			retryWrites: true,
		});

		this.connection.on('error', (error) => {
			console.error('MongoDB connection error:', error);
		});

		this.connection.once('open', () => {
			console.log('Connected to MongoDB');
		});
	}

	private createCarModel(): Model<carType> {
		const carSchema = new Schema<carType>({
			title: {
				type: String,
				required: [true, 'title is Required!'],
				minlength: 1,
			},
			mileage: {
				type: Number,
				required: [true, 'Price is Required!'],
				minlength: 1,
			},
			price: {
				type: Number,
				required: [true, 'Price is Required!'],
				min: 4,
			},
			src: {
				type: [String],
				required: [true, 'images is required for car identification'],
			},
			vehicleReg: {
				type: String,
				minlength: 8,
				required: [true, 'vehicleReg is Required'],
			},
			status: {
				type: String,
				minlength: 1,
				default: 'In Good Condition',
			},
			make: {
				type: String,
				minlength: 2,
				required: [true, 'vehicleMake is Required'],
			},
			model: {
				type: String,
				minlength: 4,
				maxlength: 4,
				required: [true, 'model year is Required'],
			},
			createdAt: {
				type: Date,
				default: () => new Date(),
			},
		});

		return this.connection.model<carType>('cars', carSchema);
	}

	public static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	public getCarModel(): Model<carType> {
		return this.carModel;
	}
}

export const DB = Database.getInstance();
