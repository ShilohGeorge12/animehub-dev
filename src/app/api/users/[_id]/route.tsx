import { MongoDB } from '@/db';
import { validateUpdateUser } from '@/db/schema';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { writeFile } from 'fs/promises';
import { join } from 'path';

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
			// user.image = image;
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

export async function PATCH(req: NextRequest, { params }: { params: { _id: string } }) {
	try {
		const body = await req.formData();
		const bodyObj = Object.fromEntries(body.entries());
		const _id = params._id;
		const { error, value } = validateUpdateUser(bodyObj);

		if (error) {
			console.log(error);
			const errArr: (string | null)[] = [];
			error.details.map((err) => errArr.push(err.message));
			return NextResponse.json({ error: errArr }, { status: 400 });
		}

		const user = await MongoDB.getUserModel().findOne({ _id }).select('-__v');

		if (!user) {
			return NextResponse.json({ error: `User With Id ${_id} Was Not Found` }, { status: 404 });
		}

		if (value.image) {
			const bytes = await value.image.arrayBuffer();
			const buffer = Buffer.from(bytes);
			const path = join(process.cwd() + '/public/users', value.image.name);
			await writeFile(path, buffer);
			user.image = value.image.name;
		}

		if (value.password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(value.password, salt);
			user.password = hashedPassword;
		}

		if (value.username) {
			user.username = value.username;
		}

		if (value.gender) {
			user.gender = value.gender;
		}

		await user.save();
		const updatedUser = await MongoDB.getUserModel().findOne({ _id }).populate('animes', '-__v').select('-__v -password -authkey');

		return NextResponse.json(updatedUser, { status: 201 });
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
}
