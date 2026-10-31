import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'
import type { ContactMessage } from './contact.schema'

export type ContactDelivery = { delivered: boolean }

/**
 * Reads the contact email configuration from the server environment.
 * @returns The validated server env for contact delivery
 * @throws {Error} If an env var is set but invalid
 */
function getContactEnv() {
  return createEnv({
    server: { CONTACT_EMAIL_TO: z.email().optional() },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
  })
}

/**
 * Delivers a contact message. Stubbed: no provider is integrated yet.
 * When `CONTACT_EMAIL_TO` is unset the message is accepted as a dry run.
 * @param message - Validated contact message
 * @returns Whether the message was (stub-)delivered
 * @throws {Error} If the server env is misconfigured
 */
export function sendContactEmail(message: ContactMessage): ContactDelivery {
  const { CONTACT_EMAIL_TO } = getContactEnv()
  if (CONTACT_EMAIL_TO === undefined) {
    return { delivered: false }
  }
  // TODO: Replace with a real email provider call.
  console.info(
    `[contact] stub email to ${CONTACT_EMAIL_TO} from ${message.email}`,
  )
  return { delivered: true }
}
