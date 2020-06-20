describe("react-hook-google-maps", () => {
  before(() => {
    cy.visit("/");
  });
  it("renders Google Maps one with a marker", () => {
    cy.findAllByText("This page can't load Google Maps correctly.").should(
      "have.length",
      2,
    );
    cy.findAllByText("OK").click({ multiple: true });
    cy.queryAllByText("This page can't load Google Maps correctly.").should(
      "not.exist",
    );
    // map marker can be selected with document.querySelectorAll("img[usemap='#gmimap0']");
    cy.get("img[usemap='#gmimap0']").should("have.length", 1);
  });
});
