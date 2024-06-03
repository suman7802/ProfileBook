import { z } from 'zod';
import { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../context/auth.context';

const formSchema = z.object({
  fullName: z.string().nonempty({ message: 'Please provide full name' }),

  email: z
    .string()
    .nonempty({ message: 'Please provide email' })
    .email({ message: 'Invalid email address.' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(/\d/, { message: 'Password must contain at least one digit.' }),

  role: z.enum(['USER', 'ADMIN']).default('USER'),

  adminPassword: z
    .string()
    .optional()
    .refine(
      (adminPassword, parent) => {
        const role = parent?.role ?? 'USER';
        return role !== 'ADMIN' || adminPassword.trim() !== '';
      },
      {
        message: 'Please provide admin password',
      },
    ),
});

export default function SignUp() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('useAuth must be used within a AuthProvider');

  const { loading, signUp } = context;

  const form = useForm({ resolver: zodResolver(formSchema) });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((show) => !show);

  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const toggleAdminPasswordVisibility = () =>
    setShowAdminPassword((show) => !show);

  function onSubmit(values) {
    signUp(
      values.email,
      values.password,
      values.fullName,
      values.role,
      values.adminPassword,
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 rounded-lg bg-gray-200 p-10"
      >
        <h2 className="text-2xl font-bold text-indigo-600">Sign Up</h2>

        <div className="flex flex-col gap-3 text-gray-500">
          <label>
            <span className="mb-3 ml-1">Full Name</span>
            <input
              {...form.register('fullName')}
              className="mt-2 w-full rounded-md px-2 py-2 focus:outline-none"
              placeholder="John Doe"
            />
            {form.formState.errors.fullName && (
              <p className="text-red-500">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </label>

          <label>
            <span className="ml-1">Email</span>
            <input
              {...form.register('email')}
              className="mt-2 w-full rounded-md px-2 py-2 focus:outline-none"
              placeholder="john.doe@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </label>

          <label>
            <span className="ml-1">Password</span>
            <div className="password relative">
              <input
                {...form.register('password')}
                type={showPassword ? 'text' : 'password'}
                className="mt-2 w-full rounded-md px-2 py-2 focus:outline-none"
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
              <p className="text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </label>

          <label>
            <span className="ml-1">Role</span>
            <select
              {...form.register('role')}
              onChange={(e) => form.setValue('role', e.target.value)}
              value={form.watch('role')}
              className="mt-2 w-full rounded-md px-2 py-2 focus:outline-none"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>

          {form.watch('role') === 'ADMIN' && (
            <label>
              <span className="ml-1">Admin Password</span>
              <div className="password relative">
                <input
                  {...form.register('adminPassword')}
                  type={showAdminPassword ? 'text' : 'password'}
                  className="mt-2 w-full rounded-md px-2 py-2 focus:outline-none"
                  placeholder="********"
                />

                <button
                  type="button"
                  className="absolute right-3 top-[30%]"
                  onClick={toggleAdminPasswordVisibility}
                >
                  {showAdminPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </button>
              </div>
              {form.formState.errors.adminPassword && (
                <p className="text-red-500">
                  {form.formState.errors.adminPassword.message}
                </p>
              )}
            </label>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Submit{loading && 'ting...'}
        </button>
        <Link
          to="/auth/login"
          className="pl-1 text-sm text-indigo-600 hover:underline"
        >
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}
