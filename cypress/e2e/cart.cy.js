/// <reference types="cypress" />

const { faker } = require("@faker-js/faker")

describe('CRUD de carrinhos de compra', () => {
   describe("Com autenticação de admin", () => {
      beforeEach(() => {
         cy.fixture('adminUser').then((user) => {
            cy.loginSession(user.email, user.password)
         })
      })

      it('Deve criar um carrinho com alguns produtos', () => {
         const cartProducts = [];

         // TODO: Revisar essa implementação para não duplicar código (listagem de produtos)
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

               if (!!produto.quantidade && cartProducts.length < 2) {
                  const cartProduct = {
                     idProduto: produto._id,
                     quantidade: faker.number.int({ min: 1, max: produto.quantidade })
                  }

                  cartProducts.push(cartProduct)
               }
            })

            cy.authRequest({
               method: "POST",
               url: "/carrinhos",
               body: {
                  produtos: cartProducts
               }
            }).then((res) => {
               expect(res.status).to.eq(201)
               expect(res.body).to.have.property("message", "Cadastro realizado com sucesso")
               expect(res.body._id).to.be.a('string')
            })
         })
      })

      it('Deve remover/cancelar um carrinho de compra', () => {
         cy.fixture('adminUser').then((user) => {
            cy.request({
               method: "GET",
               url: "/carrinhos",
               qs: {
                  idUsuario: user._id
               }
            }).then((res) => {
               expect(res.status).to.eq(200)
               if (res.body.quantidade) {
                  cy.authRequest({
                     method: "DELETE",
                     url: "/carrinhos/cancelar-compra",
                  }).then((res) => {
                     expect(res.status).to.eq(200)
                     expect(res.body).to.have.property("message", "Registro excluído com sucesso. Estoque dos produtos reabastecido")
                  })
               } else {
                  cy.log("Nenhum carrinho de compra associado ao usuário!")
               }
            })
         })
      })
   })

   describe("Sem autenticação de admin", () => {
      it('Deve listar carrinhos de compra cadastrados', () => {
         cy.request({
            method: "GET",
            url: "/carrinhos",
         }).then((res) => {
            expect(res.status).to.eq(200)

            expect(res.body.quantidade).to.be.a('number')
            expect(res.body.carrinhos).to.be.an('array')

            res.body.carrinhos.forEach((carrinho) => {
               expect(carrinho._id).to.be.a('string')
               expect(carrinho.idUsuario).to.be.a('string')
               expect(carrinho.precoTotal).to.be.a('number')
               expect(carrinho.quantidadeTotal).to.be.a('number')
               expect(carrinho.produtos).to.be.a('array')

               carrinho.produtos.forEach((produto) => {
                  expect(produto.idProduto).to.be.a('string')
                  expect(produto.quantidade).to.be.a('number')
                  expect(produto.precoUnitario).to.be.a('number')
               })
            })
         })
      })
   })
})