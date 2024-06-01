import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password } = body;

  if (!email || !password) {
    return new NextResponse('Email and password are required!', { status: 400 });
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      redirect: false,
    });

    return new NextResponse('Logged in!', { status: 200 });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return new NextResponse('Invalid credentials!', { status: 400 });
        default:
          return new NextResponse('Something went wrong!', { status: 400 });
      }
    }
  }
}
