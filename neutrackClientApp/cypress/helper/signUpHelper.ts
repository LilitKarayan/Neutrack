export class SignUpHelper {
    initValues() {
        cy.get('[formcontrolname=email]').should('have.value', '');
        cy.get('[formcontrolname=password]').should('have.value', '');
        cy.get('[formcontrolname=confirmationPassword]').should('have.value', '');
        cy.get('[formcontrolname=firstName]').should('have.value', '');
        cy.get('[formcontrolname=lastName]').should('have.value', '');
        cy.get('[formcontrolname=dateOfBirth]').should('have.value', '');
        cy.get('[formcontrolname=phoneNumber]').should('have.value', '');
        cy.get('[formcontrolname=gender]').should('have.value', null);
        cy.get('[formcontrolname=yearsOfExperience]').should('have.value', '');
    }

    initValuesPatient() {
        cy.get('[formcontrolname=firstName]').should('have.value', '');
        cy.get('[formcontrolname=lastName]').should('have.value', '');
        cy.get('[formcontrolname=dateOfBirth]').should('have.value', '');
        cy.get('[formcontrolname=gender]').should('have.value', null);
        cy.get('[formcontrolname=phoneNumber]').should('have.value', '');
        cy.get('[formcontrolname=activityLevel]').should('have.value', '');
        cy.get('[formcontrolname=height]').should('have.value', '');
        cy.get('[formcontrolname=weight]').should('have.value', '');
        cy.get('[formcontrolname=goal]').should('have.value', '');
        cy.get('[formcontrolname=email]').should('have.value', '');
        cy.get('[formcontrolname=password]').should('have.value', '');
        cy.get('[formcontrolname=confirmationPassword]').should('have.value', '');
        
        
        
    }
}