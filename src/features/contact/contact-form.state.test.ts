import { describe, expect, it } from 'vitest'
import {
  contactFormReducer,
  initialContactFormState,
} from './contact-form.state'

describe('contactFormReducer', () => {
  it('records field errors while staying idle', () => {
    expect(
      contactFormReducer(initialContactFormState, {
        type: 'invalid',
        fieldErrors: { email: 'Bad email' },
      }),
    ).toEqual({ status: 'idle', fieldErrors: { email: 'Bad email' } })
  })

  it('moves to submitting and clears field errors', () => {
    expect(
      contactFormReducer(
        { status: 'idle', fieldErrors: { name: 'x' } },
        { type: 'submit' },
      ),
    ).toEqual({ status: 'submitting' })
  })

  it('ignores a second submit while submitting', () => {
    const submitting = { status: 'submitting' } as const
    expect(contactFormReducer(submitting, { type: 'submit' })).toBe(submitting)
  })

  it('moves to success or error after submitting', () => {
    const submitting = { status: 'submitting' } as const
    expect(contactFormReducer(submitting, { type: 'succeeded' })).toEqual({
      status: 'success',
    })
    expect(
      contactFormReducer(submitting, { type: 'failed', message: 'Nope' }),
    ).toEqual({ status: 'error', message: 'Nope' })
  })

  it('allows retrying after an error', () => {
    expect(
      contactFormReducer(
        { status: 'error', message: 'Nope' },
        { type: 'submit' },
      ),
    ).toEqual({ status: 'submitting' })
  })
})
