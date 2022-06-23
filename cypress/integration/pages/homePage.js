export class HomePage {
    constructor() {}

    getTitle() {
        return cy.title()
    }

    getTab() {
        return cy.get('[title="home page"]')
    }

    getImage() {
        return cy.get('img[class^="img"]')
    }
}
export default HomePage;
