import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { findUserByEmail } from '@/lib/db';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Decode the mock token to get the email
    // In a real app, you would verify the JWT signature
    let userEmail;
    try {
      const decoded = JSON.parse(Buffer.from(token.value, 'base64').toString('utf-8'));
      userEmail = decoded.email;
    } catch (e) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    const user = findUserByEmail(userEmail);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data without sensitive info like password
    const { password, ...userProfile } = user;

    return NextResponse.json(
      { message: 'Profile fetched successfully', user: userProfile },
      { status: 200 }
    );
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
