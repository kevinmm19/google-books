module.exports = {
    before: function (browser) {
        browser.url(process.env.VUE_APP_TEST_SERVER)
            .waitForElementVisible('#app', 500);
    },
    after: function (browser) {
        browser.end();
    },
    'A string is added to the search input and it shows the reset button.': browser => {
        browser.setValue('.search__input', 'CSS')
            .waitForElementVisible('.search__reset', 500);
    },
    'The reset button clears the search input when clicked and hides itself immediately.': browser => {
        browser.click('.search__reset').pause(1000);
        browser.expect.element('.search__input').text.to.equal('');
        browser.expect.element('.search__reset').to.not.be.present;
    },
    'The bookshelf is shown after doing a simple search and displays 3 books on the first page.': browser => {
        browser.setValue('.search__input', 'HTML5')
            .waitForElementVisible('.bookshelf', 3000);
        browser.assert.elementCount('.js-book', 3);
        browser.assert.elementCount('.js-modal', 3);
    },
    'The bookshelf disappears after not finding any matches on the search value provided.': browser => {
        browser.setValue('.search__input', 'hdaakjsdahsjdgajhasdjgd')
            .waitForElementNotPresent('.bookshelf', 3000);
    }
}
