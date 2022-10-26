import React, { useState } from 'react';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // new URL('/user/register', process.env.URL)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(new URL(`/user/login`, process.env.URL), {
      method: 'POST',
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <form
      action=''
      method='POST'
      className='flex flex-col'
      onSubmit={handleSubmit}
    >
      <label htmlFor='email'>Email</label>
      <input
        onChange={handleChange}
        value={form.email}
        type='email'
        name='email'
      />
      <label htmlFor='password'>Password</label>
      <input
        onChange={handleChange}
        value={form.password}
        type='password'
        name='password'
      />
      <button type='submit'>Login</button>
    </form>
  );
}

export default Login;
