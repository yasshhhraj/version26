import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated', isAuthenticated: false },
        { status: 401 }
      );
    }

    // In a real app, you would verify the JWT token here.

    return NextResponse.json(
      { message: 'Authenticated', isAuthenticated: true, token: token.value },
      { status: 200 }
    );
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
