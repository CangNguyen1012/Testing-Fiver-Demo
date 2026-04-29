import {test,expect} from "@playwright/test";
import { Header } from "../pages/Header";
import { LoginPage } from "../pages/LoginPage";
import { highLightAndScreenshot } from "../utils/screenshot";

test.describe("Header Test Cases", ()=>{
    test.beforeEach(async({page}) =>{
        const header = new Header(page);
        await header.goto();
    })

    test("Verify Header Display 1", async({page}) =>{
        const header = new Header(page);
        await expect(header.logo).toBeVisible();
        await highLightAndScreenshot(page, header.logo, "header.spec.ts", "logo");
        await expect(header.businessLink).toBeVisible();
        await highLightAndScreenshot(page, header.businessLink, "header.spec.ts", "businessLink");
        await expect(header.exploreLink).toBeVisible();
        await highLightAndScreenshot(page, header.exploreLink, "header.spec.ts", "exploreLink");
        await expect(header.languageButton).toBeVisible();
        await highLightAndScreenshot(page, header.languageButton, "header.spec.ts", "languageButton");
        await expect(header.currencyButton).toBeVisible();
        await highLightAndScreenshot(page, header.currencyButton, "header.spec.ts", "currencyButton");
        await expect(header.becomeASellerButton).toBeVisible();
        await highLightAndScreenshot(page, header.becomeASellerButton, "header.spec.ts", "becomeASellerButton");
        await expect(header.signInButton).toBeVisible();
        await highLightAndScreenshot(page, header.signInButton, "header.spec.ts", "signInButton");
        await expect(header.joinButton).toBeVisible();
        await highLightAndScreenshot(page, header.joinButton, "header.spec.ts", "joinButton");
    })

    test("Verify Header Display 2", async({page}) =>{
      const header = new Header(page);
      await page.evaluate(() => window.scrollBy(0, 500))
      await expect(header.searchHeaderInput).toBeVisible();
      await highLightAndScreenshot(page, header.searchHeaderInput, "header.spec.ts", "searchHeaderInput");
      await expect(header.searchHeaderButton).toBeVisible();
      await highLightAndScreenshot(page, header.searchHeaderButton, "header.spec.ts", "searchHeaderButton");
      await expect(header.logo).toBeVisible();
      await highLightAndScreenshot(page, header.logo, "header.spec.ts", "logo");
      await expect(header.businessLink).toBeVisible();
      await highLightAndScreenshot(page, header.businessLink, "header.spec.ts", "businessLink");
      await expect(header.exploreLink).toBeVisible();
      await highLightAndScreenshot(page, header.exploreLink, "header.spec.ts", "exploreLink");
      await expect(header.languageButton).toBeVisible();
      await highLightAndScreenshot(page, header.languageButton, "header.spec.ts", "languageButton");
      await expect(header.currencyButton).toBeVisible();
      await highLightAndScreenshot(page, header.currencyButton, "header.spec.ts", "currencyButton");
      await expect(header.becomeASellerButton).toBeVisible();
      await highLightAndScreenshot(page, header.becomeASellerButton, "header.spec.ts", "becomeASellerButton");
      await expect(header.signInButton).toBeVisible();
      await highLightAndScreenshot(page, header.signInButton, "header.spec.ts", "signInButton");
      await expect(header.joinButton).toBeVisible();
      await highLightAndScreenshot(page, header.joinButton, "header.spec.ts", "joinButton");
    })

    test("Verify Header Display After Login", async({page}) =>{
      const header = new Header(page);
      const loginPage = new LoginPage(page);
        await header.clickSignInButton();
        await loginPage.login("testuser123@gmail.com", "cang@1012");
        await expect(page).toHaveURL("/profile");
        await header.clickLogo();
        await expect(page).toHaveURL("/");
        await expect(header.avatarLink).toBeVisible();
        await highLightAndScreenshot(page, header.avatarLink, "header.spec.ts", "avatarLink");
    })

    test("Verify Logo When User Clicked", async({page}) => {
        const header = new Header(page);
        await header.goto();
        await expect(header.logo).toBeVisible();
        await highLightAndScreenshot(page, header.logo, "header.spec.ts", "logo");
        await header.clickLogo();
        await expect(page).toHaveURL("/");
    })

    test("Verify Logo When User Clicked After Login", async({page}) => {
        const header = new Header(page);
        const loginPage = new LoginPage(page);
        await header.clickSignInButton();
        await loginPage.login("testuser123@gmail.com", "cang@1012");
        await expect(page).toHaveURL("/profile");
        await header.clickLogo();
        await expect(page).toHaveURL("/");
    })

    test("Verify Search Header When User Typed In", async({page}) =>{
        const header = new Header(page);
        await header.goto();
        await page.evaluate(() => window.scrollBy(0, 500))
        await expect(header.searchHeaderInput).toBeVisible();
        await highLightAndScreenshot(page, header.searchHeaderInput, "header.spec.ts", "searchHeaderInput");
        await expect(header.searchHeaderButton).toBeVisible();
        await highLightAndScreenshot(page, header.searchHeaderButton, "header.spec.ts", "searchHeaderButton");
        await header.searchInHeader("design");
        await expect(page).toHaveURL("/result/design")
    })

    test("Verify Business Link", async({page}) => {
        const header = new Header(page);
        await header.goto();
        await expect(header.businessLink).toBeVisible();
        await highLightAndScreenshot(page, header.businessLink, "header.spec.ts", "businessLink");
        await header.clickBusinessLink();
        await expect(page).toHaveURL("/business")
    })

    test("Verify Explore Link", async({page}) => {
        const header = new Header(page);
        await header.goto();
        await expect(header.exploreLink).toBeVisible();
        await highLightAndScreenshot(page, header.exploreLink, "header.spec.ts", "exploreLink");
        await header.clickExploreLink();
        await expect(page).toHaveURL("/explore")
    })

    test("Verify Language Button", async({page}) => {
        const header = new Header(page);
        await header.goto();
        await expect(header.languageButton).toBeVisible();
        await highLightAndScreenshot(page, header.languageButton, "header.spec.ts", "languageButton");
        await header.clickLanguageButton();
        await expect(page).toHaveURL("/language")
    })

    test("Verify Currency Button", async({page}) => {
        const header = new Header(page);
        await header.goto();
        await expect(header.currencyButton).toBeVisible();
        await highLightAndScreenshot(page, header.currencyButton, "header.spec.ts", "currencyButton");
        await header.clickCurrencyButton();
        await expect(page).toHaveURL("/currency")
    })

    test("Verify Become A Seller Button", async({page}) => {
        const header = new Header(page);
        await header.goto();
        await expect(header.becomeASellerButton).toBeVisible();
        await highLightAndScreenshot(page, header.becomeASellerButton, "header.spec.ts", "becomeASellerButton");
        await header.clickBecomeASellerButton();
        await expect(page).toHaveURL("/become-seller")
    })

    test("Verify Sign In Button", async({page}) => {
        const header = new Header(page);
        await header.goto();
        await expect(header.signInButton).toBeVisible();
        await highLightAndScreenshot(page, header.signInButton, "header.spec.ts", "signInButton");
        await header.clickSignInButton();
        await expect(page).toHaveURL("/login")
    })

    test("Verify Join Button", async({page}) => {
        const header = new Header(page);
        await header.goto();
        await expect(header.joinButton).toBeVisible();
        await highLightAndScreenshot(page, header.joinButton, "header.spec.ts", "joinButton");
        await header.clickJoinButton();
        await expect(page).toHaveURL("/register")
    })

    test("Verify Avatar Link", async({page}) => {
        const header = new Header(page);
        const loginPage = new LoginPage(page);
        await header.goto();
        await header.clickSignInButton();
        await loginPage.login("testuser123@gmail.com", "cang@1012");
        await expect(page).toHaveURL("/profile");
        await header.clickLogo();
        await expect(page).toHaveURL("/");
        await expect(header.avatarLink).toBeVisible();
        await highLightAndScreenshot(page, header.avatarLink, "header.spec.ts", "avatarLink");
        await header.clickAvatarLink();
        await expect(page).toHaveURL("/profile")
    })

    test.afterEach(async({page}) => {
        await page.waitForTimeout(2000);
    })
})
