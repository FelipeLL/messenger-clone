'use client';

import { signOut } from 'next-auth/react';

const UsersPage = () => {
  return (
    <div>
      <p>USERS PAGE</p>
      <button onClick={() => signOut()}>LOGOUT</button>
    </div>
  );
};

export default UsersPage;
