/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  const initialProducts = [
    {
      id: 1,
      title: 'CHOCOLATE STRAWBERRIES',
      shortDescription: 'this is a short description',
      pdtWt: 5,
      priceCents: 500,
    },
    {
      id: 2,
      title: 'CHOCOLATE TRUFFLES',
      shortDescription: 'this is a short description',
      pdtWt: 10,
      priceCents: 500,
    },
    {
      id: 3,
      title: 'CHOCOLATE LOLLIPOPS',
      shortDescription: 'this is a short description',
      pdtWt: 15,
      priceCents: 500,
    },
  ]
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('with guest user', () => {
    beforeEach(() => {
      initialProducts.map(product => {
        return Product.create(product)
      });
    })
    describe('GET /api/products', () => {
      it('returns all products', () => {
        return request(app)
          .get('/api/products')
          .expect(200)
          .then(res => {
            expect(res.body[0].id).to.be.equal(1)
            expect(res.body[0].title).to.be.equal('CHOCOLATE STRAWBERRIES')
            expect(res.body[0].shortDescription).to.be.equal('this is a short description')
            expect(res.body[0].pdtWt).to.be.equal(5)
            expect(res.body[0].priceCents).to.be.equal(500)

            expect(res.body[1].id).to.be.equal(2)
            expect(res.body[1].title).to.be.equal('CHOCOLATE TRUFFLES')
            expect(res.body[1].shortDescription).to.be.equal('this is a short description')
            expect(res.body[1].pdtWt).to.be.equal(10)
            expect(res.body[1].priceCents).to.be.equal(500)

            expect(res.body[2].id).to.be.equal(3)
            expect(res.body[2].title).to.be.equal('CHOCOLATE LOLLIPOPS')
            expect(res.body[2].shortDescription).to.be.equal('this is a short description')
            expect(res.body[2].pdtWt).to.be.equal(15)
            expect(res.body[2].priceCents).to.be.equal(500)
          })
      })
    })
    describe('GET /api/products/:id', () => {
      it('returns a product with a specific id', () => {
        return request(app)
          .get(`/api/products/${1}`)
          .expect(200)
          .then(res => {
            expect(res.body.id).to.be.equal(1)
            expect(res.body.title).to.be.equal('CHOCOLATE STRAWBERRIES')
            expect(res.body.shortDescription).to.be.equal('this is a short description')
            expect(res.body.pdtWt).to.be.equal(5)
            expect(res.body.priceCents).to.be.equal(500)
          })
      })
    })
    describe('GET /api/products/:id', () => {
      it('returns a product with a specific id', () => {
        return request(app)
          .get(`/api/products/${1}`)
          .expect(200)
          .then(res => {
            expect(res.body.id).to.be.equal(1)
            expect(res.body.title).to.be.equal('CHOCOLATE STRAWBERRIES')
            expect(res.body.shortDescription).to.be.equal('this is a short description')
            expect(res.body.pdtWt).to.be.equal(5)
            expect(res.body.priceCents).to.be.equal(500)
          })
      })
    })

    // still need to test routes for reviews and categories!
  });
});
