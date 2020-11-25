const express = require('express');
const db = require('../models/index');

const router = express.Router();

// use to create test data
// =====================================================================================

async function createTestData(req, res, next) {
  try {
    await db.User.create({
      firstName: 'Derek',
      lastName: 'Miller',
      email: 'dsymiller@fakeemail.com',
      password: 'password',
      addressStreet: '123 fake st',
      addressZip: 12345,
      accountType: 'customer',
    });
    await db.User.create({
      firstName: 'Mark',
      lastName: 'Miller',
      email: 'mmiller@fakeemail.com',
      password: 'password',
      addressStreet: '123 fake st',
      addressZip: 12345,
      accountType: 'merchant',
    });
    await db.Farm.create({
      name: 'Miller Farm',
      email: 'mmiller@fakeemail.com',
      password: 'password',
      addressStreet: '123 fake st',
      addressZip: 12345,
      image:
        'https://www.immunology.org/sites/default/files/Farm%20barn%20small.jpg',
      description: 'best farm in the world',
      UserId: 2,
    });
    await db.ProductType.create({
      name: 'egg',
      image:
        'https://static01.nyt.com/images/2019/02/05/world/05egg/15xp-egg-promo-articleLarge-v2.jpg?quality=90&auto=webp',
      category: 'dairy/eggs',
      unit: 'dozen',
    });
    await db.ProductType.create({
      name: 'milk',
      image:
        'https://static01.nyt.com/images/2019/02/05/world/05egg/15xp-egg-promo-articleLarge-v2.jpg?quality=90&auto=webp',
      category: 'dairy/eggs',
      unit: 'gallon',
    });
    await db.Product.create({
      name: 'grade A eggs (cage-free)',
      description: 'seriously great eggs',
      price: 300,
      stock: 50,
      FarmId: 1,
      ProductTypeId: 1,
    });
    await db.Product.create({
      name: 'grade A milk (two percent)',
      description: 'seriously great milk',
      price: 200,
      stock: 50,
      FarmId: 1,
      ProductTypeId: 2,
    });
    await db.Order.create({
      status: 'fulfilled',
      FarmId: 1,
      UserId: 1,
    });
    await db.OrderDetail.create({
      quantity: 1,
      unitPrice: 300,
      OrderId: 1,
      ProductId: 1,
    });
    await db.OrderDetail.create({
      quantity: 2,
      unitPrice: 300,
      OrderId: 1,
      ProductId: 2,
    });
    await db.Order.create({
      status: 'fulfilled',
      FarmId: 1,
      UserId: 1,
    });
    await db.OrderDetail.create({
      quantity: 5,
      unitPrice: 300,
      OrderId: 2,
      ProductId: 1,
    });
    await db.OrderDetail.create({
      quantity: 10,
      unitPrice: 300,
      OrderId: 2,
      ProductId: 2,
    });
    next();
  } catch (err) {
    console.log(err);
  }
}

router.get('/data', createTestData, (req, res) => {
  res.status(200).json(res.locals);
});

// =====================================================================================

module.exports = router;
