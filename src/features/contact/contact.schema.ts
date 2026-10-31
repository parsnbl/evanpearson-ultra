import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.'),
  email: z.email('Please enter a valid email address.'),
  message: z.string().trim().min(10, 'Please write at least 10 characters.'),
})

export type ContactMessage = z.infer<typeof contactSchema>
