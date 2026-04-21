import { Page, Locator, expect } from "@playwright/test"

export class RegisterPage {
    readonly page: Page

    // Locators
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly confirmPasswordInput: Locator
    readonly phoneInput: Locator
    readonly birthdayInput: Locator
    readonly maleRadio: Locator
    readonly femaleRadio: Locator
    readonly agreeTermCheckbox: Locator
    readonly submitButton: Locator
    readonly loginLink: Locator
    readonly errorMessage: Locator
    readonly nameErrorMessage: Locator
    readonly emailErrorMessage1: Locator
    readonly emailErrorMessage2: Locator
    readonly passwordErrorMessage1: Locator
    readonly passwordErrorMessage2: Locator
    readonly passwordErrorMessage3: Locator
    readonly confirmPasswordErrorMessage1: Locator
    readonly confirmPasswordErrorMessage2: Locator
    readonly phoneErrorMessage1: Locator
    readonly phoneErrorMessage2: Locator
    readonly birthdayErrorMessage: Locator
    readonly termsOfServiceLink: Locator

    readonly url = "https://demo4.cybersoft.edu.vn/register"

    constructor(page: Page) {
        this.page = page

        // Initialize locators
        this.nameInput = page.locator("#name")
        this.emailInput = page.locator("#email")
        this.passwordInput = page.locator("#password")
        this.confirmPasswordInput = page.locator("#passwordConfirm")
        this.phoneInput = page.locator("#phone")
        this.birthdayInput = page.locator("#birthday")
        this.maleRadio = page.locator("#male")
        this.femaleRadio = page.locator("#female")
        this.agreeTermCheckbox = page.locator("#agree-term")
        this.submitButton = page.locator("button[type='submit']")
        this.loginLink = page.getByRole("link", { name: "I am already member" })
        this.errorMessage = page.getByText(/Email.*tồn tại/i)
        this.nameErrorMessage = page.getByText("Name không được bỏ trống")
        this.emailErrorMessage1 = page.getByText("Email không được bỏ trống")
        this.emailErrorMessage2 = page.getByText("Email không đúng định dạng")
        this.passwordErrorMessage1 = page.getByText(
            "Password không được bỏ trống",
        )
        this.passwordErrorMessage2 = page.getByText("Password từ 6 - 32 ký tự")
        this.passwordErrorMessage3 = page.getByText("pass từ 6 - 32 ký tự !")

        this.confirmPasswordErrorMessage1 = page.getByText(
            "PasswordConfirm không được bỏ trống",
        )
        this.confirmPasswordErrorMessage2 = page.getByText(
            "Password phải trùng nhau",
        )
        this.phoneErrorMessage1 = page.getByText("Phone không được bỏ trống")
        this.phoneErrorMessage2 = page.getByText(
            "Phone phải từ 03 05 07 08 09 và có 10 số",
        )
        this.birthdayErrorMessage = page.getByText(
            "Birthday không được bỏ trống",
        )
        this.termsOfServiceLink = page.getByRole("link", {
            name: "Terms of service",
        })
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url, { timeout: 60000 })
    }

    async fillName(name: string): Promise<void> {
        await this.nameInput.fill(name, { timeout: 30000 })
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email, { timeout: 30000 })
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password, { timeout: 30000 })
    }

    async fillConfirmPassword(confirmPassword: string): Promise<void> {
        await this.confirmPasswordInput.fill(confirmPassword, {
            timeout: 30000,
        })
    }

    async fillPhone(phone: string): Promise<void> {
        await this.phoneInput.fill(phone, { timeout: 30000 })
    }

    async fillBirthday(birthday: string): Promise<void> {
        await this.birthdayInput.fill(birthday, { timeout: 30000 })
    }

    async selectMaleGender(): Promise<void> {
        await this.maleRadio.check({ timeout: 30000 })
    }

    async selectFemaleGender(): Promise<void> {
        await this.femaleRadio.check({ timeout: 30000 })
    }

    async agreeToTerms(): Promise<void> {
        await this.agreeTermCheckbox.check({ timeout: 30000 })
    }

    async submit(): Promise<void> {
        await this.submitButton.click({ timeout: 30000 })
    }

    async register(data: {
        name: string
        email: string
        password: string
        confirmPassword: string
        phone: string
        birthday: string
        gender: "male" | "female"
    }): Promise<void> {
        await this.fillName(data.name)
        await this.fillEmail(data.email)
        await this.fillPassword(data.password)
        await this.fillConfirmPassword(data.confirmPassword)
        await this.fillPhone(data.phone)
        await this.fillBirthday(data.birthday)
        if (data.gender === "male") {
            await this.selectMaleGender()
        } else {
            await this.selectFemaleGender()
        }
        await this.agreeToTerms()
        await this.submit()
    }

    async isSuccessRegister(): Promise<boolean> {
        console.log("isSuccess: ", this.page.url())
        return this.page.url() !== this.url
    }

    async isFailedRegister() {
        await expect(this.page).toHaveURL(this.url)
        await expect(this.errorMessage).toBeVisible()
    }
}
