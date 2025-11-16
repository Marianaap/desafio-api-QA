/// <reference types="cypress" />

describe('Login', () => {
   it('Deve fazer o login com sucesso ao usar um usuário cadastrado', () => {
      cy.fixture('baseUser').then((user) => {
         cy.request({
            method: "POST",
            url: "/login",
            body: {
               email: user.email,
               password: user.password,
            }
         }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property("message", "Login realizado com sucesso")
            expect(res.body).to.have.property("authorization")
         })
      })
   })

   it('Não deve fazer o login ao usar um usuário com email ou senha incorretos', () => {
      cy.fixture('baseUser').then((user) => {
         cy.request({
            method: "POST",
            url: "/login",
            failOnStatusCode: false,
            body: {
               email: user.email,
               password: "SENHA_INCORRETA",
            }
         }).then((res) => {
            expect(res.status).to.eq(401)
            expect(res.body).to.have.property("message", "Email e/ou senha inválidos")
         })
      })
   })
})