//Login Page

class LoginPage{

    get txtUsername () {
        return $('[placeholder="Username"]');
    }
    get txtPassword () {
        return $('[placeholder="Password"]');
    }
    get btnLogin (){
        return $('//button[text()=" Login "]');
    }
    get forgotPassword (){
        return $('//p[text()="Forgot your password? "]');
    }
    open (){
        return browser.url(`${browser.options.baseUrl}`);
    }

    async verifyPage(){
        await this.txtUsername.waitForDisplayed();
        await expect (this.txtUsername).toBeDisplayed();
        await this.txtPassword.waitForDisplayed();
        await expect (this.txtPassword).toBeDisplayed();
        await this.btnLogin.waitForDisplayed();
        await expect (this.btnLogin).toBeDisplayed();
        await this.forgotPassword.waitForDisplayed();
        await expect (this.forgotPassword).toBeDisplayed();
    }

    async setUsername(username){
        await this.txtUsername.setValue(username);
    }

    async setPassword(password){
        await this.txtPassword.setValue(password);
    }

    async verifybtnLogin(){
        await this.btnLogin.click();
    }

    async setForgotPassword (){
        await this.forgotPassword.waitForDisplayed();
        await this.forgotPassword.click();
    }
}

export default new LoginPage();