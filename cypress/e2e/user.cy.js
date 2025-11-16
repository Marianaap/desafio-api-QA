/// <reference types="cypress" />

describe('CRUD de usuários', () => {
   it('Deve listar usuários cadastrados', () => {
      cy.request({
         method: "GET",
         url: "/usuarios",
      }).then((res) => {
         expect(res.status).to.eq(200)
         expect(res.body.quantidade).to.be.a('number')
         expect(res.body.usuarios).to.be.an('array')
      })
   })

   it('Deve buscar os dados de um usuário cadastrado', () => {
      cy.fixture('baseUser').then((user) => {
         cy.request({
            method: "GET",
            url: `/usuarios/${user._id}`,
         }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.nome).to.be.eq(user.nome)
            expect(res.body.email).to.be.eq(user.email)
         })
      })

   })
})