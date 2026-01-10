import { NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, college, roll, mobile, semester } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    const newUser = createUser({
      email,
      password, // In a real app, hash this password!
      name,
      college,
      roll,
      mobile,
      semester,
    });

    return NextResponse.json(
      { message: 'User created successfully', user: { email: newUser.email, name: newUser.name } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
