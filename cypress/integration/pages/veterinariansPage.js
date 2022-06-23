export class VeterinariansPage {
    constructor() { }

    getTab() {
        return cy.get('[title="veterinarians"]')
    }

    displayVetList() {
        cy.get('body div > span')
            .contains("]")
            .prev()
            .find('a[href^="/vets.html"]')
            .invoke('text')
            .then((pageCount) => {
                cy.log(pageCount)
                var cnt;
                for (cnt = 1; cnt <= pageCount;) {
                    cy.get('body div > span')
                        .contains(cnt)
                        .click({ force: true })

                    cy.get('#vets tbody tr')
                        .each(($el, index, $list) => {
                            cy.get($el).find('td').eq(0)
                                .invoke('text')
                                .then((vetName) => {
                                    cy.log(vetName)
                                })
                        })
                    cnt += 1;
                }
            })
    }
}
export default VeterinariansPage;
