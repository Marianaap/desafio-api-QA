/// <reference types="cypress" />

const { faker } = require("@faker-js/faker")

const signupData = {
   nome: faker.person.fullName(),
   email: faker.internet.email().toLowerCase(),
   password: faker.internet.password()
}

describe("Cadastro de usuário", () => {
   it("Deve criar uma conta de usuário com sucesso", () => {
      cy.request({
         method: "POST",
         url: "/usuarios",
         body: {
            nome: signupData.nome,
            email: signupData.email,
            password: signupData.password,
            administrador: "false",
         }
      }).then((res) => {
         expect(res.status).to.eq(201)
         expect(res.body).to.have.property("message", "Cadastro realizado com sucesso")
      })
   })

   it("Não deve permitir criar uma conta de usuário já existente", () => {
      cy.request({
         method: "POST",
         url: "/usuarios",
         failOnStatusCode: false,
         body: {
            nome: signupData.nome,
            email: signupData.email,
            password: signupData.password,
            administrador: "false",
         }
      }).then((res) => {
         expect(res.status).to.eq(400)
         expect(res.body).to.have.property("message", "Este email já está sendo usado")
      })
   })
})