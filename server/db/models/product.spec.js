/* global describe beforeEach it */

const {assert} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('data fields working', () => {
    describe('correct field outputs generated', () => {
      let productTest;

      beforeEach(() => {
        return Product.create({
          id: 1,
          title: 'CHOCOLATE STRAWBERRIES',
          shortDescription: 'this is a short description',
          fullDescription: 'meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow',
          inventoryQty: 999,
          pdtWt: 5,
          priceCents: 500,
        })
          .then(product => {
            productTest = product
          })
      })

      it('returns true if the title is correct', () => {
        assert.equal(productTest.title, 'CHOCOLATE STRAWBERRIES');
      })

      it('returns true if the shortDescription is correct', () => {
        assert.equal(productTest.shortDescription, 'this is a short description');
      })

      it('returns true if the fullDescription is correct', () => {
        assert.equal(productTest.fullDescription, 'meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow');
      })

      it('returns true if the inventoryQty is correct', () => {
        assert.equal(productTest.inventoryQty, 999);
      })

      it('returns true if the pdtWt is correct', () => {
        assert.equal(productTest.pdtWt, 5);
      })

      it('returns true if the priceCents is correct', () => {
        assert.equal(productTest.priceCents, 500);
      })
    });
  });
});

