import { expect, test } from '@playwright/test';

test('navigation and layouts work at mobile, tablet and desktop widths', async ({ page }) => {
  for (const viewport of [
    { width: 320, height: 640 },
    { width: 375, height: 812 },
    { width: 768, height: 1024 },
    { width: 1280, height: 800 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Learn design by fixing real problems.' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: 'Explore Scenarios' })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow, 'No horizontal document overflow at width ' + viewport.width).toBe(false);
  }
});

test('scenario filters, decisions, retry, saved history and navigation work', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Explore all scenarios' }).click();
  await expect(page.getByRole('heading', { name: 'Explore Design Scenarios' })).toBeVisible();

  const categories = page.getByRole('group', { name: 'Filter by category' });
  await categories.getByRole('button', { name: 'Colour Theory' }).click();
  await expect(page.getByRole('button', { name: 'Start The Unreadable Poster' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start The Colourless Brand' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start The Typography Disaster' })).toHaveCount(0);

  await page.getByRole('button', { name: 'Start The Unreadable Poster' }).click();
  await expect(page.getByRole('heading', { name: 'The Unreadable Poster' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit Decision' })).toBeDisabled();
  await page.getByRole('button', { name: 'Improve text-background contrast' }).click();
  await expect(page.getByRole('button', { name: 'Submit Decision' })).toBeEnabled();
  await page.getByRole('button', { name: 'Submit Decision' }).click();
  await expect(page.getByRole('heading', { name: 'Correct Decision!' })).toBeVisible();
  await page.getByRole('button', { name: 'Save Result' }).click();

  await expect(page.getByRole('heading', { name: 'My Cases' })).toBeVisible();
  await expect(page.getByText('1 of 8 completed · 1 correct')).toBeVisible();
  await page.reload();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: 'My Cases' }).click();
  await expect(page.getByText('1 of 8 completed · 1 correct')).toBeVisible();

  await page.getByRole('button', { name: 'Start The Unreadable Poster' }).click();
  await page.getByRole('button', { name: 'Increase the font size' }).click();
  await page.getByRole('button', { name: 'Submit Decision' }).click();
  await expect(page.getByRole('heading', { name: "Let's Review." })).toBeVisible();
  await page.getByRole('button', { name: 'Try Again' }).click();
  await expect(page.getByRole('button', { name: 'Submit Decision' })).toBeDisabled();
  await page.getByRole('button', { name: 'Back to Scenarios' }).click();
  await expect(page.getByRole('heading', { name: 'Explore Design Scenarios' })).toBeVisible();
});

test('case shortcut opens empty history and provides a working explore action', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open My Cases' }).first().click();
  await expect(page.getByText('No completed cases yet')).toBeVisible();
  await page.getByRole('button', { name: 'Explore Scenarios' }).last().click();
  await expect(page.getByRole('heading', { name: 'Explore Design Scenarios' })).toBeVisible();
});
