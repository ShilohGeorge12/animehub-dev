import { MongoDB } from '@/db';
import { Theme } from '@/types';
import { NextResponse, NextRequest } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { _id: string } }) {
	try {
		const { _id } = params;
		const { theme } = (await req.json()) as unknown as { theme: Theme };
		const user = await MongoDB.getUserModel().findOne({ _id }).select('_id theme');

		if (!user) {
			return NextResponse.json({ error: `User with id ${_id} was Not Found!` }, { status: 404 });
		}

		if (theme && (theme === 'dark' || theme === 'light')) {
			user.theme = theme;
			await user.save();
			return NextResponse.json(user);
		}
		return NextResponse.json({ error: `theme can not be undefined or empty, Please Provide Theme!` });
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
}
