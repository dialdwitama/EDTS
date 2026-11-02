import { test, expect } from '@playwright/test';

test('User can add honey product to cart without login', async ({ page }) => {

  // 1. Open Klik Indomaret
  await page.goto('https://www.klikindomaret.com/');

  // 2. Click category menu
  await page.locator('[class="flex items-center gap-2 pb-[6px]"]').first().click();

  // 3. Select Makanan category
  await page.locator(
    '#kategori > div:nth-child(2) > div > div.w-\\[286px\\].border-r.py-6.pl-3.pr-2 > div > button:nth-child(3)'
  ).click();

  // 4. Select Madu category
  await page.locator('.menu-list')
    .filter({ hasText: 'Madu' })
    .first()
    .click();

  // 5. Wait for honey products to appear
  const products = page.locator('.flex.flex-col.px-3.pb-2');

  await expect(products.first()).toBeVisible({ timeout: 15000 });

  // 6. Select the first honey product
  await products.first().click();

  // 7. Verify product detail page is opened
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/produk|product|detail/i);

  // 8. Click + Keranjang
  const addToCartButton = page.locator('button.flex.items-center.gap-4')
    .filter({ hasText: 'Keranjang' })
    .first();

  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

});