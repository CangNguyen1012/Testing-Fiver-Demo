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

    test("Login Failed with Incorrect Email", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login("wrongemail@gmail.com", "cang@1012")

        // ✅ Wait for error message (auto-wait, no timeout needed)
        expect(loginPage.isLoginFailed())
    })

    test("Login Failed with Both Email and Password Incorrect", async ({
        page,
    }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login("wrongemail@gmail.com", "wrongpassword")

        // ✅ Wait for error message (auto-wait, no timeout needed)
        expect(loginPage.isLoginFailed())
    })

    test("Login Failed with Invalid Email Format", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login("invalidemailformat", "cang@1012")

        // ✅ Wait for error message (auto-wait, no timeout needed)
        expect(loginPage.isLoginFailed())
    })

    test("Login Failed with Short Password", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login("testuser123@gmail.com", "123")

        // ✅ Wait for error message (auto-wait, no timeout needed)
        expect(loginPage.isLoginFailed())
    })

    test("Login Failed with Long Password", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login(
            "testuser123@gmail.com",
            "thisIsAVeryLongPasswordThatExceedsTheMaximumAllowedLength"
        )

        // ✅ Wait for error message (auto-wait, no timeout needed)
        expect(loginPage.isLoginFailed())
    })

    test("Login Failed with Email Containing Spaces", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login("testuser123 @gmail.com", "cang@1012")

        // ✅ Wait for error message (auto-wait, no timeout needed)
        expect(loginPage.isLoginFailed())
    })

    test("Login failed with unregistered email", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login("unregistered@gmail.com", "cang@1012")

        // ✅ Wait for error message (auto-wait, no timeout needed)
        expect(loginPage.isLoginFailed())
    })

    test("Login Failed with Empty Fields", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.clickLogin()

        expect(loginPage.isLoginFailed())
    })

    test("Login Failed with Empty Email", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.fillPassword("cang@1012")
        await loginPage.clickLogin()

        expect(loginPage.isLoginFailed())
    })

    test("Login Failed with Empty Password", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.fillEmail("testuser123@gmail.com")
        await loginPage.clickLogin()

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
