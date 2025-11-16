/// <reference types="cypress" />

const { faker } = require("@faker-js/faker")

describe("Criação de conta", () => {
   it("Deve criar uma conta de usuário com sucesso", () => {
      const signupData = {
         nome: faker.person.fullName(),
         email: faker.internet.email().toLowerCase(),
         password: faker.internet.password()
      }

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
})