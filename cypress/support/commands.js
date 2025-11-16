/// <reference types="cypress" />

Cypress.Commands.add('login', (email, password) => {
   return cy.request({
      method: "POST",
      url: "/login",
      body: {
         email,
         password,
      }
   }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property("message", "Login realizado com sucesso")
      expect(res.body).to.have.property("authorization")

      const token = res.body.authorization
      cy.window().then((win) => {
         win.localStorage.setItem("token", token)
      })

      return cy.wrap(token);
   })
})

Cypress.Commands.add('loginSession', (email, password) => {
   cy.session([email, password], () => {
      cy.login(email, password)
   })
})

Cypress.Commands.add("authRequest", (options) => {
   cy.window().then((win) => {
      const token = win.localStorage.getItem("token")
      cy.request({
         ...options,
         headers: {
            Authorization: token,
            ...(options.headers || {}),
         },
      });
   });
})