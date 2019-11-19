var express = require('express');
var router = express.Router();
var faker = require('faker');

function generateRandom(number) {
  
  if (!number || number > 100000) {
    number = 5000;
  } else {
    number = Number(number);
  }

  const data = new Array(number).fill({}).map((item, index) => {
    const commentLength = Math.floor(Math.random() * 4);
    const commentArray = new Array(commentLength).fill({});
    
    const fake = {
      id: (index + 1),
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      brand: faker.company.companyName(),
      price: faker.commerce.price(),
      image: faker.image.imageUrl(),
      currency: faker.finance.currencyCode(),
      color: faker.commerce.color(),
      comments: commentArray.map(() => ({
        name: faker.name.findName(),
        email: faker.internet.email(),
        rating: faker.random.number(5),
        comment: faker.lorem.sentences()
      }))
    };
    console.log(JSON.stringify(fake))
    return fake;
  });
  return data;
}



router.get('/', function (req, res, next) {
  const data = generateRandom();
  console.debug(JSON.stringify(data));
  return res.status(200).json({ data });
});


router.get('/level1', function (req, res, next) {
  return res.status(200).json({ data: generateRandom(5000) });
});

router.get('/level2', function (req, res, next) {
  return res.status(200).json({ data: generateRandom(20000) });
});

router.get('/level3', function (req, res, next) {
  return res.status(200).json({ data: generateRandom(100000) });
});

router.get('/example1', function (req, res, next) {
  const { data } = require(`./example1.json`);
  return res.status(200).json({ data });
});

router.get('/example2', function (req, res, next) {
  const { data } = require(`./example2.json`);
  return res.status(200).json({ data });
});

router.get('/example3', function (req, res, next) {
  const { data } = require(`./example3.json`);
  return res.status(200).json({ data });
});

router.get('/:number', function (req, res, next) {
  return res.status(200).json({ data: generateRandom(req.params.number) });
});
module.exports = router;
