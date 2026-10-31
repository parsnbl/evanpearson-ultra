import { expect, test } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Evan Pearson/)
  await expect(
    page.getByRole('heading', { level: 1, name: 'Evan Pearson' }),
  ).toBeVisible()
})

test('blog post renders', async ({ page }) => {
  await page.goto('/blog')
  await page.getByRole('link', { name: 'Hello, world' }).click()
  await expect(page).toHaveURL(/\/blog\/hello-world$/)
  await expect(
    page.getByRole('heading', { level: 1, name: 'Hello, world' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'The stack' })).toBeVisible()
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    1,
  )
})

test('contact form shows validation errors', async ({ page }) => {
  await page.goto('/contact')
  const nameError = page.getByText('Please enter your name.')
  await expect(async () => {
    await page.getByRole('button', { name: 'Send' }).click()
    await expect(nameError).toBeVisible({ timeout: 1_000 })
  }).toPass()
  await expect(
    page.getByText('Please enter a valid email address.'),
  ).toBeVisible()
  await expect(
    page.getByText('Please write at least 10 characters.'),
  ).toBeVisible()
})
