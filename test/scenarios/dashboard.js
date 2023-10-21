//skenario dashboard

import LoginPage from "../pageobject/LoginPage";
import DashboardPage from "../pageobject/DashboardPage";

describe('Login - Positive Case', () => {
   it ('as an Admin, I can see Dashboard Page successfully', async () => {
    await LoginPage.open();
    await LoginPage.verifyPage();
    await LoginPage.setUsername('Admin');
    await LoginPage.setPassword('admin123');
    await LoginPage.verifybtnLogin();
    await DashboardPage.verifyPage
    });
});