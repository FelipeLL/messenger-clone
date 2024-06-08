import { ConversationList } from '@/components/conversations/conversation-list';
import { Sidebar } from '@/components/sidebar/sidebar';
import { getConversations } from '@/data/conversations';
import { getUsers } from '@/data/user';

const ConversationsLayout = async ({ children }: { children: React.ReactNode }) => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
