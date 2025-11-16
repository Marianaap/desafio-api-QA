/// <reference types="cypress" />

// Importante: Criação da conta base de usuário e de admin a serem usadas no fixture. Para isso, é necessário rodar o cenário abaixo sem o .skip
// Observação: deve ser rodada apenas 1 vez no início doo teste pois a base de dados do ServeRest limpa os dados depois de algum tempo.
describe.skip("Configuração inicial", () => {
   it("Deve criar a conta de usuário administrador base", () => {
      cy.fixture('adminUser').then((user) => {
         cy.request({
            method: "POST",
            url: "/usuarios",
            body: {
               nome: user.nome,
               email: user.email,
               password: user.password,
               administrador: "true",
            }
         }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body).to.have.property("message", "Cadastro realizado com sucesso")
            
            // Salva o ID do usuário criado no fixture
            user._id = res.body._id
            cy.writeFile("cypress/fixtures/adminUser.json", user);
         })
      })
   })

   it("Deve criar a conta de usuário base", () => {
      cy.fixture('baseUser').then((user) => {
         cy.request({
            method: "POST",
            url: "/usuarios",
            body: {
               nome: user.nome,
               email: user.email,
               password: user.password,
               administrador: "false",
            }
         }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body).to.have.property("message", "Cadastro realizado com sucesso")

            // Salva o ID do usuário criado no fixture
            user._id = res.body._id
            cy.writeFile("cypress/fixtures/baseUser.json", user);
         })
      })
   })
})