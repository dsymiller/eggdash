const db = require('../models/index');

const cartController = {};

cartController.getProductsCart = async (req, res, next) => {
  const { FarmId, UserId } = req.params;
  try {
    const order = await db.Order.findAll({
      where: { FarmId, UserId, status: 'open' },
    });
    if (!order.length) {
      const newOrder = await db.Order.create({
        status: 'empty',
        FarmId,
        UserId,
      });
      console.log(newOrder);
      const { id, status, date } = newOrder;
      res.locals = {
        OrderId: id,
        status,
        date,
        orderDetails: [],
      };
      return next();
    }
    const { id, status, date } = order[0];
    res.locals = { OrderId: id, status, date };
    const orderDetails = await db.OrderDetail.findAll({
      where: { OrderId: res.locals.OrderId },
    });
    res.locals.orderDetails = orderDetails.map((orderDetail) => {
      const { id, ProductId, unitPrice, quantity } = orderDetail;
      return { OrderDetailId: id, ProductId, unitPrice, quantity };
    });
    next();
  } catch (err) {
    next({
      log: `cartController.getProductsCart Error: ${err}`,
      status: 500,
      message: { err: 'a database error occured' },
    });
  }
};

// user adds item to cart = 'post' request
cartController.addProductsCart = async (req, res, next) => {
  try {
    const { OrderId } = req.body;
    const result = await db.OrderDetail.create(req.body);
    res.locals = { OrderDetailId: result.id };
    await db.Order.update({ status: 'open' }, { where: { id: OrderId } });
    next();
  } catch (err) {
    next({
      log: `cartController.addProductsCart Error: ${err}`,
      status: 500,
      message: { err: 'a database error occured' },
    });
  }
};

// user deletes item from cart - 'delete' request
cartController.deleteProductCart = async (req, res, next) => {
  try {
    const { OrderId, OrderDetailId } = req.params;
    await db.OrderDetail.destroy({
      where: { id: OrderDetailId },
    });
    const orderDetails = await db.OrderDetail.findAll({
      where: { OrderId },
    });
    if (!orderDetails.length) {
      await db.Order.update({ status: 'empty' }, { where: { id: OrderId } });
    }
    next();
  } catch (err) {
    next({
      log: `cartController.deleteProductCart Error: ${err}`,
      status: 500,
      message: { err: 'a database error occured' },
    });
  }
};

// user modifies quantity in cart - 'put' request
cartController.updateProductCart = async (req, res, next) => {
  try {
    const { quantity, OrderDetailId } = req.body;
    await db.OrderDetail.update(
      { quantity },
      {
        where: { id: OrderDetailId },
      }
    );
    next();
  } catch (err) {
    next({
      log: `cartController.updateProductCart Error: ${err}`,
      status: 500,
      message: { err: 'a database error occured' },
    });
  }
};

cartController.checkOut = async (req, res, next) => {
  try {
    const { OrderId } = req.params;
    await db.Order.update({ status: 'fulfilled' }, { where: { id: OrderId } });
    const orderDetails = await db.OrderDetail.findAll({
      where: { OrderId },
    });
    orderDetails.forEach(async (orderDetail) => {
      const { ProductId, quantity } = orderDetail;
      await db.Product.decrement('stock', {
        by: quantity,
        where: { id: ProductId },
      });
    });
    next();
  } catch (err) {
    next({
      log: `cartController.updateProductCart Error: ${err}`,
      status: 500,
      message: { err: 'a database error occured' },
    });
  }
};

module.exports = cartController;
