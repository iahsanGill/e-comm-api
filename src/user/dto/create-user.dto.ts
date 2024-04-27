import { z } from 'zod';

export const CreateUserSchema = z.object({
  firstName: z.string({ message: 'First name is required' }),
  lastName: z.string({ message: 'Last name is required' }),
  email: z.string().email({ message: 'Email must be a valid email' }),
  password: z
    .string({ message: 'Password is required' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      {
        message:
          'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
      },
    ),
  isAdmin: z.boolean().optional().default(false),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
