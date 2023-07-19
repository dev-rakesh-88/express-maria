require('dotenv').config()
const ENV = process.env
const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('testdb', 'root', 'alphabeta', {
//   dialect: 'mariadb',
//   host: 'localhost',
// });
console.log(ENV.DB_HOST, ENV.DB_USERNAME, ENV.DB_PASSWORD)
const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USERNAME, ENV.DB_PASSWORD, {
  dialect: 'mariadb',
  host: ENV.DB_HOST,
  dialectOptions: {
    allowPublicKeyRetrieval:true,
    connectTimeout: 10000
  }
  
});

const OTP = sequelize.define('otp', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiry: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  registerid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

sequelize.sync()
  .then(() => {
    console.log('Database and table created!');
  })
  .catch((error) => {
    console.log('Error:', error);
  });

module.exports = OTP;