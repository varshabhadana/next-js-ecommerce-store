import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a h1.
  await expect(page.locator('h1')).toHaveText('Home Page');

  await page.locator('a:has-text("Products")').click();
  await expect(page).toHaveURL('http://localhost:3000/planters');
  await expect(page.locator('h1')).toHaveText('Plant Pots');

  const plantersName = [
    'Purrfect Planter',
    'Praha Planter',
    'Amber Planter',
    'Emerald Planter',
    'Kavya Planter',
    'Tezzo Planter',
    'Kiki Planter',
    'Saavi Planter',
  ];

  await expect(page.locator('[data-test-id^="planter-id-"]')).toHaveCount(8);
  await expect(page.locator('[data-test-id^="planter-id-"]>> h2')).toHaveText(
    plantersName,
  );
  await page.locator('a:has-text("Amber Planter")').click();
  await expect(page.locator('h1')).toHaveText('Amber Planter');
});
