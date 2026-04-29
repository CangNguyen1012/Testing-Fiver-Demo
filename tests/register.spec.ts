import test, { expect } from "@playwright/test"
import { RegisterPage } from "../pages/RegisterPage"

test.describe("Register Page Tests", () => {
    test("Register Successfully", async ({ page }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()

        await registerPage.register({
            name: "testing",
            email: `testing${Date.now()}@gmail.com`,
            password: "123456",
            confirmPassword: "123456",
            phone: "0323456789",
            birthday: "2000-01-01",
            gender: "male",
        })

        await page.waitForTimeout(3000)
        const isSuccess = await registerPage.isSuccessRegister()
        expect(isSuccess).toBeTruthy()
    })

    test("Register Failed with Email Already Exists", async ({ page }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()

        await registerPage.register({
            name: "testing",
            email: "testuser123@gmail.com",
            password: "123456",
            confirmPassword: "123456",
            phone: "0323456789",
            birthday: "2000-01-01",
            gender: "male",
        })

        // ✅ Wait for error message instead of timeout
        await expect(registerPage.errorMessage).toBeVisible()
    })

    test("Verify warning message displayed when user doesn't fill the name field", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.nameInput.click()
        await registerPage.emailInput.click()
        await expect(registerPage.nameErrorMessage).toBeVisible()
    })

    test("Verify warning message displayed when user doesn't fill the email field", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.emailInput.click()
        await registerPage.nameInput.click()
        await expect(registerPage.emailErrorMessage1).toBeVisible()
    })

    test("Verify warning message displayed when user fills invalid email", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.emailInput.fill("invalid-email")
        await registerPage.nameInput.click()
        await expect(registerPage.emailErrorMessage2).toBeVisible()
    })

    test("Verify warning message displayed when user doesn't fill the password field", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.passwordInput.click()
        await registerPage.nameInput.click()
        await expect(registerPage.passwordErrorMessage1).toBeVisible()
    })

    test("Verify warning message displayed when user fills password less than 6 characters", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.passwordInput.fill("12345")
        await registerPage.nameInput.click()
        await expect(registerPage.passwordErrorMessage2).toBeVisible()
    })

    test("Verify warning message displayed when user fills password with 6 characters", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.passwordInput.fill("123456")
        await registerPage.nameInput.click()
        await expect(registerPage.passwordErrorMessage2).not.toBeVisible()
    })

    test("Verify warning message displayed when user fills password with 32 characters", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.passwordInput.fill(
            "1234567890123456789012345678901234",
        )
        await registerPage.nameInput.click()
        await expect(registerPage.passwordErrorMessage2).not.toBeVisible()
    })

    test("Verify warning message displayed when user fills password more than 32 characters", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.passwordInput.fill(
            "123456789012345678901234567890123",
        )
        await registerPage.nameInput.click()
        await expect(registerPage.passwordErrorMessage3).toBeVisible()
    })

    test("Verify warning message displayed when user doesn't fill the confirm password field", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.confirmPasswordInput.click()
        await registerPage.nameInput.click()
        await expect(registerPage.confirmPasswordErrorMessage1).toBeVisible()
    })

    test("Verify warning message displayed when user fills confirm password that doesn't match with password", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.passwordInput.fill("123456")
        await registerPage.confirmPasswordInput.fill("654321")
        await registerPage.nameInput.click()
        await expect(registerPage.confirmPasswordErrorMessage2).toBeVisible()
    })

    test("Verify warning message displayed when user doesn't fill the phone field", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.phoneInput.click()
        await registerPage.nameInput.click()
        await expect(registerPage.phoneErrorMessage1).toBeVisible()
    })

    test("Verify warning message displayed when user fills invalid phone number", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.phoneInput.fill("1234567890")
        await registerPage.nameInput.click()
        await expect(registerPage.phoneErrorMessage2).toBeVisible()
    })

    test("Verify warning message displayed when user doesn't fill the birthday field", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.birthdayInput.click()
        await registerPage.nameInput.click()
        await expect(registerPage.birthdayErrorMessage).toBeVisible()
    })

    test("Verify user can navigate to Term of Service page by clicking on Term of Service link", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.termsOfServiceLink.click()
        await expect(page).toHaveURL("/terms")
    })

    test("Verify user can navigate to Login page by clicking on I am already member link", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page)

        await registerPage.goto()
        await registerPage.loginLink.click()
        await expect(page).toHaveURL("/login")
    })

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(2000)
    })
})
