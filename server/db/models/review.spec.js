/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {
  before(() => {
    return db.sync({force: true})
  })

  var review;
  beforeEach(function(){
    review = Review.build({
      title: 'Love It',
      content: 'omg it is the best thing ever and it is so good and i love it',
      numStars: 5,
    });
  });

  afterEach(function(){
    return db.sync({force: true});
  });

  describe('attributes', () => {
    it('includes `title`,`content`, and `numStars` fields', function () {

      return review.save()
      .then(function (savedReview) {
        expect(savedReview.title).to.equal('Love It');
        expect(savedReview.content).to.equal('omg it is the best thing ever and it is so good and i love it');
        expect(savedReview.numStars).to.equal(5);
      });

    });

    it('requires `content`', function () {

      review.content = null;

      return review.validate()
      .then(function () {
        throw new Error('validation should fail when content is null');
      },
      function(result) {
        expect(result).to.be.an.instanceOf(Error);
      });

    });

    it('requires `numStars`', function () {

      review.numStars = null;

      return review.validate()
      .then(function () {
        throw new Error('validation should fail when numStars is null');
      },
      function(result) {
        expect(result).to.be.an.instanceOf(Error);
      });

    });
  })
}) // end describe('Review model')
