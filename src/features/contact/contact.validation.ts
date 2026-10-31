import { z } from 'zod'
import { CONTACT_FIELDS, contactSchema } from './contact.schema'
import type { ContactFieldErrors, ContactMessage } from './contact.schema'

export type ContactParseResult =
  | { ok: true; value: ContactMessage }
  | { ok: false; fieldErrors: ContactFieldErrors }

/**
 * Validates raw form values against the contact schema.
 * @param values - Raw field values, e.g. from `FormData`
 * @returns The parsed message, or the first error message per field
 * @throws Never
 */
export function parseContactForm(
  values: Record<string, unknown>,
): ContactParseResult {
  const result = contactSchema.safeParse(values)
  if (result.success) {
    return { ok: true, value: result.data }
  }
  const { fieldErrors } = z.flattenError(result.error)
  const firstErrors: ContactFieldErrors = {}
  for (const field of CONTACT_FIELDS) {
    const message = fieldErrors[field]?.[0]
    if (message !== undefined) {
      firstErrors[field] = message
    }
  }
  return { ok: false, fieldErrors: firstErrors }
}
