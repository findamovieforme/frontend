'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuthStore } from '@/app/store';

const AuthButtons = () => {
  const { isAuthenticated, logout, isHydrated } = useAuthStore();

  React.useEffect(() => {
  }, [isAuthenticated]);

  if (!isHydrated) return null; 

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <>
          <Link href="/profile">
            <Button >Profile</Button>
          </Link>
          <Button variant="outline" onClick={logout}>
            Log out
          </Button>
        </>


      ) : (
        <>
          <Link href="/login">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
