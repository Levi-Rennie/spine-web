import { z } from 'zod';

export const createLoanSchema = z.object({
  member_id: z.number().int().positive(),
  book_title: z.string().min(1),
  borrowed_on: z.string().date(),
  due_on: z.string().date(),
});

export type CreateLoan = z.infer<typeof createLoanSchema>;