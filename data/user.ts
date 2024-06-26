import prisma from '@/libs/db';
import { currentUser } from '@/libs/auth';

export const getUsers = async () => {
  const user = await currentUser();

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: user?.email,
        },
      },
    });

    return users;
  } catch (error) {
    return [];
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    return null;
  }
};
