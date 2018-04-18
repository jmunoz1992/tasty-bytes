/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Get routes', () => {
    const reviewTitle = 'Jujubes chocolate cake tiramisu croissant';
    const reviewContent = 'Danish macaroon jelly tart jujubes chocolate cake brownie chupa chups danish. Pastry chocolate cake jelly soufflé gummi bears jujubes chupa chups macaroon brownie. Muffin donut biscuit lollipop pudding bonbon danish cake cookie.';
    const reviewStars = 5;

    beforeEach(() => {
      return Review.create({
        title: reviewTitle,
        content: reviewContent,
        numStars: reviewStars,
      })
    })

    it('GET /api/reviews', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal(reviewTitle)
          expect(res.body[0].content).to.be.equal(reviewContent)
          expect(res.body[0].numStars).to.be.equal(reviewStars)
        })
    })

    it('GET /api/reviews/:id', () => {
      return request(app)
        .get('/api/reviews/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.be.equal(1)
          expect(res.body.title).to.be.equal(reviewTitle)
        })
    })
  }) // end describe('Post routes')

  describe('Post routes', () => {
    const reviewTitle = 'Macaroon liquorice cookie fruitcake';
    const reviewContent = 'Oat cake jujubes dragée cheesecake macaroon donut sweet roll chocolate cake apple pie. Cookie oat cake jelly jujubes croissant biscuit cheesecake. Cotton candy dragée jujubes cake. Fruitcake icing donut liquorice.';
    const reviewStars = 2;

    it('Post /api/reviews', () => {
      return request(app)
        .post('/api/reviews')
        .send({
        title: reviewTitle,
        content: reviewContent,
        numStars: reviewStars,
        })
        .expect(201)
        .expect(function (res) {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.not.be.an('undefined');
          expect(res.body.title).to.be.equal(reviewTitle)
          expect(res.body.content).to.be.equal(reviewContent)
        })
    })

  }) // end describe('Post routes')

  describe('Put routes', () => {
    const reviewTitle = 'Macaroon liquorice cookie fruitcake';
    const reviewContent = 'Oat cake jujubes dragée cheesecake macaroon donut sweet roll chocolate cake apple pie. Cookie oat cake jelly jujubes croissant biscuit cheesecake. Cotton candy dragée jujubes cake. Fruitcake icing donut liquorice.';
    const reviewStars = 2;

    beforeEach(() => {
      return Review.create({
        title: reviewTitle,
        content: reviewContent,
        numStars: reviewStars,
      })
    })

    it('Post /api/reviews/:id', () => {
      return request(app)
        .put('/api/reviews/1')
        .send({
        title: 'this is a better title',
        content: 'this is a way better content',
        })
        .expect(200)
        .expect(function (res) {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.not.be.an('undefined');
          expect(res.body.title).to.be.equal('this is a better title')
          expect(res.body.content).to.be.equal('this is a way better content')
        })
    })

    it('saves updates to the DB', function () {

      return request(app)
      .put('/api/reviews/1')
      .send({
        title: 'Awesome PUT-Updated Article'
      })
      .then(function () {
        return Review.findById(1);
      })
      .then(function (foundReview) {
        expect(foundReview).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundReview.title).to.equal('Awesome PUT-Updated Article');
      });

    });

  }) // end describe('Put routes')


}) // end describe('Review routes')
