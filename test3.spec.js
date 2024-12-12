const { test, expect } = require('@playwright/test');

test('test3', async ({ page }) => {  test.setTimeout(15_000)
  await page.goto('https://enotes.pointschool.ru/');
  
  // проверки что мы на стартовой странице
  await expect(page).toHaveTitle('OK-Notes - Магазин блокнотов');
  await expect(page).toHaveURL('https://enotes.pointschool.ru/');
  //await page.getByRole('link', { name: 'Главная' }).click();
  await page.locator ('//*[@id="navbarNav"]/ul/li[3]/a').click();
  //await page.getByRole('link', { name: 'Регистрация' }).click();
  //await page.getByRole('link', { name: 'Вход' }).click();

  //Форма авторизации и ее проверки
 // await expect(page.getByPlaceholder('Логин клиента')).toBeVisible();
  //await expect.locator('LoginForm[username]').toBeVisible();
  await expect(page.locator('//*[@id="loginform-username"]')).toBeVisible();
  //await expect(page.getByPlaceholder('Пароль клиента')).toBeVisible();  
  await expect(page.locator('//*[@name="LoginForm[password]"]')).toBeVisible();


  // Указываем логин пароль + вход
 // await page.getByPlaceholder('Логин клиента').click();
  await page.locator('//*[@id="loginform-username"]').click();
  await page.keyboard.type('test'); 
 // await page.getByPlaceholder('Пароль клиента').click();
  await page.locator('//*[@name="LoginForm[password]"]').click();
  await page.keyboard.press('t');
  await page.keyboard.press('e');
  await page.keyboard.press('s');
  await page.keyboard.press('t'); 

  await expect(page.getByPlaceholder('Логин клиента')).toHaveValue('test')
  await expect(page.getByPlaceholder('Пароль клиента')).toHaveValue('test')  
  await expect (page.getByRole('button', { name: 'Вход' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Вход' })).toBeEnabled();
  await page.locator('//*[@name="login-button"]').click
 // await page.getByRole('button', { name: 'Вход' }).click({ timeout: 2_000 });

 // Зашли в ЛК 
 await expect(page).toHaveURL('https://enotes.pointschool.ru/');
 await expect(page.getByText('Корзина', { exact: true })).toBeVisible();

});