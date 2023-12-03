import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function IsAuth<T>(Component: React.ComponentType<T>) {
  return function Auth(props: T) {
    const cookieToken = cookies().get('token')?.value;

    if (!cookieToken) {
      redirect('/login');
    }

    const parsedToken = JSON.parse(cookieToken);

    if (!parsedToken.token) {
      redirect('/login');
    }

    return (
      <>
        <Component {...props!} />
      </>
    );
  };
}
