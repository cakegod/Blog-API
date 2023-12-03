'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prev: any, formData: FormData) {
  try {
    const res = await fetch(`${process.env.URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });

    const data = await res.json();

    cookies().set('token', JSON.stringify(data), { httpOnly: true });

    redirect('/dashboard');
  } catch (e) {
    return 'Invalid credentials! Please try again.';
  }
}
