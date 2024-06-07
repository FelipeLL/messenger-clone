import { Body } from '@/components/conversations/conversation-id/body';
import { Form } from '@/components/conversations/conversation-id/form';
import { Header } from '@/components/conversations/conversation-id/header';
import { EmptyState } from '@/components/empty-state';
import { getConversationById } from '@/data/conversations';
import { getMessages } from '@/data/messages';

interface IParams {
  conversationId: string;
}

const ConversationIdPage = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationIdPage;
