import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Please provide email' })
    .email({ message: 'Invalid email address.' }),

  password: z.string().nonempty({ message: 'Please provide password' }),
});

export default function Login() {
  const { loading, logIn, email } = useContext(AuthContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email },
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((show) => !show);

  function onSubmit(values) {
    logIn(values.email, values.password);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col bg-gray-200 rounded-lg p-10 gap-5"
      >
        <h2 className="text-2xl font-bold text-indigo-600">Login</h2>

        <div className="flex flex-col gap-3 text-gray-500">
          <label>
            <span className="ml-1">Email</span>
            <input
              {...form.register('email')}
              className="w-full rounded-md px-2 py-2 mt-2 focus:outline-none"
              placeholder="john.doe@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500">{form.formState.errors.email.message}</p>
            )}
          </label>

          <label>
            <span className="ml-1">Password</span>

            <div className="password relative">
              <input
                {...form.register('password')}
                type={showPassword ? 'text' : 'password'}
                className="w-full rounded-md px-2 py-2 mt-2 focus:outline-none"
                placeholder="********"
              />

              <button
                type="button"
                className="absolute right-3 top-[30%]"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </div>

            {form.formState.errors.password && (
              <p className="text-red-500">{form.formState.errors.password.message}</p>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Login{loading && 'ing'}
        </button>
      </form>
    </div>
  );
}
