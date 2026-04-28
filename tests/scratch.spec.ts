import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { ProfilePage } from "../pages/ProfilePage"

test("scratch test", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login("testuser123@gmail.com", "cang@1012")

    const profilePage = new ProfilePage(page)
    await profilePage.clickEditButton()

    console.log("Chips before clear:", await profilePage.certificationChips.count())
    
    // Method 1: Delete icons
    const count = await profilePage.certificationChips.count()
    for (let i = count - 1; i >= 0; i--) {
        const deleteIcon = profilePage.certificationChips.nth(i).locator('[data-testid="CancelIcon"]')
        if (await deleteIcon.isVisible()) {
            await deleteIcon.click()
        }
    }
    
    console.log("Chips after individual delete:", await profilePage.certificationChips.count())
})
