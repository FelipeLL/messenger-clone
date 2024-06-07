import { currentUser } from '@/libs/auth';
import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

interface IParams {
  conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params;
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [user.id],
        },
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log(error, 'ERROR_CONVERSATION_DELETE');
    return new NextResponse('Internal error', { status: 500 });
  }
}
