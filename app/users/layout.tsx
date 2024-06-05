import { Sidebar } from '@/components/sidebar/sidebar';
import { UserList } from '@/components/users/user-list';
import { getUsers } from '@/data/user';

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers();
  return (
    <Sidebar>
      <UserList items={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default UsersLayout;
