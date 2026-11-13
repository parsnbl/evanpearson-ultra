import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { sendContact } from './contact.functions'
import { contactSchema } from './contact.schema'

type FieldErrors = Partial<Record<'name' | 'email' | 'message', Array<string>>>

type FormState =
  | { status: 'idle'; fieldErrors: FieldErrors }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error' }

/**
 * Minimal contact form that validates with Zod and calls the `sendContact` server function.
 * @returns The form with loading, success and error states
 * @throws Never
 */
export function ContactForm() {
  const send = useServerFn(sendContact)
  const [state, setState] = useState<FormState>({
    status: 'idle',
    fieldErrors: {},
  })

  /**
   * Validates the submitted fields and sends them to the server.
   * @param event - Form submit event
   * @returns Resolves once the request settles
   * @throws Never
   */
  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget))
    const result = contactSchema.safeParse(values)
    if (!result.success) {
      setState({
        status: 'idle',
        fieldErrors: z.flattenError(result.error).fieldErrors,
      })
      return
    }
    setState({ status: 'submitting' })
    try {
      await send({ data: result.data })
      setState({ status: 'success' })
    } catch {
      setState({ status: 'error' })
    }
  }

  if (state.status === 'success') {
    return <p role="status">Thanks! Your message is on its way.</p>
  }

  const errors = state.status === 'idle' ? state.fieldErrors : {}

  return (
    <form
      noValidate
      aria-label="Contact"

      onSubmit={(event) => void handleSubmit(event)}
    >
      <label htmlFor="contact-name">Name</label>
      <input id="contact-name" name="name" />
      {errors.name?.[0] && <p>{errors.name[0]}</p>}

      <label htmlFor="contact-email">Email</label>
      <input id="contact-email" name="email" type="email" />
      {errors.email?.[0] && <p>{errors.email[0]}</p>}

      <label htmlFor="contact-message">Message</label>
      <textarea id="contact-message" name="message" />
      {errors.message?.[0] && <p>{errors.message[0]}</p>}

      {state.status === 'error' && (
        <p role="alert">Something went wrong. Please try again.</p>
      )}
      <button type="submit" disabled={state.status === 'submitting'}>
        {state.status === 'submitting' ? 'Sending…' : 'Send'}
      </button>
    </form>
  )
}
