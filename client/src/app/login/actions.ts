'use server';

import { cookies } from 'next/headers';

export async function loginAction(formData: FormData) {
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
}
