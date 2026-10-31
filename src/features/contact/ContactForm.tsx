import { useCallback, useReducer } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { css } from 'styled-system/css'
import { sendContact } from './contact.functions'
import {
  contactFormReducer,
  initialContactFormState,
} from './contact-form.state'
import { parseContactForm } from './contact.validation'
import type { ContactField } from './contact.schema'

const GENERIC_ERROR = 'Something went wrong sending your message. Please try again.'

const FIELDS: ReadonlyArray<{
  name: ContactField
  label: string
  type: 'text' | 'email' | 'textarea'
  autoComplete?: string
}> = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'message', label: 'Message', type: 'textarea' },
]

const styles = {
  form: css({ display: 'grid', gap: '5', maxW: 'xl' }),
  field: css({ display: 'grid', gap: '1' }),
  label: css({ fontWeight: 'medium' }),
  input: css({
    bg: 'surface',
    color: 'fg',
    borderWidth: '1px',
    borderColor: 'border',
    borderRadius: 'md',
    px: '3',
    py: '2',
    _focusVisible: { outline: '2px solid', outlineColor: 'accent' },
    '&[aria-invalid="true"]': { borderColor: 'red.500' },
  }),
  textarea: css({ minH: '40' }),
  error: css({ color: 'red.500', fontSize: 'sm' }),
  button: css({
    justifySelf: 'start',
    bg: 'accent',
    color: 'white',
    fontWeight: 'semibold',
    px: '5',
    py: '2',
    borderRadius: 'md',
    cursor: 'pointer',
    _disabled: { opacity: 0.6, cursor: 'wait' },
  }),
  success: css({ color: 'green.600', fontWeight: 'medium' }),
}

/**
 * Reads the contact fields from submitted form data.
 * @param form - The submitted form element
 * @returns Raw values keyed by field name
 * @throws Never
 */
function readFormValues(form: HTMLFormElement): Record<string, unknown> {
  const data = new FormData(form)
  return Object.fromEntries(FIELDS.map((field) => [field.name, data.get(field.name)]))
}

/**
 * Contact form that validates on the client, then calls the `sendContact` server function.
 * @returns The form with loading, success and error states
 * @throws Never
 */
export function ContactForm() {
  const send = useServerFn(sendContact)
  const [state, dispatch] = useReducer(
    contactFormReducer,
    initialContactFormState,
  )

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const parsed = parseContactForm(readFormValues(event.currentTarget))
      if (!parsed.ok) {
        dispatch({ type: 'invalid', fieldErrors: parsed.fieldErrors })
        return
      }
      dispatch({ type: 'submit' })
      try {
        await send({ data: parsed.value })
        dispatch({ type: 'succeeded' })
      } catch {
        dispatch({ type: 'failed', message: GENERIC_ERROR })
      }
    },
    [send],
  )

  const fieldErrors = state.status === 'idle' ? state.fieldErrors : {}
  const isSubmitting = state.status === 'submitting'

  if (state.status === 'success') {
    return (
      <p role="status" className={styles.success}>
        Thanks! Your message is on its way.
      </p>
    )
  }

  return (
    <form
      noValidate
      aria-label="Contact"
      className={styles.form}
      onSubmit={(event) => void handleSubmit(event)}
    >
      {FIELDS.map((field) => {
        const error = fieldErrors[field.name]
        const inputId = `contact-${field.name}`
        const errorId = `${inputId}-error`
        const shared = {
          id: inputId,
          name: field.name,
          'aria-invalid': error !== undefined,
          'aria-describedby': error === undefined ? undefined : errorId,
          disabled: isSubmitting,
        }
        return (
          <div key={field.name} className={styles.field}>
            <label htmlFor={inputId} className={styles.label}>
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                {...shared}
                className={`${styles.input} ${styles.textarea}`}
              />
            ) : (
              <input
                {...shared}
                type={field.type}
                autoComplete={field.autoComplete}
                className={styles.input}
              />
            )}
            {error !== undefined && (
              <p id={errorId} className={styles.error}>
                {error}
              </p>
            )}
          </div>
        )
      })}
      {state.status === 'error' && (
        <p role="alert" className={styles.error}>
          {state.message}
        </p>
      )}
      <button type="submit" disabled={isSubmitting} className={styles.button}>
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
