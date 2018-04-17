// This file should contain all the record creation needed to seed the database with its default values.
// The data can then be loaded with the node seed.js

const Promise = require('bluebird');
const chalk = require('chalk')
const {
  Address
} = require('./models');

var data = {
  address: [
    { name: "The Gingerbread House", nickName: "The Gingerbread House", street: "846 central ave", city: "deerfield", state: "IL", zipcode: "60015" },
    { name: "The Learning Tree", nickName: "The Learning Tree", street: "75 West 10th Street ", city: "Algonquin", state: "IL", zipcode: "60102" },
    { name: "Babes n' Tots", nickName: "Babes n' Tots", street: "77 w jackson blvd", city: "chicago", state: "IL", zipcode: "60604" },
    { name: "Lamb Tails", nickName: "Lamb Tails", street: "201 Henry Street ", city: "Berwyn", state: "IL", zipcode: "60402" },
    { name: "Happy Trails Daycare", nickName: "Happy Trails Daycare", street: "7350 Howard Road ", city: "Carpentersville", state: "IL", zipcode: "60110" },
    { name: "Little Ducklings Daycare", nickName: "Little Ducklings Daycare", street: "78 Colonial Ave. ", city: "Champaign", state: "IL", zipcode: "61821" },
    { name: "Rainbow Children", nickName: "Rainbow Children", street: "982 Andover Court ", city: "Chicago Heights", state: "IL", zipcode: "60411" },
    { name: "Play Safe Playhouse", nickName: "Play Safe Playhouse", street: "948 w madison st", city: "chicago", state: "IL", zipcode: "60607" },
    { name: "The Children's Cloud", nickName: "The Children's Cloud", street: "16 e pearson st", city: "chicago", state: "IL", zipcode: "60611" },
    { name: "Kiddie Cloud", nickName: "Kiddie Cloud", street: "1448 n sedgwick st", city: "chicago", state: "IL", zipcode: "60610" },
    { name: "TOTally Kids", nickName: "TOTally Kids", street: "900 s wabash ave", city: "chicago", state: "IL", zipcode: "60605" },
    { name: "Stop n' Play", nickName: "Stop n' Play", street: "1339 1 19th st", city: "chicago", state: "IL", zipcode: "60608" },
    { name: "Learn n' Play", nickName: "Learn n' Play", street: "47 Fieldstone Rd. ", city: "Geneva", state: "IL", zipcode: "60134" },
    { name: "Mother Goose's Playschool", nickName: "Mother Goose's Playschool", street: "47 Mulberry St. ", city: "Glen Ellyn", state: "IL", zipcode: "60137" },
    { name: "Children's Den", nickName: "Children's Den", street: "530 Hanover Rd. ", city: "Glenview", state: "IL", zipcode: "60025" },
  ],
};

db.sync()
  .then(function () {
    return Promise.map(Object.keys(data), (name) => {
      return Promise.map(data[name], function (item) {
        return db.model(name)
          .create(item);
      });
    });
  })
  .then(function () {
    console.log(chalk.green("Finished inserting data (press ctrl-c to exit)"));
    process.exit()
  })
  .catch(function (err) {
    console.error(chalk.red('There was totally a problem', err, err.stack));
  });


