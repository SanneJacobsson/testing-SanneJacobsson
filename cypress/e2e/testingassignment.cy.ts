describe("search movies app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should have a form", () => {
    cy.get("form#searchform").should("exist");
    cy.get("form input#searchText").should("exist");
    cy.get("form button").contains("Sök");
  });

  it("should search and show movies", () => {
    cy.get("input#searchText").type("star");
    cy.get("form button").contains("Sök").click();
    cy.get("section#searchresult > div.movie").should("have.length", 2);
  });

  it("should show one movie", () => {
    cy.intercept("https://medieinstitutet-wie-products.azurewebsites.net/*", {
      name: "The Hunger Games",
      imageUrl: "http://randomimage.png",
    });
  });
});
