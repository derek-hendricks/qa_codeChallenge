import {
    By,
    until,
    WebDriver
} from "selenium-webdriver";

export class SpecPage {
    driver: WebDriver;
    url: string = "https://www.google.com";
    searchInput: By = By.css('.gLFyf.gsfi');
    searchResults: By = By.css('#search');

    /**
     * @param  {WebDriver} driver
     */
    constructor(driver: WebDriver) {
        this.driver = driver;
    }
    /**
     * Navigates to "https://www.google.com"
     * @returns Promise - void
     */
    public async navigate(): Promise<void> {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.searchInput));
    }
    /**
     * Searches google for text
     * @param  {string} searchText - the text entered in google's search field
     * @returns Promise - void
     */
    public async doSearch(searchText: string): Promise<void> {
        const searchInputText: string = `${searchText}\n`;
        await this.driver.wait(until.elementLocated(this.searchInput));
        await this.driver.findElement(this.searchInput).sendKeys(searchInputText);
    }
    /**
     * Gets the results from a google search that has been made. Returns all search results that match the search text
     * @returns Promise
     */
    public async getResults(): Promise<string> {
        await this.driver.wait(until.elementLocated(this.searchResults));
        let searchResults = await this.driver.findElement(this.searchResults);
        return await searchResults.getText();

    }
}

