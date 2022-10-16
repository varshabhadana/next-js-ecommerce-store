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

// testing checkout flow ,payment page, thank you page
test('checkout test', async ({ page }) => {
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

  // cart page flow

  await expect(page).toHaveURL('http://localhost:3000/cartpage');
  await expect(page.locator('[data-test-id^="cart-total"]')).toHaveText('800');
  await expect(page.locator(`img[alt="img-3-Amber Planter"] `)).toBeVisible();
  await page.locator('button', { hasText: '+' }).click({ clickCount: 2 });
  await expect(
    page.locator('[data-test-id^="cart-product-quantity-"]'),
  ).toHaveText('6');
  await page.locator('button', { hasText: '-' }).click({ clickCount: 1 });
  await expect(
    page.locator('[data-test-id^="cart-product-quantity-"]'),
  ).toHaveText('5');
  await page.locator('button', { hasText: 'Proceed to checkout' }).click();

  // checkout page flow
  await expect(page).toHaveURL('http://localhost:3000/checkoutpage');
  await expect(page.locator('[data-test-id="amount-payable"]')).toHaveText(
    '1000',
  );

  await page.locator('#firstName').type('hello');

  await page.locator('[data-test-id="checkout-last-name"]').fill('smith');
  await page.locator('[data-test-id="checkout-email"]').fill('test@test.com');
  await page
    .locator('[data-test-id="checkout-address"]')
    .fill('54/7 six street');
  await page.locator('[data-test-id="checkout-city"]').fill('wien');
  await page.locator('[data-test-id="checkout-postal-code"]').fill('1010');
  await page.locator('[data-test-id="checkout-country"]').fill('austria');
  await page.locator('[data-test-id="checkout-credit-card"]').fill('12345678');
  await page.locator('[data-test-id="checkout-expiration-date"]').press('Tab');
  await page
    .locator('[data-test-id="checkout-expiration-date"]')
    .fill('2023-04');
  await page.locator('[data-test-id="checkout-security-code"]').fill('123');

  await page.locator('button', { hasText: ' Confirm Order' }).click();

  // thank you page flow
  await expect(page).toHaveURL('http://localhost:3000/thankyou');
  await expect(page.locator('h1')).toHaveText(
    ' Your order is confirmed Thank you for your order!',
  );
});
