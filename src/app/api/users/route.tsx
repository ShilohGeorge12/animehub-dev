import { MongoDB } from '@/db';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(_: NextRequest) {
	const users = await MongoDB.getUserModel().find().sort('username').select('-__v -password').populate('animes', '-__v -password');

	return NextResponse.json(users, { status: 200 });
}
