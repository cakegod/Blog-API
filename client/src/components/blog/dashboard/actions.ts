'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function statusAction(formData: FormData) {
  const cookieToken = cookies().get('token')?.value;

  if (!cookieToken) {
    redirect('/login');
  }
  const parsedToken = JSON.parse(cookieToken);

  if (parsedToken.token) {
    redirect('/login');
  }

  const form = Object.fromEntries(formData);
  await fetch(`${process.env.URL}/posts/${form.slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${parsedToken?.token}`,
    },
    body: JSON.stringify({
      status: form.status,
    }),
  });
  revalidatePath('/dashboard');
}
