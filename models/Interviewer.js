require('dotenv').config()
const ENV = process.env
const { Sequelize, DataTypes } = require('sequelize');
console.log(ENV.DB_HOST, ENV.DB_USERNAME, ENV.DB_PASSWORD)
const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USERNAME, ENV.DB_PASSWORD, {
  dialect: 'mariadb',
  host: ENV.DB_HOST,
  dialectOptions: {
    allowPublicKeyRetrieval:true,
    connectTimeout: 10000
  }
  
});

const Interviewer = sequelize.define('interviewer', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  work_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:"password"
  },
});

sequelize.sync()
  .then(() => {
    console.log('Database and table created!');
  })
  .catch((error) => {
    console.log('Error:', error);
  });

module.exports = Interviewer;