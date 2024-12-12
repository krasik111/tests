
const { test, expect } = require('@playwright/test');

test('test2', async ({ page }) => {  test.setTimeout(15_000)
  await page.goto('https://enotes.pointschool.ru/');
  
  // проверки что мы на стартовой странице
  await expect(page).toHaveTitle('OK-Notes - Магазин блокнотов');
  await expect(page).toHaveURL('https://enotes.pointschool.ru/');
  await page.getByRole('link', { name: 'Главная' }).click();
  await page.getByRole('link', { name: 'Регистрация' }).click();
  await page.getByRole('link', { name: 'Вход' }).click();

  //Форма авторизации и ее проверки
  await expect(page.getByPlaceholder('Логин клиента')).toBeVisible();
  await expect(page.getByPlaceholder('Пароль клиента')).toBeVisible();  

  // Указываем логин пароль + вход
  await page.getByPlaceholder('Логин клиента').click();
  await page.keyboard.type('test'); 
  await page.getByPlaceholder('Пароль клиента').click();
  await page.keyboard.press('t');
  await page.keyboard.press('e');
  await page.keyboard.press('s');
  await page.keyboard.press('t'); 

  // Проверки что все заполнено + авторизация
  await expect(page.getByPlaceholder('Логин клиента')).toHaveValue('test')
  await expect(page.getByPlaceholder('Пароль клиента')).toHaveValue('test')  
  await expect (page.getByRole('button', { name: 'Вход' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Вход' })).toBeEnabled();
  await page.getByRole('button', { name: 'Вход' }).click({ timeout: 2_000 });


  // Зашли в ЛК 
  await expect(page).toHaveURL('https://enotes.pointschool.ru/');
  await expect(page.getByText('Корзина', { exact: true })).toBeVisible();

  //Добавление товара
  await expect(page.locator('body')).toMatchAriaSnapshot(`- text: /Цена:\\d+ р\\. \\d+ р\\./`);
  await page.locator('div:nth-child(2) > .note-item > .card-body > .actionBuyProduct').click();

  //Переход в корзину
  await page.getByText('Корзина', { exact: true }).click();
  await expect(page.getByLabel('Корзина')).toContainText('Очистить корзину');
  await expect(page.getByLabel('Корзина')).toContainText('Перейти в корзину');
  await page.getByRole('button', { name: 'Перейти в корзину' }).click();

});