import { loginAction } from '@/app/login/actions';

export default function Login() {
  return (
    <form action={loginAction} className='flex flex-col space-y-4'>
      <label>
        <span className='text-gray-200'>Email</span>
        <input
          name='email'
          className='mt-1 h-8 w-full rounded-md border-gray-300 shadow-sm'
        />
      </label>
      <label>
        <span className='text-gray-200'>Password</span>
        <input
          name='password'
          type='password'
          className='mt-1 h-8 w-full rounded-md border-gray-300 shadow-sm'
        />
      </label>
      <button className='py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700'>
        Login
      </button>
    </form>
  );
}
