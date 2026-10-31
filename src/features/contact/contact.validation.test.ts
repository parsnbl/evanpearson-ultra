import { describe, expect, it } from 'vitest'
import { parseContactForm } from './contact.validation'

describe('parseContactForm', () => {
  it('returns the trimmed message when valid', () => {
    expect(
      parseContactForm({
        name: '  Evan ',
        email: 'evan@example.com',
        message: 'Hello there, nice site!',
      }),
    ).toEqual({
      ok: true,
      value: {
        name: 'Evan',
        email: 'evan@example.com',
        message: 'Hello there, nice site!',
      },
    })
  })

  it('returns one error per invalid field', () => {
    expect(
      parseContactForm({ name: '', email: 'nope', message: 'short' }),
    ).toEqual({
      ok: false,
      fieldErrors: {
        name: 'Please enter your name.',
        email: 'Please enter a valid email address.',
        message: 'Please write at least 10 characters.',
      },
    })
  })

  it('treats missing fields as invalid', () => {
    const result = parseContactForm({})
    expect(result.ok).toBe(false)
  })
})
