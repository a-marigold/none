import { infer as zInfer } from 'zod';
import { SafeUserSchema } from './User';

export const UpdateUserSchema = SafeUserSchema.pick({
    userName: true,
    fullName: true,
});

export type UpdateUser = zInfer<typeof UpdateUserSchema>;
