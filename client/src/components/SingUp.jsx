import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  fullName: z.string().regex(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
    message: 'Please provide your full name.',
  }),

  email: z
    .string()
    .nonempty({ message: 'Please provide email' })
    .email({ message: 'Invalid email address.' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(/\d/, { message: 'Password must contain at least one digit.' }),

  adminPassword: z.string().nonempty({ message: 'Please provide admin password' }),
});

export default function SignUp() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { role: 'USER' },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col bg-gray-200 rounded-lg p-10 gap-5"
      >
        <h2 className="text-2xl font-bold text-gray-600">Sign Up</h2>

        <div className="flex flex-col gap-3 text-gray-500">
          <label>
            <span className="ml-1 mb-3">Full Name</span>
            <input
              {...form.register('fullName')}
              className="w-full rounded-md px-2 py-2 mt-2"
              placeholder="John Doe"
            />
            {form.formState.errors.fullName && (
              <p className="text-red-500">{form.formState.errors.fullName.message}</p>
            )}
          </label>

          <label>
            <span className="ml-1">Email</span>
            <input
              {...form.register('email')}
              className="w-full rounded-md px-2 py-2 mt-2"
              placeholder="john.doe@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500">{form.formState.errors.email.message}</p>
            )}
          </label>

          <label>
            <span className="ml-1">Password</span>
            <input
              {...form.register('password')}
              type="password"
              className="w-full rounded-md px-2 py-2 mt-2"
              placeholder="********"
            />
            {form.formState.errors.password && (
              <p className="text-red-500">{form.formState.errors.password.message}</p>
            )}
          </label>

          <label>
            <span className="ml-1">Role</span>
            <select {...form.register('role')} className="w-full rounded-md px-2 py-2 mt-2">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>

          {form.watch('role') === 'ADMIN' && (
            <label>
              <span className="ml-1">Admin Password</span>
              <input
                {...form.register('adminPassword')}
                type="password"
                className="w-full rounded-md px-2 py-2 mt-2"
                placeholder="********"
                s
              />
              {form.formState.errors.adminPassword && (
                <p className="text-red-500">{form.formState.errors.adminPassword.message}</p>
              )}
            </label>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700   "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
