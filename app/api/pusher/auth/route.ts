import { currentUser } from '@/libs/auth';
import { pusherServer } from '@/libs/pusher';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await currentUser();
  const body = await request.text();

  if (!user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const [socketId, channel] = body.split('&').map((str) => str.split('=')[1]);

  const data = {
    user_id: user.email,
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

  return NextResponse.json(authResponse);
}
