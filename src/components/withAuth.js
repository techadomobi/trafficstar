// components/auth/withAuth.js
"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  // This is the new component that will be returned, wrapping the original one.
  const AuthComponent = (props) => {
    const router = useRouter();
    // We need a loading state to prevent a "flash" of the protected content
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
      // Check for advertiserData in localStorage
      const advertiserDataString = localStorage.getItem('advertiserData');

      if (!advertiserDataString) {
        // If no data, redirect to the login page
        console.error("Authentication check failed. Redirecting to login.");
        router.replace('/');
      } else {
        // If data exists, we can stop verifying and show the page
        setIsVerifying(false);
      }
    }, [router]);

    // While we are verifying, show a loader or nothing at all
    // This prevents the protected content from flashing on the screen
    if (isVerifying) {
      // You can return a full-page loader here if you want
      return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
           <div className="h-10 w-10 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
        </div>
      );
    }

    // If verification is complete, render the actual page component
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
