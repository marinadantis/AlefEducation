import { Given, And, When, Then } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../pages/homePage";
import VeterinariansPage from "../pages/veterinariansPage";
import OwnersPage from "../pages/ownersPage";

const home = new HomePage();
const vet = new VeterinariansPage();
const owner = new OwnersPage();
var obj;

// user verifies the title post launching the url
Given('user launches the url', () => {
    home.getTitle()
        .should('eq', 'PetClinic :: a Spring Framework demonstration')
});

// click on the tabName
When('clicks on {string} tab', (tabName) => {
    if (tabName.toLowerCase() == "home") {
        obj = home;
    } else if (tabName.toLowerCase() == "veterinarians") {
        obj = vet;
    } else if (tabName.toLowerCase() == "find owners") {
        obj = owner;
    }
    obj.getTab(tabName)
        .click()
});

// verify the image on home screen
Then('verifies the image', () => {
    home.getImage()
        .should('have.attr', 'src')
        .should('include', 'pets.png')
});

// display the list of veterinarians
Then('displays the list of all Veterinarians', () => {
    vet.displayVetList()
});

// click on find/add owner/pet
When('clicks on {string} button', (buttonName) => {
    if (buttonName.toLowerCase() == "find owner") {
        owner.getFindOwnerButton().click()
    } else if (buttonName.toLowerCase() == "add owner") {
        owner.getAddOwnerLink().click()
    } else if (buttonName.toLowerCase() == "add new pet") {
        owner.getAddPetLink().click()
    }
});

// display the list of owners
Then('displays the list of all Owners', () => {
    owner.displayOwnerList()
});

// add a new owner
Then('adds a new owner', datatable => {
    var columnName, columnValue;
    datatable.hashes().forEach(row => {
        for (columnName in row) {
            columnValue = row[columnName]
            cy.log(columnName, columnValue)
            owner.fillOwnerForm(columnName, columnValue)
        }
        owner.getAddOwnerButton().click()
    })
});

// add a new pet
Then('adds a new pet', datatable => {
    var columnName, columnValue;
    datatable.hashes().forEach(row => {
        for (columnName in row) {
            columnValue = row[columnName]
            cy.log(columnName, columnValue)
            owner.fillPetForm(columnName, columnValue)
        }
        owner.getAddPetButton().click()
    })
});

// enter last name on find owners page
When('enters {string} as lastName', (lastName) => {
    owner.fillLastName(lastName)
    owner.clickOnOwnerName()
});

// verify owner information
Then('verifies owner information', datatable => {
    var columnName, columnValue;
    datatable.hashes().forEach(row => {
        for (columnName in row) {
            columnValue = row[columnName]
            cy.log(columnName, columnValue)
            owner.getOwnerInfo(columnName, columnValue)
                .invoke('text')
                .should('equal', columnValue)
        }
    })
});

// verify pet information
Then('verifies pet information', datatable => {
    var columnName, columnValue;
    datatable.hashes().forEach(row => {
        for (columnName in row) {
            columnValue = row[columnName]
            cy.log(columnName, columnValue)
            owner.getPetInfo(columnName, columnValue)
                .invoke('text')
                .should('equal', columnValue)
        }
    })
});