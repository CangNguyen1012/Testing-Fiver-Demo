import { Page, Locator, expect } from "@playwright/test"

export class LoginPage {
    readonly page: Page

    // Locators
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly togglePasswordButton: Locator
    readonly loginButton: Locator
    readonly registerLink: Locator
    readonly emailErrorMessage: Locator
    readonly passwordErrorMessage: Locator
    readonly loginFailedMessage: Locator

    readonly url = "https://demo4.cybersoft.edu.vn/login"

    constructor(page: Page) {
        this.page = page

        // Initialize locators
        this.emailInput = page.locator("#email")
        this.passwordInput = page.locator("#password")
        this.togglePasswordButton = page.locator("button.show")
        this.loginButton = page.getByRole("button", { name: "Login" })
        this.registerLink = page.getByRole("link", {
            name: "Register now ?",
        })
        this.emailErrorMessage = page.getByText("Email không được bỏ trống !")
        this.passwordErrorMessage = page.getByText(
            "Password không được bỏ trống !",
        )
        this.loginFailedMessage = page.getByText(
            "Email hoặc mật khẩu không đúng !",
        )
    }

    async goto() {
        await this.page.goto(this.url)
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email)
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password)
    }

    async clickLogin() {
        await this.loginButton.click()
    }

    async clickTogglePassword() {
        await this.togglePasswordButton.click()
    }

    async clickRegisterLink() {
        await this.registerLink.click()
    }

    async login(email: string, password: string) {
        await this.fillEmail(email)
        await this.fillPassword(password)
        await this.clickLogin()
    }

    async isLoginSuccessful(): Promise<boolean> {
        await this.page.waitForURL(/profile/)
        return this.page.url() !== this.url
    }

    async isLoginFailed(): Promise<boolean> {
        return await this.loginFailedMessage.isVisible()
    }

    async getEmailErrorMessage() {
        await this.emailErrorMessage.waitFor({ state: "visible" })
        expect(this.emailErrorMessage).toBeVisible()
    }

    async getPasswordErrorMessage() {
        await this.passwordErrorMessage.waitFor({ state: "visible" })
        expect(this.passwordErrorMessage).toBeVisible()
    }
}
