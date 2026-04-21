import test, { expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"

test.describe("Login Page Tests", () => {
    test("Login Successfully", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login("testuser123@gmail.com", "cang@1012")
        await page.waitForTimeout(1000)
        const isSuccess = await loginPage.isLoginSuccessful()
        expect(isSuccess).toBeTruthy()
    })

    test("Login Failed with Incorrect Password", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login("testuser123@gmail.com", "wrongpassword")

        // ✅ Wait for error message (auto-wait, no timeout needed)
        expect(loginPage.isLoginFailed())
    })

    test("Password toggle button should work correctly", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.passwordInput.fill("123456")
        await loginPage.clickTogglePassword()

        // ✅ Verify that the password input type has changed to "text"
        await loginPage.passwordInput
            .evaluate((input) => {
                return input.getAttribute("type")
            })
            .then((type) => {
                expect(type).toBe("text")
            })
        await loginPage.clickTogglePassword()

        // ✅ Verify that the password input type has changed back to "password"
        await loginPage.passwordInput
            .evaluate((input) => {
                return input.getAttribute("type")
            })
            .then((type) => {
                expect(type).toBe("password")
            })
    })

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(2000)
    })
})
