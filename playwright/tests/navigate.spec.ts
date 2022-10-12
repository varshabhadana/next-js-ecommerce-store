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
  await expect(page).toHaveURL('http://localhost:3000/planters/3');
  await expect(page.locator('h1')).toHaveText('Amber Planter');
  await expect(
    page.locator(`img[alt="img-3-Amber Planter"] >> nth=0`),
  ).toBeVisible();

  await page.locator('button', { hasText: '+' }).click({ clickCount: 3 });
  await page.locator('button', { hasText: 'Add to cart' }).click();
  await expect(page.locator('[data-test-id^="cart-count"]')).toHaveText('4');

  await page.locator('a:has-text("Cart")').click();
  await expect(page).toHaveURL('http://localhost:3000/cartpage');
  await expect(page.locator('[data-test-id^="cart-total"]')).toHaveText('800');
  await expect(page.locator(`img[alt="img-3-Amber Planter"] `)).toBeVisible();
  await page.locator('button', { hasText: '+' }).click({ clickCount: 2 });
  await expect(
    page.locator('[data-test-id^="cart-product-quantity-"]'),
  ).toHaveText('6');
  await page.locator('button', { hasText: '-' }).click({ clickCount: 3 });
  await expect(
    page.locator('[data-test-id^="cart-product-quantity-"]'),
  ).toHaveText('3');
  await page.locator('button', { hasText: 'REMOVE' }).click();
  await expect(
    page.locator(`img[alt="img-3-Amber Planter"] `),
  ).not.toBeVisible();
  await expect(page.locator('[data-test-id^="cart-total"]')).toHaveText('0');
  await expect(page.locator('[data-test-id^="cart-count"]')).toHaveText('0');
});
