import { Page, Locator, expect } from "@playwright/test"
import { highLightAndScreenshot } from "../utils/screenshot"
import { time } from "node:console"
export class ProfilePage {
    readonly page: Page

    // Locators
    readonly dropdownMenuButton: Locator
    readonly logoutButton: Locator
    readonly profileImageFileInput: Locator
    readonly editButton: Locator
    readonly FacebookLink: Locator
    readonly GoogleLink: Locator
    readonly GithubLink: Locator
    readonly TwitterLink: Locator
    readonly DribbleLink: Locator
    readonly StackOverflowLink: Locator
    readonly emailInput: Locator
    readonly nameInput: Locator
    readonly phoneInput: Locator
    readonly birthdayInput: Locator
    readonly maleRadio: Locator
    readonly femaleRadio: Locator
    readonly certificationInput: Locator
    readonly certificationChips: Locator
    readonly skillInput: Locator
    readonly skillChips: Locator
    readonly saveButton: Locator
    readonly cancelButton: Locator
    readonly certificationClearButton: Locator
    readonly skillClearButton: Locator
    readonly createGigButton: Locator
    readonly successToastMessage: Locator

    readonly url = "/profile"

    constructor(page: Page) {
        this.page = page
        this.dropdownMenuButton = page.locator("#dropdownMenuButton1")
        this.logoutButton = page.getByRole("button", { name: "Đăng Xuất" })
        this.profileImageFileInput = page.locator(
            '.info_label input[type="file"]',
        )
        this.editButton = page.locator("button.edit").last()
        this.FacebookLink = page.getByRole("link", { name: "Facebook" })
        this.GoogleLink = page.getByRole("link", { name: "Google" })
        this.GithubLink = page.getByRole("link", { name: "Github" })
        this.TwitterLink = page.getByRole("link", { name: "Twitter" })
        this.DribbleLink = page.getByRole("link", { name: "Dirbble" })
        this.StackOverflowLink = page.getByRole("link", {
            name: "Stack Overflow",
        })
        this.emailInput = page.getByLabel("Email")
        this.phoneInput = page.getByLabel("Phone")
        this.nameInput = page.getByLabel("Name")
        this.birthdayInput = page.getByLabel("Birthday")
        this.maleRadio = page.getByRole("radio", { name: "Male" })
        this.femaleRadio = page.getByRole("radio", { name: "Female" })
        this.certificationInput = page.getByRole("combobox", {
            name: "Certification",
        })
        this.certificationChips = page
            .locator(".MuiAutocomplete-root", { has: page.getByRole("combobox", { name: "Certification" }) })
            .locator(".MuiChip-root")
        this.skillInput = page.getByRole("combobox", { name: "Skill" })
        this.skillChips = page
            .locator(".MuiAutocomplete-root", { has: page.getByRole("combobox", { name: "Skill" }) })
            .locator(".MuiChip-root")
        this.saveButton = page.getByRole("button", { name: "Save" })
        this.cancelButton = page.getByRole("button", { name: "Cancel" })
        this.certificationClearButton = page
            .getByRole("combobox", { name: "Certification" })
            .locator("xpath=..")
            .locator('button[aria-label="Clear"]')

        this.skillClearButton = page
            .getByRole("combobox", { name: "Skill" })
            .locator("xpath=..")
            .locator('button[aria-label="Clear"]')
        this.createGigButton = page.getByRole("button", {
            name: "Create a new Gig",
        })
        this.successToastMessage = page.locator('[role="alert"]')
    }

    async clickDropdownMenu() {
        await highLightAndScreenshot(
            this.page,
            this.dropdownMenuButton,
            "Profile Page tests",
            "click_dropdown_menu",
        )
        await expect(this.dropdownMenuButton).toBeVisible()
        // Use evaluate to click directly on the DOM node to bypass any sticky header interception
        await this.dropdownMenuButton.evaluate((node) => (node as HTMLElement).click())
        await this.page.waitForTimeout(300) // Wait for Bootstrap dropdown animation
    }

    async logout() {
        await this.clickDropdownMenu()
        await expect(this.logoutButton).toBeVisible()
        await highLightAndScreenshot(
            this.page,
            this.logoutButton,
            "Profile Page tests",
            "click_logout",
        )
        // Use evaluate to bypass potential interception on the dropdown item as well
        await this.logoutButton.evaluate((node) => (node as HTMLElement).click())
    }

    async uploadProfileImage(filePath: string) {
        await highLightAndScreenshot(
            this.page,
            this.profileImageFileInput,
            "Profile Page tests",
            "upload_profile_image",
        )
        await this.profileImageFileInput.setInputFiles(filePath)
        const avatarImage = this.page.locator(".avatar")
        await expect(avatarImage).toHaveAttribute("src", /avatar/i)
    }

    async clickEditButton() {
        await highLightAndScreenshot(
            this.page,
            this.editButton,
            "Profile Page tests",
            "click_edit_button",
        )
        await this.editButton.click()
    }

    async clickFacebooklink() {
        await highLightAndScreenshot(
            this.page,
            this.FacebookLink,
            "Profile Page tests",
            "click_facebook_link",
        )
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.FacebookLink.click({ timeout: 3000 }),
        ])
        await expect(newPage).toHaveURL(/facebook/i)
    }

    async clickGoogleLink() {
        await highLightAndScreenshot(
            this.page,
            this.GoogleLink,
            "Profile Page tests",
            "click_google_link",
        )
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.GoogleLink.click({ timeout: 3000 }),
        ])
        await expect(newPage).toHaveURL(/google/i)
    }

    async clickGithubLink() {
        await highLightAndScreenshot(
            this.page,
            this.GithubLink,
            "Profile Page tests",
            "click_github_link",
        )
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.GithubLink.click({ timeout: 3000 }),
        ])
        await expect(newPage).toHaveURL(/github/i)
    }

    async clickTwitterLink() {
        await highLightAndScreenshot(
            this.page,
            this.TwitterLink,
            "Profile Page tests",
            "click_twitter_link",
        )
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.TwitterLink.click({ timeout: 3000 }),
        ])
        await expect(newPage).toHaveURL(/twitter/i)
    }

    async clickDribbleLink() {
        await highLightAndScreenshot(
            this.page,
            this.DribbleLink,
            "Profile Page tests",
            "click_dribble_link",
        )
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.DribbleLink.click({ timeout: 3000 }),
        ])
        await expect(newPage).toHaveURL(/dribble/i)
    }

    async clickStackOverflowLink() {
        await highLightAndScreenshot(
            this.page,
            this.StackOverflowLink,
            "Profile Page tests",
            "click_stackoverflow_link",
        )
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.StackOverflowLink.click({ timeout: 3000 }),
        ])
        await expect(newPage).toHaveURL(/stackoverflow/i)
    }

    async updateName(name: string) {
        await this.nameInput.clear()
        await this.nameInput.fill(name)

        await expect(this.nameInput).toHaveValue(name)
        await highLightAndScreenshot(
            this.page,
            this.nameInput,
            "Profile Page tests",
            "update_name",
        )
    }

    async updatePhone(phone: string) {
        await this.phoneInput.clear()
        await this.phoneInput.fill(phone)
        await expect(this.phoneInput).toHaveValue(phone)
        await highLightAndScreenshot(
            this.page,
            this.phoneInput,
            "Profile Page tests",
            "update_phone",
        )
    }

    async updateBirthday(birthday: string) {
        await this.birthdayInput.clear()
        await this.birthdayInput.fill(birthday)
        await expect(this.birthdayInput).toHaveValue(birthday)
        await highLightAndScreenshot(
            this.page,
            this.birthdayInput,
            "Profile Page tests",
            "update_birthday",
        )
    }

    async selectMale() {
        await this.maleRadio.check()
        await expect(this.maleRadio).toBeChecked()
        await highLightAndScreenshot(
            this.page,
            this.maleRadio,
            "Profile Page tests",
            "select_male",
        )
    }

    async selectFemale() {
        await this.femaleRadio.check()
        await expect(this.femaleRadio).toBeChecked()
        await highLightAndScreenshot(
            this.page,
            this.femaleRadio,
            "Profile Page tests",
            "select_female",
        )
    }

    async addCertification(cert: string) {
        await this.certificationInput.focus()
        await this.certificationInput.clear()
        await this.certificationInput.pressSequentially(cert, { delay: 50 })
        await highLightAndScreenshot(
            this.page,
            this.certificationInput,
            "Profile Page tests",
            "add_certification",
        )
        await this.page.waitForTimeout(500)
        await this.page.keyboard.press("Enter")
        await expect(
            this.certificationChips.filter({ hasText: new RegExp(`^${cert}$`) }).first(),
        ).toBeVisible()
    }

    async addSkill(skill: string) {
        await this.skillInput.focus()
        await this.skillInput.clear()
        await this.skillInput.pressSequentially(skill, { delay: 50 })
        await highLightAndScreenshot(
            this.page,
            this.skillInput,
            "Profile Page tests",
            "add_skill",
        )
        await this.page.waitForTimeout(500)
        await this.page.keyboard.press("Enter")
        await expect(this.skillChips.filter({ hasText: new RegExp(`^${skill}$`) }).first()).toBeVisible()
    }

    async clickSave() {
        await highLightAndScreenshot(
            this.page,
            this.saveButton,
            "Profile Page tests",
            "click_save",
        )
        await this.saveButton.click()
    }

    async clickCancel() {
        await highLightAndScreenshot(
            this.page,
            this.cancelButton,
            "Profile Page tests",
            "click_cancel",
        )
        await this.cancelButton.click()
    }

    async updateProfile(data: {
        name?: string
        phone?: string
        birthday?: string
        gender?: "male" | "female"
    }) {
        if (data.name) await this.updateName(data.name)
        if (data.phone) await this.updatePhone(data.phone)
        if (data.birthday) await this.updateBirthday(data.birthday)

        if (data.gender === "male") await this.selectMale()
        if (data.gender === "female") await this.selectFemale()
    }

    async clearCertification() {
        await this.certificationInput.clear()
        const count = await this.certificationChips.count()
        for (let i = count - 1; i >= 0; i--) {
            const deleteIcon = this.certificationChips.nth(i).locator('[data-testid="CancelIcon"]')
            if (await deleteIcon.isVisible()) {
                await highLightAndScreenshot(
                    this.page,
                    deleteIcon,
                    "Profile Page tests",
                    "clear_certification",
                )
                await deleteIcon.click()
            }
        }
    }

    async clearSkill() {
        await this.skillInput.clear()
        const count = await this.skillChips.count()
        for (let i = count - 1; i >= 0; i--) {
            const deleteIcon = this.skillChips.nth(i).locator('[data-testid="CancelIcon"]')
            if (await deleteIcon.isVisible()) {
                await highLightAndScreenshot(
                    this.page,
                    deleteIcon,
                    "Profile Page tests",
                    "clear_skill",
                )
                await deleteIcon.click()
            }
        }
    }

    async clickCreateGig() {
        await highLightAndScreenshot(
            this.page,
            this.createGigButton,
            "Profile Page tests",
            "click_create_gig",
        )
        await this.createGigButton.click({ timeout: 3000 })
    }
}
