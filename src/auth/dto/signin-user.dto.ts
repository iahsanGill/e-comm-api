import { z } from 'zod';

export const SignInUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInUserDto = z.infer<typeof SignInUserSchema>;
