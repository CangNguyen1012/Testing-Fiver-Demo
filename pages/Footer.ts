import { Locator, Page } from "@playwright/test";

export class Footer {
    readonly page: Page;

    // Columns
    readonly categoriesLinks: Locator;
    readonly aboutLinks: Locator;
    readonly supportLinks: Locator;
    readonly communityLinks: Locator;
    readonly moreFromLinks: Locator;

    // Bottom sections
    readonly footerLogo: Locator;
    readonly copyrightText: Locator;

    // Social Links
    readonly twitterIcon: Locator;
    readonly facebookIcon: Locator;
    readonly linkedinIcon: Locator;
    readonly pinterestIcon: Locator;
    readonly instagramIcon: Locator;

    // Settings
    readonly languageButton: Locator;
    readonly currencyButton: Locator;
    readonly accessibilityButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Helper to locate links within a specific column by its heading
        const getColumnLinks = (title: string) => 
            page.locator('article.article').filter({ has: page.locator(`h6:has-text("${title}")`) }).locator('ul li a');

        this.categoriesLinks = getColumnLinks("Categories");
        this.aboutLinks = getColumnLinks("About");
        this.supportLinks = getColumnLinks("Support");
        // Note: Accommodating the typo "Communlty" in the HTML source
        this.communityLinks = getColumnLinks("Communlty");
        this.moreFromLinks = getColumnLinks("More From");

        this.footerLogo = page.locator('.footer_bottom .logo_footer svg');
        this.copyrightText = page.locator('.footer_bottom .copyright');

        this.twitterIcon = page.locator('.footer_bottom .social .fa-twitter');
        this.facebookIcon = page.locator('.footer_bottom .social .fa-facebook');
        this.linkedinIcon = page.locator('.footer_bottom .social .fa-linkedin');
        this.pinterestIcon = page.locator('.footer_bottom .social .fa-pinterest');
        this.instagramIcon = page.locator('.footer_bottom .social .fa-instagram');

        this.languageButton = page.locator('.footer_bottom .settings_locale button').first();
        this.currencyButton = page.locator('.footer_bottom .settings_locale button').nth(1);
        this.accessibilityButton = page.locator('.footer_bottom button.button');
    }
}