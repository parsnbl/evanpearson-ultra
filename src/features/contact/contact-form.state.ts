import type { ContactFieldErrors } from './contact.schema'

export type ContactFormState =
  | { status: 'idle'; fieldErrors: ContactFieldErrors }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error'; message: string }

export type ContactFormAction =
  | { type: 'invalid'; fieldErrors: ContactFieldErrors }
  | { type: 'submit' }
  | { type: 'succeeded' }
  | { type: 'failed'; message: string }

export const initialContactFormState: ContactFormState = {
  status: 'idle',
  fieldErrors: {},
}

/**
 * Transitions the contact form between idle, submitting, success and error.
 * @param state - Current form state
 * @param action - Event that occurred
 * @returns The next form state
 * @throws Never
 */
export function contactFormReducer(
  state: ContactFormState,
  action: ContactFormAction,
): ContactFormState {
  switch (action.type) {
    case 'invalid':
      return { status: 'idle', fieldErrors: action.fieldErrors }
    case 'submit':
      return state.status === 'submitting' ? state : { status: 'submitting' }
    case 'succeeded':
      return { status: 'success' }
    case 'failed':
      return { status: 'error', message: action.message }
  }
}
