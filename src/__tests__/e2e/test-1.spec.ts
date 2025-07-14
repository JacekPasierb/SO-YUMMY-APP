import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
await page.goto('https://so-yummy-jack.netlify.app/welcome');
await page.getByRole('link', { name: 'Zaloguj się' }).click();
await page.getByTestId('email-input').click();
await page.getByTestId('email-input').fill('user@test.pl');
await page.getByTestId('password-input').click();
await page.getByTestId('password-input').fill('user1234');
await page.getByRole('button', { name: 'Zaloguj się' }).click();
await page.getByLabel('Main navigation').getByRole('link', { name: 'Dodaj Przepis' }).click();
await page.locator('._uploadPlaceholder_voe60_1').click();
await page.locator('body').setInputFiles('pobrane.png');
await page.getByRole('textbox', { name: 'Wprowadź tytuł przepisu' }).click();
await page.getByRole('textbox', { name: 'Wprowadź tytuł przepisu' }).fill('ser');
await page.getByRole('textbox', { name: 'Wprowadź opis przepisu' }).click();
await page.getByRole('textbox', { name: 'Wprowadź opis przepisu' }).fill('serrr');
await page.getByLabel('KategoriaWybierzDeseryDodatkiJagnięcinaKoźlinaKurczakMakaronyOwoce').selectOption('Jagnięcina');
await page.getByLabel('KategoriaWybierzDeseryDodatkiJagnięcinaKoźlinaKurczakMakaronyOwoce').selectOption('Jagnięcina');
await page.locator('body').selectOption('Jagnięcina');
await page.getByLabel('CzasWybierz5 min10 min15').selectOption('15');
await page.getByLabel('CzasWybierz5 min10 min15').selectOption('15');
await page.locator('body').selectOption('15');
await page.getByRole('button', { name: 'Add ingredient' }).click();
await page.getByRole('list', { name: 'Ingredients list' }).locator('svg').first().click();
await page.getByLabel('Ingredients list').getByRole('option', { name: 'Wołowina', exact: true }).click();
await page.getByRole('spinbutton').dblclick();
await page.getByRole('spinbutton').fill('4');
await page.getByText('łyżka').click();
await page.getByRole('option', { name: 'kg' }).click();
await page.locator('#react-select-3-input').fill('f');
await page.getByRole('textbox', { name: 'Recipe preparation' }).click();
await page.getByRole('textbox', { name: 'Recipe preparation' }).fill('sdfsdfsdfsdf ');
await page.getByRole('textbox', { name: 'Recipe preparation' }).press('ControlOrMeta+a');
await page.getByRole('textbox', { name: 'Recipe preparation' }).press('ControlOrMeta+c');
await page.getByRole('textbox', { name: 'Recipe preparation' }).click();
await page.getByRole('textbox', { name: 'Recipe preparation' }).fill(' sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf ');
await page.getByRole('button', { name: 'Add recipe instructions' }).click();
await page.getByText('Przepis został pomyślnie').click();


});