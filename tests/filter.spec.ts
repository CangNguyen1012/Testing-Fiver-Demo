import test, { expect } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { SearchResultPage } from "../pages/SearchResultPage"

test.describe("Filter Functionality Test", () => {
    test("Verify filter function by category", async ({ page }) => {
        const homePage = new HomePage(page)
        const searchResultPage = new SearchResultPage(page)

        await homePage.goto()

        await homePage.search("design")

        const categoryName = "Graphics & Design"
        await searchResultPage.filterByCategory("graphics-design")

        await page.waitForLoadState("networkidle")

        await expect(page).toHaveURL(/graphics-design/)

        await expect(page.getByText("0 services available")).toBeVisible()
    })

    test("Verify filter function by price", async ({ page }) => {
        const homePage = new HomePage(page)
        const searchResultPage = new SearchResultPage(page)

        // 1. Vào trang
        await homePage.goto()

        // 2. Search
        await homePage.search("design")

        await page.waitForLoadState("networkidle")

        // 3. Filter giá từ 10 đến 100
        await searchResultPage.filterByPrice("10", "100")

        await page.waitForLoadState("networkidle")

        // 4. Verify URL có param giá (nếu có)
        await expect(page).toHaveURL(/10/)
    })

    test("Verify clear all filters function ", async ({ page }) => {
        const homePage = new HomePage(page)
        const searchResultPage = new SearchResultPage(page)

        // 1. Vào trang
        await homePage.goto()

        // 2. Search
        await homePage.search("design")
        await page.waitForLoadState("networkidle")

        const originalUrl = page.url()

        // 3. Apply filter
        await searchResultPage.applyOneFilter()
        await page.waitForLoadState("networkidle")

        // URL phải thay đổi
        await expect(page).not.toHaveURL(originalUrl)

        // 4. Clear all
        await searchResultPage.clearAllFilters()
        await page.waitForLoadState("networkidle")

        // 5. Verify quay về trạng thái ban đầu
        await expect(page).toHaveURL(originalUrl)
    })
})
