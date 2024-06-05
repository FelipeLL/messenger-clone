import { useMemo } from 'react';
import { FullConversationType } from '@/types';
import { User } from '@prisma/client';
import { useCurrentUser } from './use-current-user';

export const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
  const currentUser = useCurrentUser();

  const otherUser = useMemo(() => {
    const otherUser = conversation.users.filter((user) => user.email !== currentUser?.email);

    return otherUser[0];
  }, [currentUser?.email, conversation.users]);

  return otherUser;
};
