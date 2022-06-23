Feature: Pet Clinic Feature File

Scenario: Verify image on home page

Given user launches the url
When  clicks on "Home" tab
Then  verifies the image


Scenario: Find all the Veterinarians which are added in the application

Given user launches the url
When  clicks on "Veterinarians" tab
Then  displays the list of all Veterinarians


Scenario: Find all the existing owners which are added in application

Given user launches the url
When  clicks on "Find Owners" tab
And   clicks on "Find Owner" button
Then  displays the list of all Owners


Scenario: Add a new owner and add pet for that owner

Given user launches the url
And   clicks on "Find Owners" tab
When  clicks on "Add Owner" button
Then  adds a new owner
|firstName |lastName |address |city   |telephone|
|Marina    |Dantis   |MiraRoad|Mumbai |123      |
When  clicks on "Add New Pet" button
Then  adds a new pet
|name   |birthDate |type |
|zazzle |2021-08-18|bird |


Scenario: Check all the information added for the newly created owner and pet is correct

Given user launches the url
And   clicks on "Find Owners" tab
When  enters "Dantis" as lastName
Then  verifies owner information
|Name         |Address |City   |Telephone|
|Marina Dantis|MiraRoad|Mumbai |123      |
And  verifies pet information
|Name   |Birth Date |Type |
|zazzle |2021-08-18 |bird |