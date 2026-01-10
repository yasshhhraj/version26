import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { findUserByEmail } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing email or password' },
        { status: 400 }
      );
    }

    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // In a real app, generate a real JWT token containing user ID
    // For this demo, we'll encode the email in the token to retrieve the user later
    const token = Buffer.from(JSON.stringify({ email: user.email, id: user.id })).toString('base64');

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return NextResponse.json(
      { message: 'Login successful', user: { email: user.email, name: user.name } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
