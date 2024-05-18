import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Please provide email' })
    .email({ message: 'Invalid email address.' }),

  otp: z.string().length(5, { message: 'OTP must be 6 digits.' }),
});

export default function VerifyAccount() {
  const { loading, verify } = useContext(AuthContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values) {
    verify(values.otp, values.email);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col bg-gray-200 rounded-lg p-10 gap-5"
      >
        <h2 className="text-2xl font-bold text-indigo-600">Verify Account</h2>

        <div className="flex flex-col gap-3 text-gray-500">
          <label>
            <span className="ml-1">Email</span>
            <input
              type="email"
              {...form.register('email')}
              placeholder="john.doe@example.com"
              className="w-full rounded-md px-2 py-2 mt-2 focus:outline-none"
            />
            {form.formState.errors.email && (
              <p className="text-red-500">{form.formState.errors.email.message}</p>
            )}
          </label>

          <label>
            <span className="ml-1">OTP</span>
            <input
              placeholder="*****"
              {...form.register('otp')}
              className="w-full rounded-md px-2 py-2 mt-2 focus:outline-none"
            />
            {form.formState.errors.otp && (
              <p className="text-red-500">{form.formState.errors.otp.message}</p>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Verify{loading && 'ing'}
        </button>
      </form>
    </div>
  );
}
