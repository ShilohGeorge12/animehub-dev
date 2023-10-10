import { MongoDB } from '@/db';
import { validateUpdateUser } from '@/db/schema';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';

export async function GET(_: NextRequest, { params }: { params: { _id: string } }) {
	try {
		const { _id } = params;
		const user = await MongoDB.getUserModel().findOne({ _id }).select('-__v -password').populate('animes', '-__v');

		if (!user) {
			return NextResponse.json({ error: 'User Not Found!' }, { status: 404 });
		}

		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
}

export async function PUT(req: NextRequest, { params }: { params: { _id: string } }) {
	try {
		const body = (await req.json()) as unknown;
		const { _id } = params;
		const { error, value } = validateUpdateUser(body);
		const user = await MongoDB.getUserModel().findOne({ _id }).select('-__v');

		if (error) {
			console.log(error);
			const errArr: (string | null)[] = [];
			error.details.map((err) => errArr.push(err.message));
			return NextResponse.json({ error: errArr }, { status: 400 });
		}
		if (!user) {
			return NextResponse.json({ error: 'User Not Found!' }, { status: 404 });
		}

		if (value) {
			const { username, password, email, image } = value;
			const result = await bcrypt.compare(password, user.password);
			if (result) {
				user.password = password;
			}
			user.username = username;
			user.email = email;
			user.image = image;
			await user.save();
			return NextResponse.json(user);
		}

		return NextResponse.json({});
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
}
