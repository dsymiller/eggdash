const { User, Farm } = require('../models/index');
const db = require('../models/index');

const userController = {};

// New user creates an account, signs up.
userController.createUser = async (req, res, next) => {
  // Grab form data off of the request.
  // Check if merchant.
  console.log(req.body);
  const { firstName, lastName, email, password, accountType } = req.body;
  const addressZip = req.body.zipCode;
  const addressStreet = req.body.streetAddress;
  const {
    farmName,
    farmStreet,
    farmZipcode,
    farmEmail,
    farmDescription,
    farmImage,
  } = req.body;

  console.log(email);

  try {
    // Query the db to check if user already exists.
    const dbCheck = await User.findAll({
      where: {
        email,
      },
    });

    if (dbCheck[0]) return res.sendStatus(403); // User already exists status code.

    // Create a user in the database by this name.
    if (!farmName) {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        addressStreet,
        addressZip,
        accountType,
      });
      res.locals.user = {};
      res.locals.user.email = email;
      res.locals.user.accountType = accountType;
      res.locals.user.userId = user.id;
      return next();
    } else {
      const user = await User.create({
        firstName,
        lastName,
        addressStreet,
        addressZip,
        email,
        password,
        accountType,
      });

      const farm = await db.Farm.create({
        name: farmName,
        addressStreet: farmStreet,
        addressZip: farmZipcode,
        email: farmEmail,
        description: farmDescription,
        image: farmImage,
        UserId: user.id,
      });
      res.locals.user = {};
      res.locals.user.email = email;
      res.locals.user.accountType = accountType;
      res.locals.user.farmId = farm.id;
      res.locals.user.userId = user.id;
      return next();
    }
  } catch (err) {
    // I'll fill this out later.
    if (err)
      return next({
        log: `userController.createUser: ERROR: ${err}.`,
        message: {
          err: 'Error occurred in userController.createUser.',
        },
      });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findAll({
      where: {
        email,
        password,
      },
    });

    console.log(user[0].id);
    const farm = await db.Farm.findAll({
      where: { UserId: user[0].id },
    });
    console.log(farm);
    if (user) {
      res.locals.user = {};
      res.locals.user.email = email;
      res.locals.user.accountType = user[0].accountType;
      res.locals.user.userId = user[0].id;
      res.locals.user.farmId = farm[0].id;
      return next();
    } else {
      return res.statusCode(401).json('Invalid username or password.');
    }
  } catch (err) {
    if (err)
      return next({
        log: `userController.verifyUser: ERROR: ${err}.`,
        message: {
          err: 'Error occurred in userController.verifyUser.',
        },
      });
  }
};

userController.logOut = async (req, res, next) => {
  res.clearCookie('jwt');
  next();
};

module.exports = userController;
