import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AuthButtons = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Mark component as mounted on the client side
    setIsMounted(true);

    // Retrieve token from local storage once mounted
    const authData = JSON.parse(localStorage.getItem('auth-token')!);
    const token = authData?.state?.accessToken;

    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Clear local storage and update state
    localStorage.removeItem('auth-token');
    setIsAuthenticated(false);
  };

  // Avoid rendering until hydration is complete
  if (!isMounted) {
    return null; // or a loading indicator if preferred
  }

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <Button variant="outline" onClick={handleLogout}>Log out</Button>
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
