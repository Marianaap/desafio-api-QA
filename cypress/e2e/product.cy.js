/// <reference types="cypress" />

const { faker } = require("@faker-js/faker")
describe('CRUD de produtos', () => {

   describe("Com autenticação de admin", () => {

      const productData = {
         nome: faker.commerce.productName(),
         preco: faker.commerce.price({ min: 0, dec: 0 }),
         descricao: faker.commerce.productDescription(),
         quantidade: faker.number.int({ min: 0 })
      }

      beforeEach(() => {
         cy.fixture('adminUser').then((user) => {
            cy.loginSession(user.email, user.password)
         })
      })

      it('Deve cadastrar um produto', () => {
         cy.authRequest({
            method: "POST",
            url: "/produtos",
            body: {
               nome: productData.nome,
               preco: productData.preco,
               descricao: productData.descricao,
               quantidade: productData.quantidade,
            }
         }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body).to.have.property("message", "Cadastro realizado com sucesso")
            expect(res.body._id).to.be.a('string')
         })
      })

      it('Não deve deixar cadastrar um produto com um mesmo nome', () => {
         cy.authRequest({
            method: "POST",
            url: "/produtos",
            failOnStatusCode: false,
            body: {
               nome: productData.nome,
               preco: productData.preco,
               descricao: productData.descricao,
               quantidade: productData.quantidade,
            }
         }).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body).to.have.property("message", "Já existe produto com esse nome")
         })
      })
   })

   describe("Sem autenticação de admin", () => {
      it('Deve listar produtos cadastrados', () => {
         cy.request({
            method: "GET",
            url: "/produtos",
         }).then((res) => {
            expect(res.status).to.eq(200)

            expect(res.body.quantidade).to.be.a('number')
            expect(res.body.produtos).to.be.an('array')

            res.body.produtos.forEach((produto) => {
               expect(produto._id).to.be.a('string')
               expect(produto.nome).to.be.a('string')
               expect(produto.preco).to.be.a('number')
               expect(produto.descricao).to.be.a('string')
               expect(produto.quantidade).to.be.a('number')
            })
         })
      })
   })
})