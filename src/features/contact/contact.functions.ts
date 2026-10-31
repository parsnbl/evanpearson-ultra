import { createServerFn } from '@tanstack/react-start'
import { contactSchema } from './contact.schema'
import { sendContactEmail } from './contact.server'

export const sendContact = createServerFn({ method: 'POST' })
  .validator(contactSchema)
  .handler(({ data }) => sendContactEmail(data))
