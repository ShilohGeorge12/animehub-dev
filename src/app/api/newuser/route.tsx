import { MongoDB } from '@/db';
import { validateUsers } from '@/db/schema';
import { NextResponse, NextRequest } from 'next/server';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import process from 'process';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
	try {
		const body = await req.formData();
		const bodyObj = Object.fromEntries(body.entries());
		const { error, value } = validateUsers(bodyObj);

		if (error) {
			console.log(error);
			const errArr: (string | null)[] = [];
			error.details.map((err) => errArr.push(err.message));
			return NextResponse.json({ error: errArr }, { status: 400 });
		}

		const bytes = await value.image.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const path = join(process.cwd() + '/public/users', value.image.name);
		await writeFile(path, buffer);

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(value.password, salt);

		const newUser = await MongoDB.getUserModel().create({
			username: value.username,
			email: value.email,
			password: hashedPassword,
			image: value.image.name,
			gender: value.gender,
		});

		return NextResponse.json({ message: `User ${newUser.username} Successfully Created` }, { status: 201 });
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json({ error: error.message }, { status: 400 });
		}
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
