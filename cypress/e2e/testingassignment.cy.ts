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
    cy.intercept(
      "https://medieinstitutet-wie-products.azurewebsites.net/api/*",
      [
        {
          name: "The Hunger Games",
          imageUrl: "http://randomimage.png",
        },
      ]
    );

    cy.get("input#searchText").type("star");
    cy.get("form button").contains("Sök").click();
    cy.get("section#searchresult > div.movie").should("have.length", 1);
    cy.get("section#searchresult > div.movie > h3.movie__title").contains(
      "The Hunger Games"
    );
    cy.get("section#searchresult > div.movie > div.movie__image > img").should(
      "have.attr",
      "src",
      "http://randomimage.png"
    );
  });
});
