import { currentUser } from '@/libs/auth';
import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    const body = await request.json();
    const { name, image } = body;

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        image: image,
        name: name,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, 'ERROR_SETTINGS');
    return new NextResponse('Internal error', { status: 500 });
  }
}
