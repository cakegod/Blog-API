'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function statusAction(formData: FormData) {
  const cookieToken = cookies().get('token')?.value;
  const { token } = cookieToken && JSON.parse(cookieToken);

  const form = Object.fromEntries(formData);
  await fetch(`${process.env.URL}/posts/${form.slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status: form.status,
    }),
  });
  revalidatePath('/dashboard');
}
