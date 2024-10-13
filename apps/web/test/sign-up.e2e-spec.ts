import { expect, test } from '@playwright/test'

test('sign-up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome').fill('John Doe')
  await page.getByLabel('E-mail').fill('johndoe2@example.com')
  await page.getByLabel('Password').fill('123456')
  await page.getByText('Cadastrar conta').click()

  const toast = await page.getByText('Usuário criado com sucesso!')

  expect(toast).toBeVisible()
})
