import { Locator, Page } from "@playwright/test"

export class HomePage {
    readonly page: Page
    readonly searchInput: Locator
    readonly searchButton: Locator
    readonly gigItems: Locator
    readonly popularSection: Locator
    readonly popularItems: Locator
    readonly categoryDropdown: Locator
    readonly allCategories: Locator
    readonly webProgramming: Locator
    readonly dataEntry: Locator
    readonly serviceDropdown: Locator
    readonly sellerDetailsDropdown: Locator
    readonly DeliveryTime: Locator
    readonly proServicesToggle: Locator
    readonly localSellersToggle: Locator
    readonly onlineSellersToggle: Locator

    constructor(page: Page) {
        this.page = page
        this.searchInput = page.getByRole("searchbox", { name: "Search" })
        this.searchButton = page.getByRole("button", { name: "Search" })
        this.gigItems = page.locator(".card")
        this.popularSection = page.locator(".d-flex.popular")
        this.popularItems = this.popularSection.locator(".btn")
        this.categoryDropdown = page.getByRole("button", { name: /Category/i })
        this.allCategories = page.getByRole("link", { name: "All Categories" })
        this.webProgramming = page.getByRole("link", {
            name: "Web Programing",
        })
        this.dataEntry = page.getByRole("link", { name: "Data Entry" })
        this.serviceDropdown = page.getByRole("button", {
            name: /Service Options/i,
        })
        this.sellerDetailsDropdown = page.getByRole("button", {
            name: /Seller Details/i,
        })
        this.DeliveryTime = page.getByRole("button", {
            name: /Delivery Time/i,
        })
        this.proServicesToggle = page
            .locator(".toggle")
            .filter({ hasText: "Pro services" })
            .locator('input[type="checkbox"]')

        this.localSellersToggle = page
            .locator(".toggle")
            .filter({ hasText: "Local sellers" })
            .locator('input[type="checkbox"]')

        this.onlineSellersToggle = page
            .locator(".toggle")
            .filter({ hasText: "Online sellers" })
            .locator('input[type="checkbox"]')
    }

    async goto() {
        await this.page.goto("/", {
            waitUntil: "networkidle",
        })
    }

    async search(keyword: string) {
        await this.searchInput.fill(keyword)
        await this.searchButton.click()
    }

    async selectCategory(category: string) {
        await this.categoryDropdown.click()

        const container = this.categoryDropdown.locator("xpath=..")

        const item = container.locator(".dropdown-item", {
            hasText: new RegExp(category, "i"), // case-insensitive
        })

        await item.click()
    }

    async selectServiceOption(option: string) {
        await this.serviceDropdown.click()

        const container = this.serviceDropdown.locator("xpath=..")

        const item = container.locator(".dropdown-item", {
            hasText: new RegExp(option, "i"), // case-insensitive
        })

        await item.click()
    }

    async selectSellerDetails(detail: string) {
        await this.sellerDetailsDropdown.click()

        const container = this.sellerDetailsDropdown.locator("xpath=..")

        const item = container.locator(".dropdown-item", {
            hasText: new RegExp(detail, "i"), // case-insensitive
        })

        await item.click()
    }

    async selectDeliveryTime(time: string) {
        await this.DeliveryTime.click()

        const container = this.DeliveryTime.locator("xpath=..")

        const item = container.locator(".dropdown-item", {
            hasText: new RegExp(time, "i"), // case-insensitive
        })

        await item.click()
    }
}
