export class OwnersPage {
    constructor() { }

    getTab() {
        return cy.get('[title="find owners"]')
    }

    getFindOwnerButton() {
        return cy.get('form button[type="submit"]')
    }

    displayOwnerList() { 
        cy.get('body div > span')
            .contains("]")
            .prev()
            .find('a[href^="/owners/"]')
            .invoke('text')
            .then((pageCount) => {
                cy.log(pageCount)
                var cnt;
                for (cnt = 1; cnt <= pageCount;) {
                    cy.get('body div > span')
                        .contains(cnt)
                        .click({ force: true })

                    cy.get('#owners tbody tr')
                        .each(($el, index, $list) => {
                            cy.get($el).find('td').eq(0).find('a')
                                .invoke('text')
                                .then((ownerName) => {
                                    cy.log(ownerName)
                                })
                        })
                    cnt += 1;
                }
            })
    }

    getAddOwnerLink() {
        return cy.get('form a[href="/owners/new"]')
    }

    fillOwnerForm(columnName, columnValue) {
        cy.get('#' + columnName)
            .click()
            .clear()
            .type(columnValue)
    }

    getAddOwnerButton() {
        return cy.get('form button[type="submit"]')
    }

    getAddPetLink() {
        return cy.get('a[href$="/pets/new"]')
    }

    fillPetForm(columnName, columnValue) {
        if (columnName.toLowerCase() == "type") {
            cy.get('#' + columnName)
                .select(columnValue)
        } else {
            cy.get('#' + columnName)
                .click()
                .clear()
                .type(columnValue)
        }
    }

    getAddPetButton() {
        return cy.get('form button[type="submit"]')
    }

    fillLastName(lastName) {
        return cy.get('#lastName')
            .click()
            .clear()
            .type(lastName)
            .type('{enter}')
    }

    clickOnOwnerName() {
        cy.get('body').then($body => {
            if ($body.find('table td a[href^="/owners/"]').length > 0) {   
            //evaluates as true if link exists at all
                cy.get('table td a[href^="/owners/"]').then($link => {
                  if ($link.is(':visible')){
                    cy.get('table td a[href^="/owners/"]').eq(0).click()
                  } else {
                    //you get here only if button EXISTS but is INVISIBLE
                    cy.log("Unable to click on the Owners name")
                  }
                });
            } else {
               //you get here if the link DOESN'T EXIST
               assert.isOk('everything','everything is OK');
            }
        });
    }

    getOwnerInfo(columnName) {
        if (columnName.toLowerCase() == "name") {
            return cy.get('table th')
                .contains(columnName)
                .siblings()
                .find('b')
        } else {
            return cy.get('table th')
                .contains(columnName)
                .next()
        }
    }

    getPetInfo(columnName) {
        return cy.get('table dl dt')
            .contains(columnName)
            .next()
    }


}
export default OwnersPage;