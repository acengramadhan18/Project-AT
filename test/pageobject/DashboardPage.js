//Dashboard Page

class DashboardPage{

    get search () {
        return $('[placeholder="Search"]');
    }
    get openclosesidebar () {
        return $('//nav/div[2]/div/div/button');
    }
    get sidebarAdmin () {
        return $('//span[text()="Admin"]');
    }
    get sidebarPIM () {
        return $('//span[text()="PIM"]');
    }
    get sidebarLeave () {
        return $('//span[text()="Leave"]');
    }
    get sidebarTime () {
        return $('//span[text()="Time"]');
    }
    get sidebarRecruitment () {
        return $('//span[text()="Recruitment"]');
    }
    get sidebarMyInfo () {
        return $('//span[text()="My Info"]');
    }
    get sidebarPerformance () {
        return $('//span[text()="Performance"]');
    }
    get sidebarDashboard () {
        return $('//span[text()="Dashboard"]');
    }
    get sidebarDirectory () {
        return $('//span[text()="Directory"]');
    }
    get sidebarMaintenance () {
        return $('//span[text()="Maintenance"]');
    }
    get sidebarClaim () {
        return $('//span[text()="Claim"]');
    }
    get sidebarBuzz () {
        return $('//span[text()="Buzz"]');
    }
    open (){
        return browser.url(`${browser.options.baseUrl}`);
    }

    async verifyPage(){
        await this.search.waitForDisplayed();
        await expect (this.search).toBeDisplayed();
        await this.openclosesidebar.waitForDisplayed();
        await expect (this.openclosesidebar).toBeDisplayed();
        await this.sidebarAdmin.waitForDisplayed();
        await expect (this.sidebarAdmin).toBeDisplayed();
        await this.sidebarPIM.waitForDisplayed();
        await expect (this.sidebarPIM).toBeDisplayed();
        await this.sidebarPIM.waitForDisplayed();
        await expect (this.sidebarLeave).toBeDisplayed();
        await this.sidebarLeave.waitForDisplayed();
        await expect (this.sidebarPIM).toBeDisplayed();
        await this.sidebarTime.waitForDisplayed();
        await expect (this.sidebarTime).toBeDisplayed();
        await this.sidebarRecruitment.waitForDisplayed();
        await expect (this.sidebarRecruitment).toBeDisplayed();
        await this.sidebarMyInfo.waitForDisplayed();
        await expect (this.sidebarMyInfo).toBeDisplayed();
        await this.sidebarPerformance.waitForDisplayed();
        await expect (this.sidebarPerformance).toBeDisplayed();
        await this.sidebarDashboard.waitForDisplayed();
        await expect (this.sidebarDashboard).toBeDisplayed();
        await this.sidebarDirectory.waitForDisplayed();
        await expect (this.sidebarDirectory).toBeDisplayed();
        await this.sidebarMaintenance.waitForDisplayed();
        await expect (this.sidebarMaintenance).toBeDisplayed();
        await this.sidebarClaim.waitForDisplayed();
        await expect (this.sidebarClaim).toBeDisplayed();
        await this.sidebarBuzz.waitForDisplayed();
        await expect (this.sidebarBuzz).toBeDisplayed();
    }
}

export default new DashboardPage();