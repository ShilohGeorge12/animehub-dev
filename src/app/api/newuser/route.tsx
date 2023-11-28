import { MongoDB } from '@/db';
import { validateUsers } from '@/db/schema';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.formData();
		const { error, value } = validateUsers(body);
		// body.forEach((val) => console.log(val));

		if (error) {
			console.log(error);
			const errArr: (string | null)[] = [];
			error.details.map((err) => errArr.push(err.message));
			return NextResponse.json({ error: errArr }, { status: 400 });
		}

		console.log(value.email);
		// const newUser = await MongoDB.getUserModel().create({
		// 	username: body.get('username'),
		// 	email: body.get('email'),
		// 	password: '',
		// 	image: ,
		// 	gender: body.get('gender'),
		// })

		return NextResponse.json({ username: body.get('username'), email: body.get('email'), gender: body.get('gender') }, { status: 201 });
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json({ error: error.message }, { status: 400 });
		}
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
