import prisma from '@/libs/db';
import { currentUser } from '@/libs/auth';

export const getConversations = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: user.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversations;
  } catch (error) {
    return [];
  }
};
