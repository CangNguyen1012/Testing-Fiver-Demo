import { Locator, Page } from "@playwright/test";

export class Header {
    readonly page: Page
    readonly logo: Locator
    readonly searchHeaderInput: Locator
    readonly searchHeaderButton: Locator
    readonly businessLink: Locator
    readonly exploreLink: Locator
    readonly languageButton: Locator
    readonly currencyButton: Locator
    readonly becomeASellerButton: Locator
    readonly signInButton: Locator
    readonly joinButton: Locator
    readonly avatarLink: Locator

    readonly url = "/"

    constructor(page: Page) {
        this.page = page
        this.logo = page.locator("a.logo.active img")
        this.searchHeaderInput = page.getByPlaceholder("Find Services")
        this.searchHeaderButton = page.locator('header').getByRole("button", { name: /Search/i })
        this.businessLink = page.locator('nav.header_navbar').getByText("Business")
        this.exploreLink = page.locator('nav.header_navbar').getByText("Explore")
        this.languageButton = page.locator('nav.header_navbar').getByText("English")
        this.currencyButton = page.locator('nav.header_navbar').getByText("US$ USD")
        this.becomeASellerButton = page.locator('nav.header_navbar').getByText("Become a Seller")
        this.signInButton = page.locator('nav.header_navbar').getByText("Sign In")
        this.joinButton = page.locator('nav.header_navbar').getByText("Join")
        this.avatarLink = page.locator('img.avatar')
    }

    async goto(){
        await this.page.goto(this.url)
    }

    async clickLogo() {
        await this.logo.click()
    }

    async clickBusinessLink() {
        await this.businessLink.click()
    }

    async clickExploreLink() {
        await this.exploreLink.click()
    }

    async clickLanguageButton() {
        await this.languageButton.click()
    }

    async clickCurrencyButton() {
        await this.currencyButton.click()
    }

    async clickBecomeASellerButton() {
        await this.becomeASellerButton.click()
    }

    async clickSignInButton() {
        await this.signInButton.click()
    }

    async clickJoinButton() {
        await this.joinButton.click()
    }

    async clickAvatarLink() {
        await this.avatarLink.click()
    }

    async searchInHeader(keyword: string) {
        await this.searchHeaderInput.pressSequentially(keyword, {delay: 50})
        await this.searchHeaderButton.click()
    }
}
