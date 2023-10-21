//skenario login

import LoginPage from "../pageobject/LoginPage";

describe('Login - Negative Case', () => {

    it ('as an Admin, I cannot login with empty email successfully', async () => {
        await LoginPage.open();
        await LoginPage.verifyPage();
        await LoginPage.verifybtnLogin();
    });
    
    it ('as an Admin, I cannot login with wrong email successfully', async () => {
        await LoginPage.open();
        await LoginPage.verifyPage();
        await LoginPage.setUsername('UsernameSalah');
    });

    it ('as an Admin, I cannot login with wrong password successfully', async () => {
        await LoginPage.open();
        await LoginPage.verifyPage();
        await LoginPage.setUsername('setUsername');
        await LoginPage.setPassword('PasswordSalah');
    });
});

describe('Login - Positive Case', () => {
   it ('as an Admin, I can login successfully', async () => {
    await LoginPage.open();
    await LoginPage.verifyPage();
    await LoginPage.setUsername('Admin');
    await LoginPage.setPassword('admin123');
    await LoginPage.verifybtnLogin();
    });
});