import { test, expect } from "@playwright/test";
import { Footer } from "../pages/Footer";
import { highLightAndScreenshot } from "../utils/screenshot";

test.describe("Footer Test Cases", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        // Scroll to the bottom to ensure footer is in view
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    });

    test("Verify Footer Top UI Visibility", async ({ page }) => {
        const footer = new Footer(page);

        const columns = [
            { name: "Categories", locator: footer.categoriesLinks },
            { name: "About", locator: footer.aboutLinks },
            { name: "Support", locator: footer.supportLinks },
            { name: "Community", locator: footer.communityLinks },
            { name: "More From", locator: footer.moreFromLinks }
        ];

        for (const col of columns) {
            const count = await col.locator.count();
            expect(count).toBeGreaterThan(0); // Ensure we found links in this column

            for (let i = 0; i < count; i++) {
                const link = col.locator.nth(i);
                await expect(link).toBeVisible();
            }
            
            // Highlight and screenshot the first link of each column as proof
            await highLightAndScreenshot(page, col.locator.first(), "footer.spec.ts", `FirstLink_in_${col.name}`);
        }
    });

    test("Verify Footer Top Link Navigation", async ({ page }) => {
        const footer = new Footer(page);

        const columns = [
            footer.categoriesLinks,
            footer.aboutLinks,
            footer.supportLinks,
            footer.communityLinks,
            footer.moreFromLinks
        ];

        for (const colLocator of columns) {
            const count = await colLocator.count();
            
            for (let i = 0; i < count; i++) {
                const link = colLocator.nth(i);
                
                // Assert that the href navigates to a valid relative route (e.g. /categories, /about)
                await expect(link).toHaveAttribute("href", /^\/[a-z0-9-]+\/?/i);
            }
        }
    });

    test("Verify Footer Bottom UI Visibility", async ({ page }) => {
        const footer = new Footer(page);

        // Verify logo and copyright
        await expect(footer.footerLogo).toBeVisible();
        await expect(footer.copyrightText).toBeVisible();
        await expect(footer.copyrightText).toContainText("© International Ltd.");
        await highLightAndScreenshot(page, footer.copyrightText, "footer.spec.ts", "copyrightText");

        // Verify Social Icons
        await expect(footer.twitterIcon).toBeVisible();
        await highLightAndScreenshot(page, footer.twitterIcon, "footer.spec.ts", "twitterIcon");
        await expect(footer.facebookIcon).toBeVisible();
        await highLightAndScreenshot(page, footer.facebookIcon, "footer.spec.ts", "facebookIcon");
        await expect(footer.linkedinIcon).toBeVisible();
        await highLightAndScreenshot(page, footer.linkedinIcon, "footer.spec.ts", "linkedinIcon");
        await expect(footer.pinterestIcon).toBeVisible();
        await highLightAndScreenshot(page, footer.pinterestIcon, "footer.spec.ts", "pinterestIcon");
        await expect(footer.instagramIcon).toBeVisible();
        await highLightAndScreenshot(page, footer.instagramIcon, "footer.spec.ts", "instagramIcon");

        // Verify Settings (Language, Currency, Accessibility)
        await expect(footer.languageButton).toBeVisible();
        await highLightAndScreenshot(page, footer.languageButton, "footer.spec.ts", "languageButton");
        await expect(footer.currencyButton).toBeVisible();
        await highLightAndScreenshot(page, footer.currencyButton, "footer.spec.ts", "currencyButton");
        await expect(footer.accessibilityButton).toBeVisible();
        await highLightAndScreenshot(page, footer.accessibilityButton, "footer.spec.ts", "accessibilityButton");
    });

    test("Verify Footer Bottom Link Navigation", async ({ page }) => {
        const footer = new Footer(page);

        // The social links in the HTML are wrapped in anchor tags around the SVG icons.
        // We can verify that these anchor tags have a valid href.
        const socialIcons = [
            footer.twitterIcon,
            footer.facebookIcon,
            footer.linkedinIcon,
            footer.pinterestIcon,
            footer.instagramIcon
        ];

        for (const icon of socialIcons) {
            // Find the closest ancestor anchor tag for the social icon
            const link = icon.locator("xpath=ancestor::a").first();
            
            // Mock assert for social media links
            await expect(link).toHaveAttribute("href", /^https?:\/\//i);
        }
    });
});
